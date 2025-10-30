// tests/server.test.js - Tests básicos para el servidor
const request = require('supertest');
const app = require('../server');

describe('Health Check', () => {
  it('GET / debe retornar status activo', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toContain('Activa');
    expect(response.body).toHaveProperty('mockMode');
  });
});

describe('Webhook WhatsApp', () => {
  it('POST /webhook/whatsapp debe procesar mensaje básico', async () => {
    const payload = {
      from: 'user123',
      message: { text: 'Hola, ¿cómo estás?' },
    };

    const response = await request(app).post('/webhook/whatsapp').send(payload);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.user).toBe('user123');
    expect(response.body.level).toBe(1); // Nivel básico
  });

  it('POST /webhook/whatsapp debe detectar nivel emocional', async () => {
    const payload = {
      from: 'user456',
      message: { text: 'Me siento muy triste hoy' },
    };

    const response = await request(app).post('/webhook/whatsapp').send(payload);

    expect(response.statusCode).toBe(200);
    expect(response.body.level).toBe(2); // Nivel emocional
  });

  it('POST /webhook/whatsapp debe detectar intención de donación', async () => {
    const payload = {
      from: 'user789',
      message: { text: 'Quiero donar para apoyar' },
    };

    const response = await request(app).post('/webhook/whatsapp').send(payload);

    expect(response.statusCode).toBe(200);
    expect(response.body.level).toBe(3); // Nivel donación
  });

  it('POST /webhook/whatsapp debe manejar mensaje vacío', async () => {
    const payload = {
      from: 'user000',
      message: { text: '' },
    };

    const response = await request(app).post('/webhook/whatsapp').send(payload);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain('vacío');
  });
});

describe('Test Endpoint', () => {
  it('POST /test/message debe simular webhook', async () => {
    const payload = {
      user: 'testuser',
      message: 'Mensaje de prueba',
    };

    const response = await request(app).post('/test/message').send(payload);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('POST /test/message debe requerir parámetros', async () => {
    const response = await request(app).post('/test/message').send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
