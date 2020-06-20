let head = document.getElementsByTagName("head");
let metas = head[0].getElementsByTagName("meta");

function parseHTML(metas) {
    for (meta of metas) {
        if (meta.getAttribute("content") == "article") {
            return true;
        }
    }
    return false;
}


console.log(parseHTML(metas));
