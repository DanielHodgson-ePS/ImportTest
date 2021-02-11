$(document).ready(function() {

    insertPageDividers();

});

const majorDivider = `
<div class="horizontal-rule-align-left">
    <hr class="hrule" />
</div>
`;

const minorDivider = `
<div class="horizontal-rule-align-left">
    <hr class="hrule-inner" />
</div>
`;

function insertPageDividers() {

    var xpathDividerMinor = "//p[contains(text(),'[divider-minor]')]" || "//span[contains(text(),'[divider-minor]')]";
    var matchingMinorDivider = document.evaluate(xpathDividerMinor, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    var xpathDividerMajor = "//p[contains(text(),'[divider-major]')]" || "//span[contains(text(),'[divider-major]')]";;
    var matchingMajorDivider = document.evaluate(xpathDividerMajor, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    matchingMinorDivider.innerHTML = minorDivider;
    matchingMinorDivider.style.display = "block";
    
    matchingMajorDivider.innerHTML = majorDivider;
    matchingMajorDivider.style.display = "block";
}