import { UIDiv } from "./libs/ui.js";


export default function MenuSidebarButton(label, iconname, onClick) {
    var button = new UIDiv()
    button.setClass("menu-sidebar-button")
    button.dom.dataset.label = label;


    var buttonContainer = new UIDiv()
    buttonContainer.setClass("menu-sidebar-button-container")
    if (iconname) {

        var icon = document.createElement("img")
        icon.src = "images/" + iconname + ".svg";
        icon.className = "menu-sidebar-button-icon";
        buttonContainer.dom.appendChild(icon);
    }

    var text = new UIDiv()
    text.setClass("menu-sidebar-button-text")
    text.setTextContent(label)
    buttonContainer.add(text)
    button.add(buttonContainer)
    var hoverElement = new UIDiv()
    hoverElement.addClass("menu-sidebar-button-hover")

    button.add(hoverElement)

    button.dom.addEventListener("click", onClick)
    return button;

}