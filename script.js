document.addEventListener('DOMContentLoaded', () => {
  const inputText = document.querySelector('#input-text');
  const outputUri = document.querySelector('#output-uri');
  const generateBtn = document.querySelector('#generate-btn');
  const copyBtn = document.querySelector('#copy-btn');
  const clearBtn = document.querySelector('#clear-btn');
  const downloadBtn = document.querySelector('#download-btn');

  function generateDataUri() {
    const text = inputText.value;
    const encoded = btoa(unescape(encodeURIComponent(text)));
    const dataUri = `data:text/plain;base64,${encoded}`;
    outputUri.value = dataUri;
  }

  generateBtn.addEventListener('click', generateDataUri);

  copyBtn.addEventListener('click', () => {
    outputUri.select();
    document.execCommand('copy');
  });

  clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputUri.value = '';
  });

  downloadBtn.addEventListener('click', () => {
    const dataUri = outputUri.value;
    if (dataUri) {
      const blob = new Blob([dataUri], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data-uri.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  });
});