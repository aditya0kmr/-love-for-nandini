exports.handler = async (event) => {
  // Set CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: 'Method Not Allowed. Please use POST.' 
      })
    };
  }

  try {
    // Parse and validate request body
    let theme, type;
    try {
      const body = JSON.parse(event.body);
      theme = body.theme;
      type = body.type;
    } catch (parseError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid JSON in request body'
        })
      };
    }

    // Validate required parameters
    if (!theme || !type) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Missing required parameters: theme and type'
        })
      };
    }

    // Validate API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY environment variable is not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Server configuration error. Please contact administrator.'
        })
      };
    }

    // Build enhanced prompt based on content type
    let prompt;
    switch(type.toLowerCase()) {
      case 'love-letter':
        prompt = `Write a heartfelt and deeply romantic love letter about: ${theme}. Make it emotional, sincere, passionate, and beautifully written. Include poetic language and genuine feelings.`;
        break;
      case 'poem':
        prompt = `Write a beautiful romantic poem about: ${theme}. Make it poetic, touching, full of emotion, and use vivid imagery. Create verses that flow naturally.`;
        break;
      case 'message':
        prompt = `Write a sweet and loving message about: ${theme}. Keep it warm, affectionate, heartfelt, and genuine. Make it personal and touching.`;
        break;
      case 'anniversary':
        prompt = `Write a romantic anniversary wish about: ${theme}. Make it celebratory, loving, memorable, and full of appreciation for the journey together.`;
        break;
      default:
        prompt = `Write romantic content about: ${theme}. Make it heartfelt and sincere.`;
    }

    // Call Gemini API with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    let response;
    try {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }],
            generationConfig: {
              temperature: 0.9,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          }),
          signal: controller.signal
        }
      );
    } catch (fetchError) {
      clearTimeout(timeout);
      if (fetchError.name === 'AbortError') {
        return {
          statusCode: 504,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Request timeout. Please try again.'
          })
        };
      }
      throw fetchError;
    }
    clearTimeout(timeout);

    // Check if API response is OK
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          success: false,
          error: `AI service error: ${response.status}. Please try again later.`
        })
      };
    }

    // Parse API response
    const data = await response.json();

    // Validate response structure
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
      console.error('Unexpected API response structure:', JSON.stringify(data));
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Unexpected response from AI service. Please try again.'
        })
      };
    }

    const generatedText = data.candidates[0].content.parts[0].text;

    if (!generatedText || generatedText.trim() === '') {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'AI generated empty content. Please try again with a different prompt.'
        })
      };
    }

    // Success! Return the generated content
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        content: generatedText.trim()
      })
    };

  } catch (error) {
    // Catch-all error handler
    console.error('Unexpected error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      })
    };
  }
};
