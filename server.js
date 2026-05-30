// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Allow requests from your frontend and parse JSON
app.use(cors());
app.use(express.json());

app.post('/api/download', async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'Please provide an Instagram URL' });
  }

  try {
    // NOTE: Replace these details with a real third-party Instagram API from RapidAPI
    const options = {
      method: 'GET',
      url: 'https://instagram-reels-downloader-api-example.p.rapidapi.com/reels',
      params: { reel_url: url },
      headers: {
        'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY_HERE',
        'X-RapidAPI-Host': 'instagram-reels-downloader-api-example.p.rapidapi.com'
      }
    };

    // Fetch the video data from the 3rd party API
    const response = await axios.request(options);
    
    // Assuming the API returns the direct MP4 link in response.data.video_url
    res.json({ videoUrl: response.data.video_url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch the reel. Please check the URL or try again later.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
