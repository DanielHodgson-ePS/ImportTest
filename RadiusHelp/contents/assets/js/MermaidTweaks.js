

var modal;

window.addEventListener('load', (event) => {
   // Get the modal
    modal = document.getElementById("myModal");
    
   // Get the <span> element that closes the modal
   var span = document.getElementsByClassName("close")[0];
   
   // When the user clicks on <span> (x), close the modal
   span.onclick = function() {
     modal.style.display = "none";
   }
   
   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function(event) {
     if (event.target == modal) {
       modal.style.display = "none";
     }
   }
});
  
  

var callback = function(htmPath){
 
  modal.style.display = "block";
  document.getElementById("myContent").innerHTML='<object type="text/html" class="inserted-content" data="' + htmPath + '" ></object>';
}

var config = {
  startOnLoad:true,
  flowchart:{
      useMaxWidth:true,
      htmlLabels:true,
      curve:'cardinal',
  },
  securityLevel:'loose',
};

mermaid.initialize(config);