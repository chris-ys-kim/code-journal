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
var $new = document.querySelector('.new');
var $editEntry = document.querySelector('.editEntry.hidden');
var $delete = document.querySelector('.delete.hidden');

$ul.addEventListener('click', function (event) {
  if (event.target.getAttribute('data-entry-id') !== null) {
    $hidden.className = 'entry hidden';
    $form.removeAttribute('class');
    $new.className = 'new hidden';
    $editEntry.className = 'editEntry';
    $delete.className = 'delete';

    data.editing = data.entries[data.entries.length - event.target.getAttribute('data-entry-id')];
    $title.value = data.editing.title;
    $photo.value = data.editing.photo;
    $notes.value = data.editing.notes;
    $preview.setAttribute('src', data.editing.photo);
  }
});

$delete.addEventListener('click', function (event) {
  $modal.className = 'modal';
});

var $modal = document.querySelector('.modal');
var $cancel = document.querySelector('.cancel');
$cancel.addEventListener('click', function (event) {
  $modal.className = 'modal hidden';
});

var $confirm = document.querySelector('.confirm');
$confirm.addEventListener('click', function (event) {
  $modal.className = 'modal hidden';
  $form.className = 'hidden';
  $hidden.className = 'entry';

  for (var i = 0; i < data.entries.length; i++) {
    var first = $ul.firstElementChild;
    $ul.removeChild(first);
  }

  data.entries.splice(data.entries.length - data.editing.entryId, 1);

  for (var element of data.entries) {
    $ul.appendChild(renderPosts(element));
  }

  data.nextEntryId--;
  data.editing = null;

  if (data.entries.length === 0) {
    $noEntry.className = 'noEntry';
  }

});

$spanEntries.addEventListener('click', function (event) {
  $form.className = 'hidden';
  $hidden.className = 'entry';
});

$newEntry.addEventListener('click', function (event) {
  $form.removeAttribute('class');
  $hidden.className = 'entry hidden';
  $delete.className = 'delete hidden';
  data.editing = null;
});

window.addEventListener('DOMContentLoaded', function (event) {
  if (data.entries.length === 0) {
    $noEntry.className = 'noEntry';
  } else {
    // creating multiple DOM Trees using for loop then append to $ul
    for (var i = 0; i < data.entries.length; i++) {
      var entrydos = renderPosts(data.entries[i]);
      $ul.appendChild(entrydos);
    }
  }
});

var $form = document.querySelector('.forms');
$form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (data.editing !== null && data.entries.length !== 0) {
    data.entries[data.entries.length - data.editing.entryId].title = $title.value;
    data.entries[data.entries.length - data.editing.entryId].photo = $photo.value;
    data.entries[data.entries.length - data.editing.entryId].notes = $notes.value;

    for (var i = 0; i < data.entries.length; i++) {
      var first = $ul.firstElementChild;
      $ul.removeChild(first);
    }

    for (var element of data.entries) {
      $ul.appendChild(renderPosts(element));
    }
  } else {
    var newObject = {};
    newObject.title = $title.value;
    newObject.photo = $photo.value;
    newObject.notes = $notes.value;
    newObject.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(newObject);

    var entrydos = renderPosts(newObject); // creating a single DOM Tree

    $ul.prepend(entrydos); // appending the DOM Tree to $ul
  }

  data.editing = null;
  $noEntry.className = 'noEntry hidden';
  $hidden.className = 'entry';
  $form.reset();
  $form.className = 'hidden';
  $preview.setAttribute('src', 'images/placeholder-image-square.jpg');
});

function renderPosts(entries) {
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
  $img.setAttribute('src', entries.photo);
  $imgContainer.appendChild($img);

  var $columnHalf2 = document.createElement('div');
  $columnHalf2.className = 'column-half';
  $row.appendChild($columnHalf2);

  var $icon = document.createElement('i');
  $icon.className = 'fas fa-pen right';
  $icon.setAttribute('data-entry-id', entries.entryId);
  $columnHalf2.appendChild($icon);

  var $p1 = document.createElement('p');
  $p1.textContent = entries.title;
  $columnHalf2.appendChild($p1);

  var $p2 = document.createElement('p');
  $p2.textContent = entries.notes;
  $columnHalf2.appendChild($p2);

  return $container;
}
