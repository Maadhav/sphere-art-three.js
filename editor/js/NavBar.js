import { UIDiv } from "./libs/ui.js";

function NavBar(editor) {
    var container = new UIDiv()
    container.setId("navbar")
    var leading = new UIDiv()
    leading.setId("leading")
    var logo = new UIDiv()
    logo.setId("logo")
    leading.add(logo)
    var input = document.createElement("input")
    input.setAttribute("type", "text")
    leading.dom.appendChild(input)
    var editOptions = new UIDiv()
    editOptions.setId("editOptions")
    var actions = new UIDiv()
    actions.setId("actions")
    container.add(leading, editOptions, actions)
    return container;
}

export { NavBar }