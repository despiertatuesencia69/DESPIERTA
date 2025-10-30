// server.js - Servidor principal refactorizado con arquitectura modular
const express = require('express');
const config = require('./src/config/env');
const { getChatLevel, buildPrompt, sanitizeText } = require('./src/utils/helpers');
const aiService = require('./src/services/aiService');
const airtableService = require('./src/services/airtableService');
const whatsappService = require('./src/services/whatsappService');
const telegramService = require('./src/services/telegramService');

const app = express();
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'Despierta IA Espiritual - Activa ✨',
    version: '1.0.0',
    mockMode: {
      ai: config.USE_MOCK_AI,
      airtable: config.USE_MOCK_AIRTABLE,
    },
    environment: config.NODE_ENV,
  });
});

// Webhook WhatsApp
app.post('/webhook/whatsapp', async (req, res) => {
  try {
    const body = req.body || {};
    const userMessage = sanitizeText(
      (body.message && (body.message.text || body.message.body)) || body.text || ''
    );
    const userId = body.from || body.from_number || body.sender?.id || 'unknown_user';

    if (!userMessage) {
      return res.json({ status: 'ok', message: 'Mensaje vacío' });
    }

    console.log(`[Webhook] Mensaje de ${userId}: ${userMessage.slice(0, 50)}...`);

    // 1. Obtener contexto previo
    const context = await airtableService.getContext(userId);

    // 2. Determinar nivel de chat
    const chatLevel = getChatLevel(userMessage);
    console.log(`[Chat] Nivel detectado: ${chatLevel}`);

    // 3. Construir prompt
    const prompt = buildPrompt(userMessage, context, chatLevel);

    // 4. Generar respuesta con IA
    let respuesta = await aiService.generateResponse(prompt, chatLevel);

    // 5. Loop emocional (Level 2) - respuesta estructurada
    if (chatLevel === 2) {
      respuesta = `🙏 *Escucha:* Te escucho con amor y sin juicio.
      
💖 *Valida:* Tus emociones son válidas y naturales.

✨ *Orienta:* Respira profundo. Confía en tu luz interior. Todo pasará.`;
    }

    // 6. Donación (Level 3)
    if (chatLevel === 3) {
      respuesta += `\n\n💝 *Gracias por tu generosidad*\nTu apoyo nos ayuda a seguir compartiendo luz: ${config.PAYPAL_LINK}`;
      await airtableService.saveDonation(userId);
    }

    // 7. Análisis de sentimiento
    const sentimentScore = await aiService.analyzeSentiment(userMessage);
    console.log(`[Sentiment] Score: ${sentimentScore.toFixed(2)}`);

    // 8. Alerta si sentimiento negativo
    if (sentimentScore < 0.3) {
      await telegramService.notifyNegativeSentiment(userId, userMessage, sentimentScore);
    }

    // 9. Guardar conversación
    await airtableService.saveConversation({
      user_id: userId,
      mensaje: userMessage,
      respuesta: respuesta,
      timestamp: new Date().toISOString(),
      contexto_score: sentimentScore,
    });

    // 10. Enviar respuesta por WhatsApp
    await whatsappService.sendMessage(userId, respuesta);

    return res.json({ status: 'ok', user: userId, level: chatLevel });
  } catch (error) {
    console.error('[Webhook] Error:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

// Endpoint de prueba para simular webhook localmente
app.post('/test/message', (req, res) => {
  const { user, message } = req.body;

  if (!user || !message) {
    return res.status(400).json({ error: 'Parámetros "user" y "message" son requeridos' });
  }

  console.log(`[Test] Simulando mensaje de ${user}: ${message}`);

  // Simular formato de webhook
  const webhookPayload = {
    from: user,
    message: { text: message },
  };

  // Redirigir a webhook
  req.body = webhookPayload;
  req.url = '/webhook/whatsapp';
  return app._router.handle(req, res);
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('[Error Global]:', err);
  res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
});

// Iniciar servidor
const PORT = config.PORT;
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Servidor activo en puerto ${PORT}`);
  console.log(`📊 Modo Mock: AI=${config.USE_MOCK_AI}, Airtable=${config.USE_MOCK_AIRTABLE}`);
  console.log(`💡 Health check: http://localhost:${PORT}/`);
  console.log(`📥 Webhook: POST http://localhost:${PORT}/webhook/whatsapp`);
  console.log(`🧪 Test: POST http://localhost:${PORT}/test/message {"user":"test","message":"hola"}\n`);
});

module.exports = app; // Exportar para tests
