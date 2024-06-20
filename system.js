function loadLevel(json_path) {
  // load json file from  asset folder

  fetch(json_path)
    .then((response) => response.json())
    .then((data) => {
      const background = document.getElementById("left-panel");
      background.style.backgroundImage = `url(${
        data.base_path + data.background
      })`;

      const character = document.getElementById("character");
      character.style.backgroundImage = `url(${
        data.base_path + data.player_character
      })`;
    });
}

loadLevel("./levels/javascript_lesson/config.json");
