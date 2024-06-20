var form = document.getElementById('myForm');

// Check if the 'name' cookie exists
if (document.cookie.split(';').some((item) => item.trim().startsWith('name='))) {
 
  form.style.display = 'none';
} else {
 
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    var nameInput = document.getElementById('name');

  
    if (nameInput.value !== '') {
      
      document.cookie = 'name=' + nameInput.value;

      // Hide the form
      form.style.display = 'none';
    }
  });
}