exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  const { theme, type } = JSON.parse(event.body);
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Write a romantic ${type} about ${theme}` }]
        }]
      })
    }
  );
  
  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      content: data.candidates[0].content.parts[0].text,
      success: true 
    })
  };
};
