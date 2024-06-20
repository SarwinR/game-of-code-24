function loadLevel(jsonPath, levelIndex) {
  fetch(jsonPath)
    .then((response) => response.json())
    .then((config) => {
      const data = config.levels[levelIndex];

      if (!data) {
        console.error("Invalid level index");
        return;
      }

      const background = document.getElementById("left-panel");
      background.style.backgroundImage = `url(${data.base_path + data.background})`;

      const helperCharacter = document.getElementById("evil_character");
      helperCharacter.style.backgroundImage = `url(${data.base_path + data.helper_character})`;

      const character = document.getElementById("character");
      character.style.backgroundImage = `url(${data.base_path + data.player_character})`;
    })
    .catch((error) => {
      console.error("Error loading level config:", error);
    });
}

loadLevel("./levels/javascript_lesson/config.json", 0);
// loadLevel("./levels/javascript_lesson/config.json", 1);