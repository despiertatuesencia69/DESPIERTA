// src/config/env.js - Gestión centralizada de variables de entorno
require('dotenv').config();

module.exports = {
  // Server
  PORT: parseInt(process.env.PORT, 10) || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // AI Services
  HF_TOKEN: process.env.HF_TOKEN || null,
  HF_MODEL_URL:
    process.env.HF_MODEL_URL || 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
  CHATLLM_KEY: process.env.CHATLLM_KEY || null,

  // Airtable
  AIRTABLE_KEY: process.env.AIRTABLE_KEY || null,
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID || null,

  // Evolution API (WhatsApp)
  EVOLUTION_KEY: process.env.EVOLUTION_KEY || null,
  EVOLUTION_INSTANCE: process.env.EVOLUTION_INSTANCE || 'despierta-whatsapp',
  EVOLUTION_URL: process.env.EVOLUTION_URL || null,

  // Telegram
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN || null,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || null,

  // Other APIs
  PERSPECTIVE_KEY: process.env.PERSPECTIVE_KEY || null,
  FB_PAGE_TOKEN: process.env.FB_PAGE_TOKEN || null,
  GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID || null,
  GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID || null,

  // Monetization
  PAYPAL_LINK: process.env.PAYPAL_LINK || 'https://paypal.me/despiertatuesencia',

  // Feature flags (permite funcionar sin credenciales)
  USE_MOCK_AI: !process.env.HF_TOKEN && !process.env.CHATLLM_KEY,
  USE_MOCK_AIRTABLE: !process.env.AIRTABLE_KEY || !process.env.AIRTABLE_BASE_ID,
};
