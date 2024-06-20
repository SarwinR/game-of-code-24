
var form = document.getElementById('myForm');


if (localStorage.getItem('name')) {
 
  form.style.display = 'none';
} else {

  form.addEventListener('submit', function(event) {
   
    event.preventDefault();

   
    var nameInput = document.getElementById('name');

    localStorage.setItem('name', nameInput.value);

 
    form.style.display = 'none';
  });
}