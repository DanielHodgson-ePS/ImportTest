// In a generated robohelp project, switching between topics does not promt a full page load
// Instead, it just updates the DOM within the <Body>
// Therefore no window.onLoad event is generated
// So, watch for changes to the html head and force a window.onload event

var observer = new MutationObserver(function (mutations) {
    console.log("mutation observed");
    observer.disconnect();
    setTimeout(() => {  dispatchEvent(new Event('load')); }, 200);
});

var target = document.querySelector('head');

function startObserving() {
    var config = {
        subtree: true,
        childList: true,
        characterData: true
    };
    observer.observe(target, config);
}


function initFunctions() {
    var functions = [];
    functions.push(startObserving);
    return functions;
}


initFunctions().forEach(f => {
    window.addEventListener ?
        window.addEventListener("load", f, false) :
        window.attachEvent && window.attachEvent("onload", f);
})
