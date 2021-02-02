window.addEventListener('resize', resizeTabs, true);

// If there are at least 4 tabs, Loop through every set of tabcontent-navigation buttons in the page and resize buttons based on number of buttons
function resizeTabs() {
  
  var tablinkNavs = document.getElementsByClassName("tablink-navigation");
  
   if(tablinkNavs.length >= 4) {
     for (i = 0; i < tablinkNavs.length; i++) {     
       var buttons = $(".tablink-center > .tablink"); 
       buttons.width((100 / buttons.length) - 10 + '%');
      }
    }   
 }

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
    tablinks[i].style.boxShadow = "0px 1px 0px 0px #c3c3c3";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = "white";
  elmnt.style.boxShadow = "0px 1px 0px 0px white";
}

function openDefaultTabs() {
  
  // Opens all tabs with class="defaultopen" on page load
  var tabDefaults = document.getElementsByClassName("defaultopen");
  for (i = 0; i < tabDefaults.length; i++) {
    tabDefaults[i].click();
  }
}
