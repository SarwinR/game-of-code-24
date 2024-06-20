function loadLevel(json_path) {
  // load json file from  asset folder

  fetch(json_path)
    .then((response) => response.json())
    .then((data) => {
      // get element by id left-panel
      console.log(data);
      const background = document.getElementById("left-panel");
      // set background image
      background.style.backgroundImage = `url(${
        data.base_path + data.background
      })`;
    });
}

loadLevel("./levels/javascript_lesson/config.json");
