const ide = document.getElementById("ide");
const lineNumbers = document.getElementById("line-numbers");

ide.addEventListener("input", updateLineNumbers);
ide.addEventListener("scroll", syncScroll);

let code = "";

function updateLineNumbers() {
  code = ide.value;
  const lines = ide.value.split("\n").length;
  lineNumbers.innerHTML = "";
  for (let i = 1; i <= lines; i++) {
    const lineNumber = document.createElement("div");
    lineNumber.textContent = i;
    lineNumbers.appendChild(lineNumber);
  }
}

function parseCode() {
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
