function openTab(pageName, elmnt, color) {
  
  var i, tabcontent, tablinks;
  
  // Hide all elements with class="tabcontent" by default
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}

function openDefaultTabs() {
  
  // Opens all tabs with class="defaultopen" on page load
  var tabDefaults = document.getElementsByClassName("defaultopen");
  for (i = 0; i < tabDefaults.length; i++) {
    tabDefaults[i].click();
  }
}


