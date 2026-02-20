process.env.GEMINI_API_KEY = 'AIzaSyD0xYhPfQAoolmYQ6S6zTHgUOsoTa6acIs';

process.env.GEMINI_API_KEY = 'AIzaSyD0xYhPfQAoolmYQ6S6zTHgUOsoTa6acIs';

jest.mock('../src/lib/geminiClient', () => ({
  generateGeminiResponse: jest.fn(),
}));

process.env.GEMINI_API_KEY = 'AIzaSyD0xYhPfQAoolmYQ6S6zTHgUOsoTa6acIs';

jest.mock('../src/lib/geminiClient', () => ({
  generateGeminiResponse: jest.fn(),
}));

const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { handleChatMessage } = require('../src/controllers/messageController');
const User = require('../src/models/User');

const app = express();
app.use(bodyParser.json());

// Mock authentication middleware to add req.user for testing
app.use((req, res, next) => {
  req.user = { userId: '1234567890abcdef' };
  next();
});

app.post('/api/message/chat', handleChatMessage);

describe('Message Controller Chat Handler', () => {
  jest.setTimeout(10000);

  const { generateGeminiResponse } = require('../src/lib/geminiClient');

  beforeAll(() => {
    // Mock User.findById to return a sample user object
    jest.spyOn(User, 'findById').mockImplementation(async (id) => {
      return { id, name: 'Test User' };
    });
  });

  afterAll(async () => {
    jest.restoreAllMocks();
    await mongoose.connection.close();
  });

  it('should reject requests without content', async () => {
    const res = await request(app).post('/api/message/chat').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/content is required/);
  });

  it('should reject unrelated messages with system message', async () => {
    const res = await request(app)
      .post('/api/message/chat')
      .send({ content: 'irrelevant message' });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("This question is not related to teachers or institutions.");
    expect(res.body.senderType).toBe("system");
  });

  it('should return Gemini API response for related messages', async () => {
    generateGeminiResponse.mockResolvedValue("Gemini reply");

    const res = await request(app)
      .post('/api/message/chat')
      .send({ content: 'teacher job application' });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Gemini reply");
    expect(res.body.senderName).toBe("Test User");
    expect(res.body.senderType).toBe("assistant");
  });

  it('should fallback when Gemini API errors', async () => {
    generateGeminiResponse.mockRejectedValue(new Error("Gemini failure"));

    const res = await request(app)
      .post('/api/message/chat')
      .send({ content: 'teacher job application' });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Something went wrong. Please try again.");
  });
});
