
  const ide = document.getElementById('ide');
  const lineNumbers = document.getElementById('line-numbers');

  ide.addEventListener('input', updateLineNumbers);
  ide.addEventListener('scroll', syncScroll);

  function updateLineNumbers() {
    const lines = ide.value.split('\n').length;
    lineNumbers.innerHTML = '';
    for (let i = 1; i <= lines; i++) {
      const lineNumber = document.createElement('div');
      lineNumber.textContent = i;
      lineNumbers.appendChild(lineNumber);
    }
  }

  function syncScroll() {
    lineNumbers.scrollTop = ide.scrollTop;
  }

  // Initialize line numbers
  updateLineNumbers();
