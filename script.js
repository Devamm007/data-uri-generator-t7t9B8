document.addEventListener('DOMContentLoaded', () => {
  const inputText = document.querySelector('#input-text');
  const outputUri = document.querySelector('#output-uri');
  const generateBtn = document.querySelector('#generate-btn');

  generateBtn.addEventListener('click', () => {
    const text = inputText.value;
    const encoded = btoa(unescape(encodeURIComponent(text)));
    const dataUri = `data:text/plain;base64,${encoded}`;
    outputUri.value = dataUri;
  });
});