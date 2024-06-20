
var form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {

    event.preventDefault();
  
   
    var nameInput = document.getElementById('name');
  
    localStorage.setItem('name', nameInput.value);
  
    
    form.style.display = 'none';
  });