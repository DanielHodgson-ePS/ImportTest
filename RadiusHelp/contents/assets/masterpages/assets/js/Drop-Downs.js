
// Need to restructure the html a little as Robohelp unnecessarily wraps elements in <p> tags
// Also add a wrapper for each dropdown 
function formatHTML() {


    console.log("Formatting html");

    $('.dropspot').unwrap();

    $('.dropspot').each(function () {
        $(this).next('.droptext').addBack().wrapAll('<div class="drop-down-wrapper"/></div');
    });

    $('.drop-down-wrapper').each(function () {
        var icon = document.createElement('img');
        icon.src = getImagePathRecursively("", "chevron-down.svg", 0);
        icon.className = "drop-down-icon";
        icon.setAttribute("clicked", "false");
        this.prepend(icon);
    });
}


function changeIconOnClick() {

    $(document).on('click', '.dropspot', function () {

        var wrapper = this.closest(".drop-down-wrapper");
        var icon = wrapper.querySelector('img');

        if (icon.getAttribute("clicked") == "false") {
            icon.src = getImagePathRecursively("", "chevron-up.svg", 0);
            icon.setAttribute("clicked", "true");
            console.log(icon);

        } else {
            icon.src = getImagePathRecursively("", "chevron-down.svg", 0);
            icon.setAttribute("clicked", "false");
            console.log(icon);
        }
        return false;
    });

}



function initFunctions() {

    var functions = [];
    functions.push(formatHTML);
    functions.push(changeIconOnClick);
    return functions;
}


initFunctions().forEach(f => {
    window.addEventListener ?
        window.addEventListener("load", f, false) :
        window.attachEvent && window.attachEvent("onload", f);
})



// In a generated robohelp project, switching between topics partially updates the DOM
// Therefore no window.onLoad event is generated
// Instead, watch for changes to the html

    var target = document.querySelector('head');
    var observer = new MutationObserver(function (mutations) {

        console.log("mutation observed"); 
        formatHTML();
        changeIconOnClick();
    });

    var config = {
        subtree: true,
        childList: true
    };

    //observer.observe(target, config);

