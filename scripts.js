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
            document.getElementById('video-description').textContent = snippet.description;

            // Handling SEO tags
            var tags = snippet.tags; // Tags come from the snippet object
            document.getElementById('seotags').textContent = tags && tags.length ? tags.join(', ') : 'No SEO tags available.';

            // Extracting timestamps
            var timestampsData = extractTimestamps(snippet.description);
            document.getElementById('video-timestamps').textContent = timestampsData.timestamps.join('\n');
            document.getElementById('video-description').textContent = timestampsData.description;
        })
        .catch(error => {
            console.error('Error fetching video information:', error);
            alert('There was an error fetching the video information.');
        });
}

function extractTimestamps(description) {
    // Assuming that the extractTimestamps function works as intended and returns an object with description and timestamps
    // ... (Your existing extractTimestamps logic here)
}


// Additional functions like extractTimestamps can be placed here.

  
  // Other functions like extractVideoID, etc.
  // ...
  

document.getElementById('get-info').onclick = function() {
    var videoUrl = document.getElementById('youtube-url').value;
    var videoId = extractVideoID(videoUrl);
  
    if(videoId) {
      fetchVideoInfo(videoId);
    } else {
      alert('Please enter a valid YouTube video URL.');
    }
  };
  function fetchVideoInfo(videoId) {
    // ...
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // ...
  
        // When setting the source:
        const thumbnailElement = document.getElementById('video-thumbnail');
        thumbnailElement.src = snippet.thumbnails.high.url;
        thumbnailElement.classList.add('thumbnail-visible');
  
        // ...
  
      })
      .catch(error => {
        console.error('Error fetching video information:', error);
        alert('There was an error fetching the video information.');
      });
  }
  
  function extractVideoID(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
  
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return null;
    }
  }
  
  function fetchVideoInfo(videoId) {
  var url = `/your-server-endpoint?videoId=${videoId}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if(data.items.length === 0) {
        alert('No video information found. Please check the video ID.');
        return;
      }
      // process the data as required
    })
    .catch(error => {
      console.error('Error fetching video information:', error);
    });
}

        var snippet = data.items[0].snippet;
        document.getElementById('video-title').textContent = snippet.title;
// When setting the source:
document.getElementById('video-thumbnail').src = snippet.thumbnails.high.url;
document.getElementById('video-thumbnail').classList.add('thumbnail-visible');

// If you need to hide it again for some reason, you would use:
document.getElementById('video-thumbnail').classList.remove('thumbnail-visible');

        var descriptionAndTimestamps = extractTimestamps(snippet.description);
        document.getElementById('video-description').textContent = descriptionAndTimestamps.description;
        document.getElementById('video-timestamps').textContent = descriptionAndTimestamps.timestamps.join('\n');
  
        // Now also extracting and displaying tags (if they exist)
        var tags = snippet.tags; // Tags come from the snippet object
        if (tags && tags.length > 0) {
          document.getElementById('seotags').textContent = tags.join(', ');
        } else {
          document.getElementById('seotags').textContent = 'No SEO tags available.';
        }
      })
      .catch(error => {
        console.error('Error fetching video information:', error);
      });
  }
  
  function extractTimestamps(description) {
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
  
