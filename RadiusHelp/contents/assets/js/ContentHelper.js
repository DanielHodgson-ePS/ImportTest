$(document).ready(function () {

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
    var nodesSnapshotMinorDivider = document.evaluate(xpathDividerMinor, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    var xpathDividerMajor = "//p[contains(text(),'[divider-major]')]" || "//span[contains(text(),'[divider-major]')]";;
    var nodesSnapshotMajorDivider = document.evaluate(xpathDividerMajor, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);




    for (i = 0; i < nodesSnapshotMinorDivider.snapshotLength; i++) {
        nodesSnapshotMinorDivider.snapshotItem(i).innerHTML = minorDivider;
        nodesSnapshotMinorDivider.snapshotItem(i).style.display = "block";
    }

    for (i = 0; i < nodesSnapshotMajorDivider.snapshotLength; i++) {
        nodesSnapshotMajorDivider.snapshotItem(i).innerHTML = majorDivider;
        nodesSnapshotMajorDivider.snapshotItem(i).style.display = "block";
    }
}