/* global data */
/* exported data */

var $title = document.querySelector('#title');
var $photo = document.querySelector('#photo');
var $notes = document.querySelector('#notes');
var $preview = document.querySelector('.preview');
var $noEntry = document.querySelector('.noEntry.hidden');

$photo.addEventListener('input', function (event) {
  $preview.setAttribute('src', event.target.value);
  if (event.target.value === '') {
    $preview.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

var $ul = document.querySelector('ul');
var $hidden = document.querySelector('.entry.hidden');
var $spanEntries = document.querySelector('.entries');
var $newEntry = document.querySelector('.newEntry');

$spanEntries.addEventListener('click', function (event) {
  $form.className = 'hidden';
  $hidden.className = 'entry';
});

$newEntry.addEventListener('click', function (event) {
  $form.removeAttribute('class');
  $hidden.className = 'entry hidden';
});

window.addEventListener('DOMContentLoaded', function (event) {
  if (data.entries.length === 0) {
    $noEntry.className = 'noEntry';
  } else {
    renderPostsAll(data.entries);
  }
});

var $form = document.querySelector('.forms');
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  renderPosts();
  $hidden.className = 'entry';
  $form.reset();
  $form.className = 'hidden';
  $preview.setAttribute('src', 'images/placeholder-image-square.jpg');
});

function renderPostsAll(entries) {
  for (var i = 0; i < entries.length; i++) {
    var $container = document.createElement('div');
    $container.className = 'container';

    var $row = document.createElement('div');
    $row.className = 'row';
    $container.appendChild($row);

    var $columnHalf1 = document.createElement('div');
    $columnHalf1.className = 'column-half';
    $row.appendChild($columnHalf1);

    var $imgContainer = document.createElement('div');
    $imgContainer.className = 'img-container';
    $columnHalf1.appendChild($imgContainer);

    var $img = document.createElement('img');
    $img.setAttribute('src', entries[i].photo);
    $imgContainer.appendChild($img);

    var $columnHalf2 = document.createElement('div');
    $columnHalf2.className = 'column-half';
    $row.appendChild($columnHalf2);

    var $p1 = document.createElement('p');
    $p1.textContent = entries[i].title;
    $columnHalf2.appendChild($p1);

    var $p2 = document.createElement('p');
    $p2.textContent = entries[i].notes;
    $columnHalf2.appendChild($p2);

    $ul.appendChild($container);
  }
}

function renderPosts() {

  var newObject = {};
  newObject.title = $title.value;
  newObject.photo = $photo.value;
  newObject.notes = $notes.value;
  newObject.entryId = data.nextEntryId;
  data.nextEntryId++;

  data.entries.unshift(newObject);

  var $container = document.createElement('div');
  $container.className = 'container';

  var $row = document.createElement('div');
  $row.className = 'row';
  $container.appendChild($row);

  var $columnHalf1 = document.createElement('div');
  $columnHalf1.className = 'column-half';
  $row.appendChild($columnHalf1);

  var $imgContainer = document.createElement('div');
  $imgContainer.className = 'img-container';
  $columnHalf1.appendChild($imgContainer);

  var $img = document.createElement('img');
  $img.setAttribute('src', newObject.photo);
  $imgContainer.appendChild($img);

  var $columnHalf2 = document.createElement('div');
  $columnHalf2.className = 'column-half';
  $row.appendChild($columnHalf2);

  var $p1 = document.createElement('p');
  $p1.textContent = newObject.title;
  $columnHalf2.appendChild($p1);

  var $p2 = document.createElement('p');
  $p2.textContent = newObject.notes;
  $columnHalf2.appendChild($p2);

  $ul.prepend($container);
}
