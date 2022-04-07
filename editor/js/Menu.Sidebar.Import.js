import { UIDiv, UIInput } from "./libs/ui.js";

export default function MenuSidebarImport(editor) {
	var files;
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
	importInput.style.display = "none";

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

	importContainer.dom.addEventListener("drop", function (event) {
		event.preventDefault();
		text.setTextContent(
			event.dataTransfer.files.length == 0 ? "Upload" : event.dataTransfer.files[0].name
		);
		files = event.dataTransfer.files;
		importButton.addClass("active");
		importButton.dom.style.pointerEvents = "auto";
	})

	importContainer.dom.addEventListener("dragover", function (event) {
		event.preventDefault();
		importContainer.addClass("active");
		image.classList.add("active");
		event.dataTransfer.dropEffect = 'copy';

	})
	importContainer.dom.addEventListener("dragenter", function (event) {
		importContainer.addClass("active");
		image.classList.add("active");
	})


	importContainer.dom.append(importInput, image, text.dom);

	var importButton = new UIDiv();
	importButton.addClass("button");
	importButton.setTextContent("Import");
	importButton.onClick(function () {
		editor.loader.loadFiles(files);
		text.setTextContent("Upload");
		importContainer.removeClass("active");
		importButton.removeClass("active");
		image.classList.remove("active");
		importButton.dom.style.pointerEvents = "none";
	});
	importButton.dom.style.pointerEvents = "none";
	importInput.addEventListener("change", function (event) {
		text.setTextContent(
			importInput.files.length == 0 ? "Upload" : importInput.files[0].name
		);
		files = importInput.files;
		importButton.addClass("active");
		importContainer.addClass("active");
		image.classList.add("active");
		importButton.dom.style.pointerEvents = "auto";
	});

	container.add(importHeader, importContainer, importButton);
	return container;
}
