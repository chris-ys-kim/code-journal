/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('data');
var dataObj = JSON.parse(previousDataJSON);

data.view = dataObj.view;
data.entries = dataObj.entries;
data.editing = dataObj.editing;
data.nextEntryId = dataObj.nextEntryId;

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});
