# Backend Environment Setup and Running Guide

## Setting Up Environment Variables

The backend requires the following environment variable to be set for the chat feature:

- `GEMINI_API_KEY`: Your Google Gemini API key. This key is used to authenticate requests to the Gemini generative AI API.

You can set this environment variable in your backend `.env` file:

```
GEMINI_API_KEY=your_actual_google_gemini_api_key_here
```

Make sure to replace `your_actual_google_gemini_api_key_here` with your real API key.

## Starting the Backend Server

To start the backend server on the default port 5000, use the following steps:

1. Install dependencies if not already done:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

OR if you use a specific start script or environment:

```bash
GEMINI_API_KEY=your_api_key npm start
```

3. Verify the server is running on port 5000:

- You should see console logs indicating the server has started and MongoDB connection succeeded.
- You should see no errors related to missing environment variables.

## Testing the Chat API

Once the backend server is running, the frontend Vite dev server is configured to proxy requests starting with `/api` to `http://localhost:5000/`.

To test the chat endpoint, send a POST request to:

```
http://localhost:5000/api/chat
```

With JSON body:

```json
{
  "message": "Your chat message here"
}
```

You should receive a JSON response with the generated Gemini text or an informative error message.

## Additional Notes

- If environment variables are changed, always restart the backend server to apply them.
- Check the backend server logs for errors related to environment variables or API errors.
- Make sure MongoDB is running and connected properly as per other backend requirements.
