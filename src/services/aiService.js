// src/services/aiService.js - Servicio de IA con fallback y mock
const axios = require('axios');
const config = require('../config/env');

/**
 * Respuestas mock para desarrollo sin credenciales
 */
const mockResponses = {
  1: 'Bienvenido/a. Estoy aquí para acompañarte en tu camino espiritual. ¿En qué puedo ayudarte hoy?',
  2: 'Escucho tus emociones con amor. Todo lo que sientes es válido. Respira profundo y confía en tu luz interior.',
  3: 'Gracias por tu generosidad. Tu apoyo nos ayuda a seguir compartiendo luz y amor con más personas.',
};

/**
 * Llama a la IA principal (Hugging Face)
 * @param {string} prompt - Prompt construido
 * @returns {Promise<string>} - Respuesta generada
 */
async function callHuggingFace(prompt) {
  if (!config.HF_TOKEN) throw new Error('HF_TOKEN no configurado');

  const response = await axios.post(
    config.HF_MODEL_URL,
    { inputs: prompt },
    {
      headers: { Authorization: `Bearer ${config.HF_TOKEN}` },
      timeout: 20000,
    }
  );

  // Manejar diferentes formatos de respuesta de HF
  if (typeof response.data === 'string') return response.data;
  if (Array.isArray(response.data) && response.data[0]?.generated_text) return response.data[0].generated_text;
  if (response.data?.generated_text) return response.data.generated_text;

  return JSON.stringify(response.data).slice(0, 1600);
}

/**
 * Llama a la IA de respaldo (ChatLLM / Abacus.AI)
 * @param {string} prompt - Prompt construido
 * @returns {Promise<string>} - Respuesta generada
 */
async function callChatLLM(prompt) {
  if (!config.CHATLLM_KEY) throw new Error('CHATLLM_KEY no configurado');

  const response = await axios.post(
    'https://chatllm.abacus.ai/v1/chat/completions',
    {
      model: 'deepagent-espiritual',
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: { Authorization: `Bearer ${config.CHATLLM_KEY}` },
      timeout: 20000,
    }
  );

  return response.data?.choices?.[0]?.message?.content || JSON.stringify(response.data).slice(0, 1600);
}

/**
 * Genera respuesta usando IA (con fallback y mock)
 * @param {string} prompt - Prompt construido
 * @param {number} chatLevel - Nivel del chat (para mock)
 * @returns {Promise<string>} - Respuesta generada
 */
async function generateResponse(prompt, chatLevel = 1) {
  // Modo mock (sin credenciales)
  if (config.USE_MOCK_AI) {
    console.log('[AI Mock] Usando respuesta simulada');
    return mockResponses[chatLevel] || mockResponses[1];
  }

  // Intentar HF primero
  try {
    const response = await callHuggingFace(prompt);
    console.log('[AI] Respuesta de Hugging Face');
    return response;
  } catch (hfError) {
    console.warn('[AI] HF falló, intentando ChatLLM:', hfError.message);

    // Fallback a ChatLLM
    try {
      const response = await callChatLLM(prompt);
      console.log('[AI] Respuesta de ChatLLM');
      return response;
    } catch (llmError) {
      console.warn('[AI] ChatLLM falló:', llmError.message);
      // Fallback final
      return 'Gracias por compartir. Estoy aquí para escucharte. (respuesta por fallback)';
    }
  }
}

/**
 * Analiza el sentimiento de un mensaje
 * @param {string} text - Texto a analizar
 * @returns {Promise<number>} - Score 0-1 (1 = muy positivo)
 */
async function analyzeSentiment(text) {
  if (!text || text.trim().length === 0) return 0.5;
  if (!config.HF_TOKEN) return 0.5;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
      { inputs: text },
      {
        headers: { Authorization: `Bearer ${config.HF_TOKEN}` },
        timeout: 15000,
      }
    );

    if (Array.isArray(response.data) && response.data[0]?.label) {
      const item = response.data[0];
      return item.label.toUpperCase().includes('POS') ? item.score : 1 - item.score;
    }
  } catch (error) {
    console.warn('[Sentiment] Análisis falló:', error.message);
  }

  return 0.5; // Neutral por defecto
}

module.exports = {
  generateResponse,
  analyzeSentiment,
};
