/* global data */
/* exported data */

var $title = document.querySelector('#title');
var $photo = document.querySelector('#photo');
var $notes = document.querySelector('#notes');
var $preview = document.querySelector('.preview');

$photo.addEventListener('input', function (event) {
  $preview.setAttribute('src', event.target.value);
  if (event.target.value === '') {
    $preview.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

var $form = document.querySelector('.forms');
$form.addEventListener('submit', function (event) {
  event.preventDefault();

  var newObject = {};
  newObject.title = $title.value;
  newObject.photo = $photo.value;
  newObject.notes = $notes.value;
  newObject.entryId = data.nextEntryId;
  data.nextEntryId++;

  data.entries.unshift(newObject);
  $form.reset();
  $preview.setAttribute('src', 'images/placeholder-image-square.jpg');
});
