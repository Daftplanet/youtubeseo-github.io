document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('get-info').addEventListener('click', () => {
        var youtubeUrl = document.getElementById('youtube-url').value;
        var videoId = extractVideoID(youtubeUrl);
        if (videoId) {
            fetchVideoInfo(videoId);
        } else {
            alert('Please enter a valid YouTube video URL.');
        }
    });
});

function extractVideoID(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function fetchVideoInfo(videoId) {
    var url = `/fetchVideoInfo?videoId=${videoId}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.items.length === 0) {
                alert('No video information found. Please check the video ID.');
                return;
            }
            var snippet = data.items[0].snippet;
            document.getElementById('video-title').textContent = snippet.title;
            document.getElementById('video-thumbnail').src = snippet.thumbnails.high.url;
            document.getElementById('video-thumbnail').classList.add('thumbnail-visible');

            var descriptionAndTimestamps = extractTimestamps(snippet.description);
            document.getElementById('video-description').textContent = descriptionAndTimestamps.description;
            document.getElementById('video-timestamps').textContent = descriptionAndTimestamps.timestamps.join('\n');

            var tags = snippet.tags;
            document.getElementById('seotags').textContent = tags && tags.length ? tags.join(', ') : 'No SEO tags available.';
        })
        .catch(error => {
            console.error('Error fetching video information:', error);
            alert('There was an error fetching the video information.');
        });
}

function extractTimestamps(description) {
    // Your existing extractTimestamps logic here
    // ...
}

    // Remove the 'TIMESTAMPS:' keyword from the description before processing
    description = description.replace(/^TIMESTAMPS:.*$/gim, '');
  
    let lines = description.split('\n');
    let timestamps = [];
    let descriptionText = [];
    let capturingTimestamps = false;
  
    lines.forEach(line => {
      // Check if the line contains a timestamp format
      if (line.match(/\d+:\d+/)) {
        // Add the line to timestamps if it starts with a timestamp pattern
        if (line.trim().match(/^\d+:\d+/)) {
          timestamps.push(line.trim());
        } else {
          descriptionText.push(line);
        }
      } else {
        descriptionText.push(line);
      }
    });
  
    return {
      description: descriptionText.join('\n').trim(), // Rejoin the cleaned description text
      timestamps: timestamps // Return the extracted timestamps
    };
  }
  
