const ide = document.getElementById("ide");
const lineNumbers = document.getElementById("line-numbers");

ide.addEventListener("input", updateLineNumbers);
ide.addEventListener("scroll", syncScroll);
ide.addEventListener("keydown", handleTabKey);
ide.addEventListener("input", updateLineNumbers);
ide.addEventListener("scroll", syncScroll);

let code = "";
function updateLineNumbers() {
  const lines = ide.value.split("\n").length;
  lineNumbers.innerHTML = "";
  for (let i = 1; i <= lines; i++) {
    const lineNumber = document.createElement("div");
    lineNumber.textContent = i;
    lineNumbers.appendChild(lineNumber);
  }
}

function syncScroll() {
  lineNumbers.scrollTop = ide.scrollTop;
}

function handleTabKey(e) {
  if (e.key === "Tab") {
    e.preventDefault();
    const start = ide.selectionStart;
    const end = ide.selectionEnd;

    // Insert tab character at cursor position
    ide.value = ide.value.substring(0, start) + "\t" + ide.value.substring(end);
    // Move cursor to right after the inserted tab character
    ide.selectionStart = ide.selectionEnd = start + 1;
  }
}

// Initialize line numbers
updateLineNumbers();

async function parseCode() {
  code = ide.value;

  // console.log("code: " + code);

  // let ai_line = await __sendMessageToAI(
  //   "code: " + code,
  //   'given the code, parse it and give it to me in this form: ["command1", "command2", ...]. The loop format is: loop <number> { code } .keep the syntax lenient and accept any loop types as it is for beginner  The valid commands that you should return are: [move("left"),move("right"),move("up"),move("down")] if there are any errors - just return "error"'
  // );

  // console.log(ai_line);

  lines = code.split("\n");
  // remove [] and split by comma
  //ai_line = ai_line ? ai_line.slice(1, -1).split(",") : [];
  // lines = ai_line;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("//") || line === "") {
      continue;
    }

    // assignment
    if (line.includes("=")) {
      // check if there is computation
      // if (
      //   line.includes("+") ||
      //   line.includes("-") ||
      //   line.includes("*") ||
      //   line.includes("/")
      // ) {
      //   const [variable, expression] = line.split("=");
      //   eval(line);
      //   assign(variable.trim(), value);
      // } else {
      const [variable, value] = line.split("=");
      eval(line);
      assign(variable.trim(), value.trim());
      // }
    }
    // if move("direction")
    else if (line.startsWith("move")) {
      const direction = line.split('"')[1].trim();
      let result = movePlayer(direction);
    } else {
      sendMessageToAI(
        code +
          "\n" +
          "Pinpoint the error in the code. At the end give the line number (consider empty lines as well) and the error in this format: [line 3]: [error]"
      );
      break;
    }

    // timeout 1 second
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
}

function syncScroll() {
  lineNumbers.scrollTop = ide.scrollTop;
}

// Initialize line numbers
updateLineNumbers();
