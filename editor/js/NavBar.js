import { UIDiv, UIInput } from "./libs/ui.js";

function NavBar(editor) {

    /// <navbar>
    var container = new UIDiv()
    container.setId("navbar")

    /// <navbar-left>
    var leading = new UIDiv()
    leading.setId("navbar-left")
    var logo = new UIDiv()
    logo.setId("logo")
    leading.add(logo)
    var title = new UIInput(editor.config.getKey('project/title')).onInput(function () {

        editor.config.setKey('project/title', this.getValue());

    });
    leading.add(title)


    /// <navbar-center>
    var editOptions = new UIDiv()
    editOptions.setId("navbar-center")

    var addIcon = document.createElement('img');
    addIcon.src = 'images/document_new.svg';
    var divider = new UIDiv()
    divider.addClass("divider")
    editOptions.dom.append(addIcon);
    editOptions.add(divider)

    var undoIcon = document.createElement('img');
    undoIcon.src = 'images/undo.svg';
    var redoIcon = document.createElement('img');
    redoIcon.src = 'images/redo.svg';
    editOptions.dom.append(undoIcon, redoIcon);
    var divider = new UIDiv()
    divider.addClass("divider")
    editOptions.add(divider)

    var minusIcon = document.createElement('img');
    minusIcon.src = 'images/minus.svg';
    var plusIcon = document.createElement('img');
    plusIcon.src = 'images/plus.svg';
    editOptions.dom.append(minusIcon);
    var viewport = new UIDiv()
    viewport.setId("viewport-size")
    viewport.setTextContent("100%")
    editOptions.add(viewport)
    editOptions.dom.append(plusIcon);
    var divider = new UIDiv()
    divider.addClass("divider")
    editOptions.add(divider)

    var cloneIcon = document.createElement('img');
    cloneIcon.src = 'images/clone.svg';
    var trashIcon = document.createElement('img');
    trashIcon.src = 'images/trash.svg';
    var colorFixIcon = document.createElement('img');
    colorFixIcon.src = 'images/color_fix.svg';
    var focusIcon = document.createElement('img');
    focusIcon.src = 'images/focus.svg';
    editOptions.dom.append(cloneIcon, trashIcon, colorFixIcon, focusIcon);
    var divider = new UIDiv()
    divider.addClass("divider")
    editOptions.add(divider)

    var printIcon = document.createElement('img');
    printIcon.src = 'images/printer.svg';
    editOptions.dom.append(printIcon);



    /// <navbar-right>
    var actions = new UIDiv()
    actions.setId("navbar-right")

    var saveButton = new UIDiv()
    saveButton.setId("save-button")
    var saveIcon = document.createElement('img');
    saveIcon.src = 'images/save.svg';
    saveButton.dom.append(saveIcon);
    var saveText = new UIDiv()
    saveText.setId("save-text")
    saveText.setTextContent("Save")
    saveButton.add(saveText)

    var downloadButton = new UIDiv()
    downloadButton.setId("download-button")
    var downloadIcon = document.createElement('img');
    downloadIcon.src = 'images/download.svg';
    downloadButton.dom.append(downloadIcon);
    var downloadText = new UIDiv()
    downloadText.setId("download-text")
    downloadText.setTextContent("Download")
    downloadButton.add(downloadText)
    actions.add(saveButton, downloadButton)


    container.add(leading, editOptions, actions)
    return container;
}

export { NavBar }