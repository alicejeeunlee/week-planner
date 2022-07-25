var $entryButton = document.querySelector('.entry-button');
var $modalLayout = document.querySelector('.modal-layout');
var $form = document.querySelector('.modal');
var $table = document.querySelector('table');
var $tbody = document.querySelector('tbody');
var $h2 = document.querySelector('h2');
var $dayButton = document.querySelectorAll('button');
var $sundayButton = document.querySelector('.sundayButton');
var $mondayButton = document.querySelector('.mondayButton');
var $tuesdayButton = document.querySelector('.tuesdayButton');
var $wednesdayButton = document.querySelector('.wednesdayButton');
var $thursdayButton = document.querySelector('.thursdayButton');
var $fridayButton = document.querySelector('.fridayButton');
var $saturdayButton = document.querySelector('.saturdayButton');

var dataModel = {
  Sunday: [],
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  view: null
};

var previousWeeklyData = localStorage.getItem('weekly-planner-storage');
if (previousWeeklyData !== null) {
  dataModel = JSON.parse(previousWeeklyData);
}
function addToLocalStorage(event) {
  var dataModelJSON = JSON.stringify(dataModel);
  localStorage.setItem('weekly-planner-storage', dataModelJSON);
}
window.addEventListener('beforeunload', addToLocalStorage);

function addEntry(event) {
  $modalLayout.className = 'modal-layout';
}
$entryButton.addEventListener('click', addEntry);

function submitEntry(event) {
  event.preventDefault();
  var entry = {
    time: $form.time.value,
    description: $form.description.value
  };
  dataModel[$form.day.value].unshift(entry);
  $table.appendChild(renderEntry(entry));
  $form.reset();
  closeForm();
}
$form.addEventListener('submit', submitEntry);

function renderEntry(entry) {
  var $tr = document.createElement('tr');
  var $tdTime = document.createElement('td');
  $tdTime.textContent = entry.time;
  $tr.appendChild($tdTime);

  var $tdDescription = document.createElement('td');
  $tdDescription.textContent = entry.description;
  $tr.appendChild($tdDescription);

  return $tr;
}

function refreshPage(event) {
  var $plansList = dataModel[dataModel.view];
  for (var i = 0; i < $plansList.length; i++) {
    $tbody.appendChild(renderEntry($plansList[i]));
  }
  $h2.textContent = 'Scheduled Events for ' + dataModel.view;
}
window.addEventListener('DOMContentLoaded', refreshPage);

function closeForm() {
  $modalLayout.className = 'hidden';
}

// function appendToTbody(event) {
//   $h2.textContent = 'Scheduled Events for Friday';
// }
// $fridayButton.addEventListener('click', appendToTbody);

// function changeTable(event) {
//   for (var i = 0; i < $dayButton.length; i++) {
//     if ($dayButton.textContent === dataModel.view) {
//       $h2.textContent = 'Scheduled Events for Friday';
//     }
//   }
// }
// $dayButton.addEventListener('click', changeTable);

// function changeH2(event) {
//   // console.log(event.target);
//   for (var i = 0; i < $dayButton.length; i++) {
//     console.log($dayButton[i]);
//     if (event.target === $dayButton[i]) {
//       var $day = $dayButton[i].textContent;
//       $h2.textContent = 'Scheduled Events for ' + $day;
//     }
//   }
// }
// $saturdayButton.addEventListener('click', changeH2);

function changeH2(event) {
  var $eventText = event.target.textContent;
  $h2.textContent = 'Scheduled Events for ' + $eventText;
  dataModel.view = $eventText;
  var $plansList = dataModel[dataModel.view];
  for (var i = 0; i < $plansList.length; i++) {
    $tbody.appendChild(renderEntry($plansList[i]));
  }
  $tbody.replaceWith($something);
}
$saturdayButton.addEventListener('click', changeH2);
$mondayButton.addEventListener('click', changeH2);
$tuesdayButton.addEventListener('click', changeH2);
$wednesdayButton.addEventListener('click', changeH2);
$thursdayButton.addEventListener('click', changeH2);
$fridayButton.addEventListener('click', changeH2);
$sundayButton.addEventListener('click', changeH2);
