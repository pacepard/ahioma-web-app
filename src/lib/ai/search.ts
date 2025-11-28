import { supabase } from '@/lib/supabase/client';
import { generateEmbedding } from './embedding';

// Type for search results with optional _score
export type SearchResult<T> = T & { _score?: number };

// Reciprocal Rank Fusion
const rrf = <T extends { id: string }>(
  keywordResults: T[] = [],
  semanticResults: T[] = [],
  k = 50
): SearchResult<T>[] => {
  const scores: Record<string, number> = {};

  keywordResults.forEach((item, idx) => {
    scores[item.id] = (scores[item.id] || 0) + 1 / (k + idx + 1);
  });
  semanticResults.forEach((item, idx) => {
    scores[item.id] = (scores[item.id] || 0) + 1 / (k + idx + 1);
  });

  const merged = [...keywordResults, ...semanticResults];
  const unique = Array.from(new Map(merged.map(item => [item.id, item])).values());

  // Cast each item to SearchResult<T> before assigning _score
  unique.forEach(item => {
    (item as SearchResult<T>)._score = scores[item.id] || 0;
  });

  return (unique as SearchResult<T>[]).sort((a, b) => (b._score || 0) - (a._score || 0));
};

// Generic hybrid search function
const hybridSearch = async <T extends { id: string }>(
  table: string,
  query: string,
  textColumn: string,
  rpcFunction: string,
  limit = 10
): Promise<SearchResult<T>[]> => {
  const queryEmbedding = await generateEmbedding(query);

  const { data: keywordResultsRaw } = await supabase
    .from<T, "public">(table)
    .select('*')
    .textSearch(textColumn, query, { type: 'websearch' })
    .limit(limit * 2);

  const { data: semanticResultsRaw } = await supabase.rpc<T, "public">(rpcFunction, {
    query_embedding: queryEmbedding,
    match_count: limit * 2
  });

  const keywordResults = Array.isArray(keywordResultsRaw) ? keywordResultsRaw : [];
  const semanticResults = Array.isArray(semanticResultsRaw) ? semanticResultsRaw : [];

  return rrf(keywordResults, semanticResults).slice(0, limit);
};

// Exported hybrid search functions for different tables
export const hybridProductSearch = (query: string, limit?: number) =>
  hybridSearch('products', query, 'name', 'vector_search_products', limit);

export const hybridOrderSearch = (query: string, limit?: number) =>
  hybridSearch('orders', query, 'invoice_no', 'vector_search_orders', limit);

export const hybridMessageSearch = (query: string, limit?: number) =>
  hybridSearch('notifications', query, 'message', 'vector_search_messages', limit);

export const hybridUserSearch = (query: string, limit?: number) =>
  hybridSearch('customers', query, 'name', 'vector_search_users', limit);
