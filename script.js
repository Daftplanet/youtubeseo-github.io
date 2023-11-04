document.getElementById('generateBtn').addEventListener('click', function() {
  const videoUrl = document.getElementById('videoUrl').value;
  fetch('/getVideoDetails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ videoUrl })
  })
  .then(response => response.json())
  .then(videoDetails => {
    // Handle video details
  })
  .catch(error => {
    // Handle errors
  });
});
