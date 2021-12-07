import { UIDiv, UIInput } from "./libs/ui.js";

export default function MenuSidebarImport(editor) {
    var container = new UIDiv();
    container.setId("menu-sidebar-import");


    var importHeader = new UIDiv();
    importHeader.addClass("header");
    importHeader.setTextContent("Import");


    var importContainer = new UIDiv();
    importContainer.addClass("container");
    var importInput = document.createElement("input");
    importInput.type = "file";
    importInput.style.display = "none";


    var image = document.createElement("img");
    image.src = "./images/import.svg";
    image.classList.add("icon");

    var text = new UIDiv()
    text.setTextContent("Upload");
    text.addClass("text");
    image.addEventListener('click', function () {
        console.log("click");
        importInput.click();
    })

    importContainer.dom.append(importInput, image, text.dom);


    var importButton = new UIDiv();
    importButton.addClass("button");
    importButton.setTextContent("Import");
    container.add(importHeader, importContainer, importButton);
    return container;
}