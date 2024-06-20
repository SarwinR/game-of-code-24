var character = document.getElementById("character");
var speed = 10; // Increase speed for noticeable movement

// window.addEventListener('keydown', function(event) {
//   var left = parseInt(character.style.left, 10);
//   var top = parseInt(character.style.top, 10);

//   switch (event.key) {
//     case 'a': // Move left
//       character.style.left = (left - speed) + 'px';
//       break;
//     case 'd': // Move right
//       character.style.left = (left + speed) + 'px';
//       break;
//     case 'w': // Move up
//       character.style.top = (top - speed) + 'px';
//       break;
//     case 's': // Move down
//       character.style.top = (top + speed) + 'px';
//       break;
//   }
// });

function move_character(direction) {
  var left = parseInt(character.style.left, 10);
  var top = parseInt(character.style.top, 10);

  switch (direction) {
    case "left": // Move left
      character.style.left = left - speed + "px";
      break;
    case "right": // Move right
      character.style.left = left + speed + "px";
      break;
    case "up": // Move up
      character.style.top = top - speed + "px";
      break;
    case "down": // Move down
      character.style.top = top + speed + "px";
      break;
  }
}

// Function to center the character
function centerCharacter() {
  var viewportWidth = window.innerWidth;
  var viewportHeight = window.innerHeight;

  var characterWidth = character.offsetWidth;
  var characterHeight = character.offsetHeight;

  var left = (viewportWidth - characterWidth) / 2;
  var top = (viewportHeight - characterHeight) / 2;

  character.style.left = left + "px";
  character.style.top = top + "px";
}

// Center the character on page load
window.addEventListener("load", centerCharacter);

// Re-center the character if the window is resized
window.addEventListener("resize", centerCharacter);
