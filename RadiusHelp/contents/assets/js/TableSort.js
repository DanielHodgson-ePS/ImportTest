


const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
  v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
)(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

var alltables = [];
var allValidTables = [];
var originalTables = [];
var allTableheadings = [];



$(document).ready(function () {

 
  allTables = Array.from(document.querySelectorAll("table"));
  allValidTables = allTables.filter(table => table.querySelector(".t1st") != null);

  console.log(allValidTables.length);
  assignTableDataAttribs();
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
    allTableheadings.push(headings);

    headings.forEach(heading => {
      heading.dataset.clickCount = 0;
      heading.dataset.clickedLast = false;
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


function sortTables() {


  document.querySelectorAll('.t1st > td').forEach(td => {

    td.dataset.clickCount = 0;

    td.addEventListener('click', (() => {


      const table = td.closest('table');
      const tbody = table.querySelector('tbody');
      var tableNum = table.dataset.tableNumber;
      var clickCount = td.dataset.clickCount;
      var newClickCount = clickCount + 1;

      if (newClickCount % 3 == 0) {

        var $clone = originalTables[tableNum].clone(true);

        $("table[data-table-number='" + tableNum + "']").replaceWith($clone);
        sortTables();

      } else {

        Array.from(tbody.querySelectorAll('tr:not(.t1st)'))
          .sort(comparer(Array.from(td.parentNode.children).indexOf(td), this.asc = !this.asc))
          .forEach(tr => tbody.appendChild(tr));
      }

      td.dataset.clickCount = newClickCount;
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


        const heading = allTableheadings[i][c - 1];
        if (typeof heading !== 'undefined')
          var headingText = heading.innerText;
        //console.log("i: " + i + " c: " + c + " heading: " + headingText);
        cell.dataset.title = headingText;
      }
    }
  }
}







