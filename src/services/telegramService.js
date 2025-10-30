// src/services/telegramService.js - Servicio de notificaciones Telegram
const axios = require('axios');
const config = require('../config/env');

/**
 * Envía una alerta a Telegram
 * @param {string} message - Mensaje de alerta
 */
async function sendAlert(message) {
  // Mock si no hay credenciales
  if (!config.TELEGRAM_TOKEN || !config.TELEGRAM_CHAT_ID) {
    console.log('[Telegram Mock] Alerta:', message);
    return;
  }

  try {
    await axios.post(`https://api.telegram.org/bot${config.TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: config.TELEGRAM_CHAT_ID,
      text: message,
    });
    console.log('[Telegram] Alerta enviada');
  } catch (error) {
    console.warn('[Telegram] Error enviando alerta:', error.message);
  }
}

/**
 * Notifica sentimiento negativo detectado
 * @param {string} userId - ID del usuario
 * @param {string} message - Mensaje del usuario
 * @param {number} sentimentScore - Score de sentimiento
 */
async function notifyNegativeSentiment(userId, message, sentimentScore) {
  const alertMessage = `⚠️ Alerta: Sentimiento negativo detectado
Usuario: ${userId}
Score: ${sentimentScore.toFixed(2)}
Mensaje: "${message.slice(0, 150)}..."`;

  await sendAlert(alertMessage);
}

module.exports = {
  sendAlert,
  notifyNegativeSentiment,
};
