# Environment Setup for Frontend - TeacherWorld Assistant

This document describes setting necessary environment variables for the frontend, including the Gemini AI API key required by the chatbot.

## Environment Variables

Create a `.env` file in the `frontend` folder (real me 2/frontend/.env) and add the following:

```env
# Backend API URL for frontend API calls
VITE_API_URL=http://localhost:5000/api

# Gemini AI API Key for chatbot response generation
# Obtain this key from your Gemini AI provider or Google Generative AI platform.
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## Notes

- Replace `your_gemini_api_key_here` with your actual Gemini AI API key.
- This key is essential for the TeacherWorld Assistant chatbot to generate responses.
- Without this key, the chatbot will show the error: "⚠️ Oops! Something went wrong. Please try again later."
- After adding or updating `.env`, restart the frontend development server to load the new environment variables.

## Running the Frontend

```bash
npm install
npm run dev
```

Visit the frontend at: http://localhost:5173

---

For further questions or help, contact your project administrator or support team.
