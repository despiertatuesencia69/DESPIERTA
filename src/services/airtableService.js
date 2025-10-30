// src/services/airtableService.js - Servicio de Airtable con mock
const AirtableLib = require('airtable');
const config = require('../config/env');

let AirtableBase = null;

// Configurar Airtable si hay credenciales
if (!config.USE_MOCK_AIRTABLE) {
  AirtableLib.configure({ apiKey: config.AIRTABLE_KEY });
  AirtableBase = AirtableLib.base(config.AIRTABLE_BASE_ID);
}

// Almacenamiento mock en memoria
const mockStorage = {
  conversaciones: [],
  donaciones: [],
};

/**
 * Guarda una conversación
 * @param {object} data - {user_id, mensaje, respuesta, timestamp, contexto_score}
 */
async function saveConversation(data) {
  if (config.USE_MOCK_AIRTABLE) {
    mockStorage.conversaciones.push(data);
    console.log('[Airtable Mock] Conversación guardada:', data.user_id);
    return;
  }

  try {
    await AirtableBase('Conversaciones').create([{ fields: data }]);
    console.log('[Airtable] Conversación guardada');
  } catch (error) {
    console.warn('[Airtable] Error guardando conversación:', error.message);
  }
}

/**
 * Guarda una donación
 * @param {string} userId - ID del usuario
 */
async function saveDonation(userId) {
  const data = { user_id: userId, fecha: new Date().toISOString() };

  if (config.USE_MOCK_AIRTABLE) {
    mockStorage.donaciones.push(data);
    console.log('[Airtable Mock] Donación guardada:', userId);
    return;
  }

  try {
    await AirtableBase('Donaciones').create([{ fields: data }]);
    console.log('[Airtable] Donación guardada');
  } catch (error) {
    console.warn('[Airtable] Error guardando donación:', error.message);
  }
}

/**
 * Obtiene el contexto de conversaciones previas de un usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<string>} - Contexto concatenado
 */
async function getContext(userId) {
  if (config.USE_MOCK_AIRTABLE) {
    const userConvs = mockStorage.conversaciones.filter((c) => c.user_id === userId).slice(-10);
    return userConvs.map((c) => c.mensaje).join(' → ');
  }

  try {
    const records = await AirtableBase('Conversaciones')
      .select({
        filterByFormula: `{user_id} = '${userId}'`,
        maxRecords: 10,
        sort: [{ field: 'timestamp', direction: 'desc' }],
      })
      .firstPage();

    return records
      .map((r) => r.fields.mensaje)
      .reverse()
      .join(' → ');
  } catch (error) {
    console.warn('[Airtable] Error obteniendo contexto:', error.message);
    return '';
  }
}

module.exports = {
  saveConversation,
  saveDonation,
  getContext,
};
