const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');

const app = express();
const PORT = 3000;

// To parse JSON bodies
app.use(bodyParser.json());

// Replace with your actual API key
const API_KEY = 'AIzaSyB4Qpb290myTTiq2NPa03Jwhen87XGkp6w
';

app.post('/youtube-video-details', async (req, res) => {
  const { videoID } = req.body;
  const youtube = google.youtube({
    version: 'v3',
    auth: API_KEY
  });

  try {
    const response = await youtube.videos.list({
      part: 'snippet',
      id: videoID
    });

    const videoDetails = response.data.items[0];
    if (videoDetails) {
      res.json(videoDetails);
    } else {
      res.status(404).send('Video not found');
    }
  } catch (error) {
    console.error('Error fetching video details:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
