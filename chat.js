const apiKey = "sk-proj-zPocXeahxIqy5bnLjxzUT3BlbkFJkrSbemyu8OVz4TJeBbo6";
const endpoint = "https://api.openai.com/v1/chat/completions";

function ____chat(prompt) {
  if (!prompt) {
    return;
  }

  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            "You are an evil ai model in a game. keep your answers short and evil. Do not use harsh language.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-4-turbo",
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data.choices[0].message.content))
    .catch((error) => console.error(error));

  return "Thinking...";
}
