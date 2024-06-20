const ide = document.getElementById("ide");
const lineNumbers = document.getElementById("line-numbers");


ide.addEventListener('input', updateLineNumbers);
ide.addEventListener('scroll', syncScroll);
ide.addEventListener('keydown', handleTabKey);
ide.addEventListener("input", updateLineNumbers);
ide.addEventListener("scroll", syncScroll);

let code = "";
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

function handleTabKey(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = ide.selectionStart;
    const end = ide.selectionEnd;

    // Insert tab character at cursor position
    ide.value = ide.value.substring(0, start) + '\t' + ide.value.substring(end);

    // Move cursor to right after the inserted tab character
    ide.selectionStart = ide.selectionEnd = start + 1;
  }
}

// Initialize line numbers
updateLineNumbers();



function parseCode() {
  // remove empty lines
  code = code.replace(/^\s*[\r\n]/gm, "");
  lines = code.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("//")) {
      continue;
    }

    // assignment
    if (line.includes("=")) {
      const [variable, value] = line.split("=");
      assign(variable.trim(), value.trim());
    }
  }

  console.log(code);
}

function syncScroll() {
  lineNumbers.scrollTop = ide.scrollTop;
}

// Initialize line numbers
updateLineNumbers();
