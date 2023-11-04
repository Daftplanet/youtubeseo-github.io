// Load the YouTube API client library
function loadClient() {
    gapi.client.setApiKey('AIzaSyD84AiG--68_DTmxWgVhYwFKSz0X3r1jOs');
    return gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
        .then(function () {
            console.log('YouTube API client loaded');
        })
        .catch(function (err) {
            console.error('Error loading YouTube API client', err);
        });
}

// Function to fetch video details from YouTube URL
function fetchVideoDetails() {
    const videoUrl = document.getElementById("videoUrl").value;

    // Extract video ID from the URL (assuming standard YouTube URL format)
    const videoId = videoUrl.match(/(?:\?v=|\/embed\/|\/vi\/|\/v\/|\/e\/|\/u\/\w+\/|\/d\/|\/1\/|youtu\.be\/)([^?&\/\n#]+)/)[1];

    // Make a request to fetch video details
    gapi.client.youtube.videos.list({
        part: 'snippet',
        id: videoId
    }).then(function (response) {
        const videoDetails = response.result.items[0].snippet;

        // Display video details
        document.getElementById("title").textContent = videoDetails.title;
        document.getElementById("description").textContent = videoDetails.description;
        document.getElementById("seoTags").textContent = videoDetails.tags.join(', ');

    }).catch(function (err) {
        console.error('Error fetching video details', err);
    });
}

// Initialize the Google API client
gapi.load('client', loadClient);
