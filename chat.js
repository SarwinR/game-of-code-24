const apiKey = "sk-proj-zPocXeahxIqy5bnLjxzUT3BlbkFJkrSbemyu8OVz4TJeBbo6";
const endpoint = "https://api.openai.com/v1/chat/completions";

document.addEventListener("DOMContentLoaded", () => {
  const chatPanel = document.getElementById("chat-panel");
  const chatMessages = document.getElementById("chat-messages");
  const currentInput = document.getElementById("current-input");

  function displayMessage(role, text) {
    currentInput.textContent = "";

    const messageElem = document.createElement("div");
    messageElem.classList.add("message", role);
    messageElem.textContent = text;
    chatMessages.appendChild(messageElem);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendMessageToAI(message) {
    if (!message) return;

    displayMessage("user", `> ${message}`);

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              'You are a programming tutor. You are also an evil AI model in a game. Keep your answers short and evil. Do not use harsh language. The user may sometimes send commands that are not correctly formatted, you just need to quickly explain why its not good and how suggest the correct command. Commands: [move("direction") -> direction: left, right, top, down)].',
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const reply = data.choices[0].message.content;
        displayMessage("system", reply);
      })
      .catch((error) => {
        console.error("Error:", error);
        displayMessage("system", "Error: Failed to fetch response");
      });
  }

  chatPanel.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();

      const message = currentInput.textContent.trim();

      if (message) {
        safe_msg = message.toLowerCase();
        if (safe_msg.startsWith("move")) {
          const direction = safe_msg.split('"')[1];
          if (direction in ["left", "right", "up", "down"])
            move_character(direction);
          else {
            displayMessage("user", `> ${message}`);
            sendMessageToAI(message);
          }
        } else {
          sendMessageToAI(message);
        }
      }
    }
  });

  chatPanel.addEventListener("click", function () {
    currentInput.focus();
  });

  currentInput.focus();
});
