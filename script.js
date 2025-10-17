document.addEventListener('DOMContentLoaded', () => {
  const inputText = document.querySelector('#input-text');
  const fileInput = document.querySelector('#file-input');
  const outputUri = document.querySelector('#output-uri');
  const generateBtn = document.querySelector('#generate-btn');
  const copyBtn = document.querySelector('#copy-btn');
  const clearBtn = document.querySelector('#clear-btn');
  const downloadBtn = document.querySelector('#download-btn');

  function getMimeType(file) {
    return file.type || 'application/octet-stream';
  }

  function generateDataUri() {
    const text = inputText.value.trim();
    if (text) {
      // Generate Data URI from text input
      const encoded = btoa(unescape(encodeURIComponent(text)));
      const dataUri = `data:text/plain;base64,${encoded}`;
      outputUri.value = dataUri;
    } else if (fileInput.files.length > 0) {
      // Generate Data URI from uploaded file
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result.split(',')[1];
        const mimeType = getMimeType(file);
        const dataUri = `data:${mimeType};base64,${base64Data}`;
        outputUri.value = dataUri;
      };
      reader.readAsDataURL(file);
    } else {
      outputUri.value = '';
    }
  }

  generateBtn.addEventListener('click', generateDataUri);

  copyBtn.addEventListener('click', () => {
    outputUri.select();
    document.execCommand('copy');
  });

  clearBtn.addEventListener('click', () => {
    inputText.value = '';
    fileInput.value = '';
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