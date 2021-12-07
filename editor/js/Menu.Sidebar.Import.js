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
	importInput.id = "import-input";
	// importInput.style.display = "none";

	var image = document.createElement("img");
	image.src = "./images/import.svg";
	image.classList.add("icon");

	var text = new UIDiv();
	text.setTextContent("Upload");
	text.setId("import-text");
	text.addClass("text");
	importContainer.onClick(function () {
		importInput.click();
	});

	importInput.addEventListener("change", function (event) {
		var element = document.getElementById("import-input");
		element.replaceWith(event.target)
		var element = document.getElementById('import-text')
		element.innerHTML = "Importing..."
	})

	importContainer.dom.append(importInput, image, text.dom);

	var importButton = new UIDiv();
	importButton.addClass("button");
	importButton.setTextContent("Import");
	container.add(importHeader, importContainer, importButton);
	return container;
}
