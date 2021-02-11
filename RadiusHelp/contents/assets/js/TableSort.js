const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
  v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
)(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

var allTables = document.querySelectorAll("table");
var originalTables = [];


$(document).ready(function() {

  assignTableDataAttribs();
  cloneOriginalTables();
  sortTables();
});


function assignTableDataAttribs() {

  for (i = 0; i < allTables.length; i++) {
    var table = allTables[i];
    table.dataset.tableNumber = i;

    var headings = table.querySelector('.t1st').querySelectorAll("td");

    headings.forEach(heading => {
      heading.dataset.clickCount = 0;
      heading.dataset.clickedLast = false;
    });
  }
}


function cloneOriginalTables() {

  for (i = 0; i < allTables.length; i++) {
    table = allTables[i];
    var clone = $("table[data-table-number='" + i + "']").clone(true);
    originalTables.push(clone);
  }
}


function sortTables() {



  document.querySelectorAll('.t1st > td').forEach(td => {

    
  //  if(td.dataset.clickedLast != true) {
      td.dataset.clickCount = 0;
   // }
  //  td.dataset.clickedLast = false;
    

    td.addEventListener('click', (() => {
    
   // td.dataset.clickedLast = true;
    const table = td.closest('table');
    const tbody = table.querySelector('tbody');
    var tableNum = table.dataset.tableNumber;
    var clickCount = td.dataset.clickCount;
    
    
   // if(td.dataset.clickedLast == true) 
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
  
  ))});
}





