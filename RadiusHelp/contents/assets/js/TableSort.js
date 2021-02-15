const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
  v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
)(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

var alltables = [];
var allValidTables = [];
var originalTables = [];
var allTableotherHeadings = [];

var projectPath = window.location.protocol + "//" + window.location.host;

alert(projectPath);

$(document).ready(function () {

  allTables = Array.from(document.querySelectorAll("table"));
  allValidTables = allTables.filter(table => table.querySelector(".t1st") != null);

  assignTableDataAttribs();
  addInitialTableHeadingImages();
  cloneOriginalTables();
  sortTables();
  assignTitleDataToCells();
});


function assignTableDataAttribs() {

  for (i = 0; i < allValidTables.length; i++) {
    var table = allValidTables[i];
    table.dataset.tableNumber = i;

    var headingRow = table.querySelector('.t1st');

    if (null == headingRow)
      continue;

    var headings = table.querySelector('.t1st').querySelectorAll("td");
    allTableotherHeadings.push(headings);

    headings.forEach(heading => {
      heading.dataset.clickCount = 0;
      heading.dataset.clickedLast = "false";
      var headingText = heading.querySelector("p");
      $(headingText).wrap("<div class='tableIconWrapper'>");
    });
  }
}


function cloneOriginalTables() {

  for (i = 0; i < allValidTables.length; i++) {
    table = allValidTables[i];
    var clone = $("table[data-table-number='" + i + "']").clone(true);
    originalTables.push(clone);
  }
}

function addInitialTableHeadingImages() {

  var unsortedIcon = new Image();
  unsortedIcon.src = projectPath + "/assets/Images/Icons/unsorted.png";
  unsortedIcon.className = "tableIcon";

  $(".tableIconWrapper > p").append(unsortedIcon);
}


function sortTables() {

  document.querySelectorAll('.t1st > td').forEach(td => {

    td.addEventListener('click', (() => {

      const table = td.closest('table');
      const tbody = table.querySelector('tbody');

      var currentHeading = td;
      var tableNum = table.dataset.tableNumber;
      var headings = Array.from(table.querySelectorAll('.t1st > td'));


      headings.forEach(heading => {
        heading.dataset.clickedLast = "false";

        var unsortedIcon = new Image();
        unsortedIcon.src = "/assets/Images/Icons/unsorted.png";
        unsortedIcon.className = "tableIcon";

        heading.querySelector("img").replaceWith(unsortedIcon);
        currentHeading.dataset.clickedLast = "true";

        if (heading.dataset.clickedLast == "false") {
          heading.dataset.clickCount = 0;
        }

      });

      var currClickCount = parseInt(currentHeading.dataset.clickCount);
      var newClickCount = currClickCount + 1;
      currentHeading.dataset.clickCount = newClickCount;


      if (currentHeading.dataset.clickCount % 3 == 0) {

        var $clone = originalTables[tableNum].clone(true);
        $("table[data-table-number='" + tableNum + "']").replaceWith($clone);
        sortTables();
      }

      if (currentHeading.dataset.clickCount % 1 == 0) {

        var ascendingIcon = new Image();
        ascendingIcon.src = projectPath + "/assets/Images/Icons/sort-ascending.png";
        ascendingIcon.className = "tableIcon";
        currentHeading.querySelector("img").replaceWith(ascendingIcon);
      }


      if (currentHeading.dataset.clickCount % 2 == 0) {

        var descendingIcon = new Image();
        descendingIcon.src = projectPath + "/assets/Images/Icons/sort-descending.png";
        descendingIcon.className = "tableIcon";
        currentHeading.querySelector("img").replaceWith(descendingIcon);
      }

      Array.from(tbody.querySelectorAll('tr:not(.t1st)'))
        .sort(comparer(Array.from(td.parentNode.children).indexOf(td), this.asc = !this.asc))
        .forEach(tr => tbody.appendChild(tr));
    }

    ))
  });
}


// responsive table functions-----------------------------------

function assignTitleDataToCells() {

  for (i = 0; i < allValidTables.length; i++) {

    var table = allValidTables[i];
    var headingRow = table.querySelector('.t1st');

    if (null == headingRow)
      continue;

    var r = 1;

    while (row = table.rows[r++]) {

      var c = 0;

      while (cell = row.cells[c++]) {

        const heading = allTableotherHeadings[i][c - 1];
        if (typeof heading !== 'undefined')
          var headingText = heading.innerText;
        //console.log("i: " + i + " c: " + c + " heading: " + headingText);
        cell.dataset.title = headingText;
      }
    }
  }
}







