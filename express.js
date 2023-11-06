require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const cors = require('cors');

// Use CORS for all routes
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json()); // to support JSON-encoded bodies

// Serve the HTML page at the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// Endpoint to handle YouTube API requests
app.post('/youtube-video-details', async (req, res) => {
  try {
    const videoID = req.body.videoID;
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoID}&key=${process.env.YOUTUBE_API_KEY}&part=snippet,contentDetails`);
    
    console.log('YouTube API Response:', JSON.stringify(response.data, null, 2)); // This will format the JSON for readability
    
    res.json(response.data);
  } catch (error) {
    console.error('Error with YouTube API request:', error);
    res.status(500).send('Error with YouTube API request');
  }
});

// Endpoint to handle OpenAI requests
app.post('/ask-openai', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: req.body.prompt,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error with OpenAI request:', error);
    res.status(500).send('Error with OpenAI request');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.post('/seo-optimize', async (req, res) => {
  try {
    // Extract video data from request
    const { title, description, timestamps, tags } = req.body;

    // TODO: Here you would typically call OpenAI's API to generate SEO-friendly content
    // using the video data. This is a simplified version and should be expanded.
    
    
    // For example, optimizing the title
    const optimizedTitleResponse = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `Optimize this title for SEO: ${title}`,
        max_tokens: 60
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );
    // Construct optimized data object
    const optimizedData = {
      title: optimizedTitleResponse.data.choices[0].text.trim(),
      description: description, // Here you would also optimize the description
      timestamps: timestamps, // And perhaps suggest better timestamps
      tags: tags // And optimize tags
    };

    res.json(optimizedData);
  } catch (error) {
    console.error('Error with SEO optimization request:', error);
    res.status(500).send('Error with SEO optimization request');
  }
});
