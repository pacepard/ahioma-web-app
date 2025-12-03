/**
 * Language Detection Utilities
 * Handles automatic language detection from text and audio
 */

import { franc } from 'franc';
import type { SupportedLanguage } from './languages';
import { FRANC_TO_SUPPORTED_LANGUAGE } from './languages';

/**
 * Detect language from text input
 * Returns the detected language code or default 'en'
 */
export const detectLanguageFromText = (text: string): SupportedLanguage => {
  if (!text || text.trim().length < 5) {
    return 'en'; // Default for very short text
  }

  try {
    const detected = franc(text);
    
    // Map franc codes to our supported languages
    const supported = FRANC_TO_SUPPORTED_LANGUAGE[detected];
    
    if (supported) {
      return supported;
    }
    
    return 'en';
  } catch (error) {
    console.error('Error detecting language from text:', error);
    return 'en';
  }
};

/**
 * Get browser language preference
 * Returns the detected language code from browser settings
 */
export const getBrowserLanguage = (): SupportedLanguage => {
  if (typeof navigator === 'undefined') return 'en';
  
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  const supportedLangs: Record<string, SupportedLanguage> = {
    'ig': 'ig',
    'ha': 'ha',
    'yo': 'yo',
    'en': 'en',
  };
  
  return supportedLangs[langCode] || 'en';
};

/**
 * Comprehensive language detection with fallback hierarchy
 * Priority: audio detection > text detection > browser language > default English
 */
export const detectUserLanguage = (
  textInput?: string,
  audioLanguage?: string
): SupportedLanguage => {
  // 1. If audio was transcribed, use Whisper's detected language (most reliable)
  if (audioLanguage) {
    const audioLang = audioLanguage.toLowerCase();
    const supportedLangs: Record<string, SupportedLanguage> = {
      'ig': 'ig',
      'ha': 'ha',
      'yo': 'yo',
      'en': 'en',
    };
    
    if (supportedLangs[audioLang]) {
      return supportedLangs[audioLang];
    }
  }

  // 2. If user typed text, detect from text (reasonable accuracy)
  if (textInput && textInput.trim().length > 10) {
    const detectedLang = detectLanguageFromText(textInput);
    if (detectedLang !== 'en' || textInput.length > 20) {
      return detectedLang;
    }
  }

  // 3. Fall back to browser language
  const browserLang = getBrowserLanguage();
  if (browserLang !== 'en') {
    return browserLang;
  }

  // 4. Default to English
  return 'en';
};

/**
 * Format language code for display
 * Converts 'en' to 'EN', 'ig' to 'IG', etc.
 */
export const formatLanguageCode = (code: SupportedLanguage): string => {
  return code.toUpperCase();
};
