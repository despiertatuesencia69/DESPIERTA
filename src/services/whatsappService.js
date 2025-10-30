// src/services/whatsappService.js - Servicio de WhatsApp (Evolution API)
const axios = require('axios');
const config = require('../config/env');
const { wait } = require('../utils/helpers');

/**
 * Envía un mensaje de texto vía Evolution API
 * @param {string} userId - ID del usuario destinatario
 * @param {string} message - Mensaje a enviar
 */
async function sendMessage(userId, message) {
  // Mock si no hay credenciales
  if (!config.EVOLUTION_URL || !config.EVOLUTION_KEY) {
    console.log(`[WhatsApp Mock] Mensaje a ${userId}:`, message.slice(0, 100));
    return;
  }

  try {
    await axios.post(
      `${config.EVOLUTION_URL}/message/sendText/${config.EVOLUTION_INSTANCE}/${userId}`,
      { body: message },
      {
        headers: { apikey: config.EVOLUTION_KEY },
        timeout: 15000,
      }
    );
    console.log('[WhatsApp] Mensaje enviado');
    await wait(1000); // Anti-bloqueo
  } catch (error) {
    console.warn('[WhatsApp] Error enviando mensaje:', error.message);
  }
}

module.exports = {
  sendMessage,
};
