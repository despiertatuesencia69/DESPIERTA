// src/utils/helpers.js - Funciones auxiliares reutilizables

/**
 * Espera un tiempo determinado (anti-bloqueos WhatsApp)
 * @param {number} ms - Milisegundos a esperar
 */
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Determina el nivel de chat basado en el mensaje del usuario
 * @param {string} message - Mensaje del usuario
 * @returns {number} - 1: básico, 2: emocional, 3: donación
 */
const getChatLevel = (message) => {
  const textLower = message.toLowerCase();
  if (textLower.includes('donar') || textLower.includes('donación') || textLower.includes('apoyar')) return 3;
  if (
    textLower.includes('emocion') ||
    textLower.includes('triste') ||
    textLower.includes('depres') ||
    textLower.includes('ansiedad') ||
    textLower.includes('miedo')
  )
    return 2;
  return 1;
};

/**
 * Construye el prompt para la IA según el nivel y contexto
 * @param {string} userMessage - Mensaje del usuario
 * @param {string} context - Contexto de conversaciones previas
 * @param {number} chatLevel - Nivel del chat
 * @returns {string} - Prompt construido
 */
const buildPrompt = (userMessage, context, chatLevel) => {
  let prompt = `Eres un guía espiritual compasivo y sabio. Contexto previo: ${context || 'sin contexto'}. Mensaje del usuario: ${userMessage}. `;

  if (chatLevel === 1) prompt += 'Responde de forma breve, clara y alentadora.';
  if (chatLevel === 2)
    prompt += 'Usa el loop emocional: 1. Escucha activa. 2. Valida sus emociones. 3. Orienta con amor.';
  if (chatLevel === 3) prompt += 'Agradece su intención de apoyar y menciona suavemente la opción de donación.';

  return prompt;
};

/**
 * Sanitiza texto para evitar inyecciones o caracteres problemáticos
 * @param {string} text - Texto a sanitizar
 * @returns {string} - Texto sanitizado
 */
const sanitizeText = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text.trim().slice(0, 2000); // Limita a 2000 caracteres
};

module.exports = {
  wait,
  getChatLevel,
  buildPrompt,
  sanitizeText,
};
