/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var entryJSON = JSON.stringify(data.entries);
  localStorage.setItem('entries', entryJSON);
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});
