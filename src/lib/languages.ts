/**
 * Language Configuration for Ahioma AI Chat
 * Supports: English, Igbo, Hausa, Yoruba
 */

export type SupportedLanguage = 'en' | 'ig' | 'ha' | 'yo';

export const LANGUAGES: Record<SupportedLanguage, { name: string; label: string; code: string }> = {
  en: { name: 'English', label: 'English', code: 'en' },
  ig: { name: 'Igbo', label: 'Asụsụ Igbo', code: 'ig' },
  ha: { name: 'Hausa', label: 'Hausa', code: 'ha' },
  yo: { name: 'Yoruba', label: 'Èdè Yorùbá', code: 'yo' },
};

/**
 * System prompts for each language
 * These are injected into the AI system prompt to ensure responses in the correct language
 */
export const LANGUAGE_SYSTEM_PROMPTS: Record<SupportedLanguage, string> = {
  en: 'You are a helpful shopping assistant for Ahioma marketplace. Always respond in English. Be friendly, concise, and helpful. Provide information about products, services, and local businesses.',
  ig: 'Ị bụ onye nyocha na-ezigbo ụka maka Ahioma marketplace. Jụrụ jụ na Igbo. Bụrụ enyi na ịgaliri mkpali. Nye ndụmọdụ maka ngwaahịa, ọrụ, na azụmahịa mpaghara.',
  ha: 'Kana magajin wayar jari ga Ahioma marketplace. Ka amsa cikin Hausa. Zama mai kyau kuma ba sha. Baje bayani game da kaya, aiki, da kasuwancin gida.',
  yo: 'Ìwé ni ẹlẹ̀gbẹ́ ìtọ́jú kan fun ọja Ahioma. Ní gbogbo ìgbà, dá ìfọ̀wọ́si nípa èdè Yorùbá. Jẹ́ ọ̀rẹ́ tó dára ní àánú. Fúnni lọ́ìnú nípa àwọn ọjà, iṣẹ́, àti ìjòmọ́ agbègbè.',
};

/**
 * Initial prompt suggestions for each language
 * Displayed when chat is empty
 */
export const PROMPT_SUGGESTIONS: Record<SupportedLanguage, string[]> = {
  en: [
    'List services available on Ahioma?',
    'How do I track my order?',
    'Tell me the artisans in Orlu.',
    'What are your return policies?',
  ],
  ig: [
    'Oke ọrụ dị na Ahioma?',
    'Kedu otu m ga-akụ ụgbọ m?',
    'Kọwa m ndị ọka na Orlu.',
    'Kedu iwu ị na-emgbe na iweghachị ngwongwo?',
  ],
  ha: [
    'Abubuwan aiki da ke ɗa a Ahioma?',
    'Yaya zan lissafin nuni na?',
    'Gaya mani gwanin a Orlu.',
    'Menene ƙa\'idod maimakon kawar abubuwa?',
  ],
  yo: [
    'Kí ńkan iṣẹ tó wà ní Ahioma?',
    'Báwo ní n ṣe lè tọ̀ka àkọle rẹ̀?',
    'Sọ wé nípa àwọn onímọ̀ wé ní Orlu.',
    'Kí ni ìlànà àgbájadó àrà yín?',
  ],
};

/**
 * UI Label translations for each language
 */
export const UI_LABELS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    startConversation: 'Start a conversation with these prompts:',
    placeholder: 'Ask me anything...',
    detected: 'Detected',
  },
  ig: {
    startConversation: 'Malite mkparịta ụka site na ụdị ndụmọ ndị a:',
    placeholder: 'Jụọ m ihe ọ bụla...',
    detected: 'A chọpụtara',
  },
  ha: {
    startConversation: 'Farawa tattaunawa tare da waɗannan shawarar:',
    placeholder: 'Ki ba ni tambayi ta kowa...',
    detected: 'An gana',
  },
  yo: {
    startConversation: 'Lọ bẹrẹ̀ orí wo àkópọ̀ pẹ̀lú àwọn ìbáṣepọ̀ yíì:',
    placeholder: 'Be ni ibeere kan si mi...',
    detected: 'A rí',
  },
};

/**
 * Whisper language codes (for audio transcription)
 * Maps internal codes to OpenAI Whisper language codes
 */
export const WHISPER_LANGUAGE_CODES: Record<SupportedLanguage, string> = {
  en: 'en',
  ig: 'ig',
  ha: 'ha',
  yo: 'yo',
};

/**
 * Franc language detection codes
 * Maps franc detected codes to our supported language codes
 */
export const FRANC_TO_SUPPORTED_LANGUAGE: Record<string, SupportedLanguage> = {
  'eng': 'en',
  'ibo': 'ig',
  'hau': 'ha',
  'yor': 'yo',
};

/**
 * Get language name by code
 */
export const getLanguageName = (code: SupportedLanguage): string => {
  return LANGUAGES[code]?.name || 'Unknown';
};

/**
 * Get system prompt for language
 */
export const getSystemPrompt = (language: SupportedLanguage): string => {
  return LANGUAGE_SYSTEM_PROMPTS[language] || LANGUAGE_SYSTEM_PROMPTS.en;
};

/**
 * Get prompt suggestions for language
 */
export const getPromptSuggestions = (language: SupportedLanguage): string[] => {
  return PROMPT_SUGGESTIONS[language] || PROMPT_SUGGESTIONS.en;
};

/**
 * Get UI label for language
 */
export const getUILabel = (language: SupportedLanguage, key: string): string => {
  const labels = UI_LABELS[language];
  return labels[key] || UI_LABELS.en[key] || '';
};
