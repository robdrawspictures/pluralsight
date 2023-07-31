var errors = document.getElementById('errors');
var form = document.getElementById('contact');
var required = Array.prototype.slice.call(form.querySelectorAll('[required]'));

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var invalid = [];

  required.forEach(function (field) {

    if (validate(field)) {
      invalid.push(field);
    }
  });

  if (invalid.length) {
    var list = '<h2>Errors</h2><ol id="error-list">';

    invalid.forEach(function (field) {
      list += '<li><a href="#' + field.id + '">' +
        field.previousElementSibling.querySelector('.error-message')
        .textContent + '</a></li>';
    });

    list += '</ol>';

    errors.innerHTML = list;
    errors.focus();
  } else {
    errors.innerHTML = '';
  }
});

function validate(field) {

  var label = field.previousElementSibling;

  if (!field.value.length) {
    label.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');
    return true;
  } else if (field.hasAttribute('aria-invalid')) {
    label.classList.remove('is-invalid');
    field.removeAttribute('aria-invalid');
  }
}
