
const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));


document.querySelectorAll('.t1st > td').forEach(td => td.addEventListener('click', (() => {
  
  const table = td.closest('table');
  const tbody = table.querySelector('tbody');  
  
  Array.from(tbody.querySelectorAll('tr:not(.t1st)'))
        .sort(comparer(Array.from(td.parentNode.children).indexOf(td), this.asc = !this.asc))
        .forEach(tr => tbody.appendChild(tr) );   
})));

  



