import { embed } from "ai";

const embeddingModel = "openai/text-embedding-ada-002";

export const generateEmbedding = async (value: string): Promise<number[]> => {
  
    const input = value.replaceAll("\n", " ");
  
    const { embedding } = await embed({
    model: embeddingModel,
    value: input,  
    }); 

    return embedding;
};
