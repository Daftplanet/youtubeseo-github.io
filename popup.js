document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generate-button');
  const resultContainer = document.getElementById('result-container');

  generateButton.addEventListener('click', () => {
    const youtubeUrl = document.getElementById('youtube-url').value;

    // Validate YouTube URL
    if (!isValidYouTubeUrl(youtubeUrl)) {
      resultContainer.textContent = 'Invalid YouTube URL';
      return;
    }

    // Send message to background script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { url: youtubeUrl }, (response) => {
        if (response) {
          const { title, description, timestamps, seoTags } = response;
          displayResult(title, description, timestamps, seoTags);
        } else {
          resultContainer.textContent = 'Failed to generate SEO data';
        }
      });
    });
  });

  function isValidYouTubeUrl(url) {
    // Regular expression to validate YouTube URL
    const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}$/;
    return youtubeUrlRegex.test(url);
  }

  function displayResult(title, description, timestamps, seoTags) {
    resultContainer.innerHTML = `
      <h3>Title:</h3>
      <p>${title}</p>
      <h3>Description:</h3>
      <p>${description}</p>
      <h3>Timestamps:</h3>
      <p>${timestamps}</p>
      <h3>SEO Tags:</h3>
      <p>${seoTags}</p>
    `;
  }
});
