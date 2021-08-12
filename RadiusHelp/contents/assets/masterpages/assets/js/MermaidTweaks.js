var modal;

window.addEventListener('load', (event) => {

  modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];

  if (span != null) {
    span.onclick = function () {
      modal.style.display = "none";
    }
  }


  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

});

var config = {
  startOnLoad: true,
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'cardinal',
  },
  securityLevel: 'loose',
};


if (mermaid != null) {
  mermaid.initialize(config);
}


var openTopicPreview = function (htmPath) {
  modal.style.display = "block";
  document.getElementById("myContent").innerHTML = '<object type="text/html" class="inserted-content" data="' + htmPath + '" ></object>';
}



