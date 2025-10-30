// tests/helpers.test.js - Tests para funciones auxiliares
const { getChatLevel, buildPrompt, sanitizeText } = require('../src/utils/helpers');

describe('getChatLevel', () => {
  it('debe retornar nivel 1 para mensaje básico', () => {
    expect(getChatLevel('Hola, ¿cómo estás?')).toBe(1);
  });

  it('debe retornar nivel 2 para mensaje emocional', () => {
    expect(getChatLevel('Me siento triste')).toBe(2);
    expect(getChatLevel('Tengo ansiedad')).toBe(2);
    expect(getChatLevel('Estoy deprimido')).toBe(2);
  });

  it('debe retornar nivel 3 para mensaje de donación', () => {
    expect(getChatLevel('Quiero donar')).toBe(3);
    expect(getChatLevel('Cómo puedo apoyar')).toBe(3);
  });
});

describe('buildPrompt', () => {
  it('debe construir prompt para nivel básico', () => {
    const prompt = buildPrompt('Hola', 'contexto previo', 1);
    expect(prompt).toContain('guía espiritual');
    expect(prompt).toContain('breve');
  });

  it('debe construir prompt para nivel emocional', () => {
    const prompt = buildPrompt('Me siento mal', 'contexto', 2);
    expect(prompt).toContain('loop emocional');
    expect(prompt).toContain('Escucha');
  });

  it('debe construir prompt para nivel donación', () => {
    const prompt = buildPrompt('Quiero donar', 'contexto', 3);
    expect(prompt).toContain('donación');
  });
});

describe('sanitizeText', () => {
  it('debe limpiar espacios en blanco', () => {
    expect(sanitizeText('  texto  ')).toBe('texto');
  });

  it('debe manejar texto null o undefined', () => {
    expect(sanitizeText(null)).toBe('');
    expect(sanitizeText(undefined)).toBe('');
  });

  it('debe limitar longitud del texto', () => {
    const longText = 'a'.repeat(3000);
    const result = sanitizeText(longText);
    expect(result.length).toBeLessThanOrEqual(2000);
  });
});
