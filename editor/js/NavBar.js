import { UIDiv, UIInput, UIDialog } from "./libs/ui.js";
import {
	zipSync,
	strToU8,
	convertDataURIToBinary,
} from "../../examples/jsm/libs/fflate.module.js";
import { AddObjectCommand } from "./commands/AddObjectCommand.js";
import { RemoveObjectCommand } from "./commands/RemoveObjectCommand.js";
import { SetPositionCommand } from "./commands/SetPositionCommand.js";

function NavBar(editor) {
	/// <navbar>
	var container = new UIDiv();
	container.setId("navbar");

	/// <navbar-left>
	var leading = new UIDiv();
	leading.setId("navbar-left");
	var logo = new UIDiv();
	logo.setId("logo");
	leading.add(logo);
	var title = new UIInput(editor.config.getKey("project/title"));
	title.onInput(function () {
		editor.config.setKey("project/title", title.getValue());
	});
	title.setValue(editor.config.getKey("project/title"));
	leading.add(title);

	/// <navbar-center>
	var editOptions = new UIDiv();
	editOptions.setId("navbar-center");

	// New
	var addIcon = document.createElement("img");
	addIcon.src = "images/document_new.svg";
	addIcon.onclick = function () {
		if (confirm("Any unsaved data will be lost. Are you sure?")) {
			editor.clear();
		}
	};

	var divider = new UIDiv();
	divider.addClass("divider");
	editOptions.dom.append(addIcon);
	editOptions.add(divider);

	// Undo
	var undoIcon = document.createElement("img");
	undoIcon.src = "images/undo.svg";
	undoIcon.onclick = function () {
		editor.undo();
	};

	// Redo
	var redoIcon = document.createElement("img");
	redoIcon.src = "images/redo.svg";
	redoIcon.onclick = function () {
		editor.redo();
	};
	editOptions.dom.append(undoIcon, redoIcon);

	var divider = new UIDiv();
	divider.addClass("divider");
	editOptions.add(divider);

	// Zoom out
	var minusIcon = document.createElement("img");
	minusIcon.setAttribute("id", "zoom-out");
	minusIcon.src = "images/minus.svg";

	var plusIcon = document.createElement("img");
	plusIcon.src = "images/plus.svg";
	plusIcon.setAttribute("id", "zoom-in");
	editOptions.dom.append(minusIcon);
	var viewport = new UIDiv();
	var zoom = 100;
	viewport.setId("viewport-size");
	viewport.setTextContent("100%");
	minusIcon.onclick = function () {
		if (zoom > 0) {
			zoom -= 1;
			viewport.setTextContent(zoom + "%");
		}
	};
	plusIcon.onclick = function () {
		if (zoom < 500) {
			zoom += 1;
			viewport.setTextContent(zoom + "%");
		}
	};
	editOptions.add(viewport);
	editOptions.dom.append(plusIcon);
	var divider = new UIDiv();
	divider.addClass("divider");
	editOptions.add(divider);

	var cloneIcon = document.createElement("img");
	cloneIcon.src = "images/clone.svg";
	cloneIcon.onclick = function () {
		var object = editor.selected;

		if (object === null || object.parent === null) return;

		object = object.clone();

		editor.execute(new AddObjectCommand(editor, object));
	};

	var trashIcon = document.createElement("img");
	trashIcon.src = "images/trash.svg";
	trashIcon.onclick = function () {
		var object = editor.selected;

		if (object !== null && object.parent !== null) {
			editor.execute(new RemoveObjectCommand(editor, object));
		}
	};

	var colorFixIcon = document.createElement("img");
	colorFixIcon.src = "images/color_fix.svg";
	colorFixIcon.onclick = function () {
		editor.scene.traverse(fixColorMap);
	};

	var focusIcon = document.createElement("img");
	focusIcon.src = "images/focus.svg";
	focusIcon.onclick = function () {
		var object = editor.selected;

		if (object === null || object.parent === null) return; // avoid centering the camera or scene

		const aabb = new Box3().setFromObject(object);
		const center = aabb.getCenter(new Vector3());
		const newPosition = new Vector3();

		newPosition.x = object.position.x + (object.position.x - center.x);
		newPosition.y = object.position.y + (object.position.y - center.y);
		newPosition.z = object.position.z + (object.position.z - center.z);

		editor.execute(new SetPositionCommand(editor, object, newPosition));
	};

	editOptions.dom.append(cloneIcon, trashIcon, colorFixIcon, focusIcon);

	var divider = new UIDiv();
	divider.addClass("divider");
	editOptions.add(divider);

	var printIcon = document.createElement("img");
	printIcon.src = "images/printer.svg";
	printIcon.onclick = function () {
		window.print();
	};
	editOptions.dom.append(printIcon);

	/// <navbar-right>
	var actions = new UIDiv();
	actions.setId("navbar-right");

	var saveButton = new UIDiv();
	saveButton.setId("save-button");
	var saveIcon = document.createElement("img");
	saveIcon.src = "images/save.svg";
	saveButton.dom.append(saveIcon);
	var saveText = new UIDiv();
	saveText.setId("save-text");
	saveText.setTextContent("Save");
	saveButton.add(saveText);

	var downloadButton = new UIDiv();
	downloadButton.setId("download-button");
	var downloadIcon = document.createElement("img");
	downloadIcon.src = "images/download.svg";
	downloadButton.dom.append(downloadIcon);
	var downloadText = new UIDiv();
	downloadText.setId("download-text");
	downloadText.setTextContent("Download");
	downloadButton.dom.onclick = async function () {
		async function sleep() {
			return new Promise((resolve) => setTimeout(resolve, 1400));
		}
		new UIDialog("Preparing ...");
		var signals = editor.signals;
		await signals.record.dispatch();
		await sleep();
		new UIDialog("Generating thumbnail.png...");
		await sleep();
		new UIDialog("Generating preview.webm...");
		await sleep();
		new UIDialog("Generating app.json...");
		await sleep();
		new UIDialog("Compressing files...");
		await sleep();
		new UIDialog("Downloading...").remove();
		await sleep();
		var toZip = {};
		var link = document.createElement("a");
		function save(blob, filename) {
			if (link.href) {
				URL.revokeObjectURL(link.href);
			}

			link.href = URL.createObjectURL(blob);
			link.download = filename || "data.json";
			link.dispatchEvent(new MouseEvent("click"));
		}

		//

		var output = editor.toJSON();
		output.metadata.type = "App";
		delete output.history;

		output = JSON.stringify(output, null, "\t");
		output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1");

		toZip["app.json"] = strToU8(output);
		toZip["thumbnail.png"] = convertDataURIToBinary(editor.thumbnail);
		var uintVideo = new Uint8Array(editor.preview);
		toZip["preview.webm"] = uintVideo;

		//

		var title = editor.config.getKey("project/title");

		var manager = new THREE.LoadingManager(function () {
			var zipped = zipSync(toZip, { level: 9 });

			var blob = new Blob([zipped.buffer], { type: "application/zip" });

			save(blob, (title !== "" ? title : "untitled") + ".sphere");
		});

		var loader = new THREE.FileLoader(manager);
		loader.load("js/libs/app/index.html", function (content) {});
	};

	downloadButton.add(downloadText);
	actions.add(saveButton, downloadButton);

	container.add(leading, editOptions, actions);

	var colorMaps = ["map", "envMap", "emissiveMap"];

	function fixColorMap(obj) {
		var material = obj.material;

		if (material !== undefined) {
			if (Array.isArray(material) === true) {
				for (var i = 0; i < material.length; i++) {
					fixMaterial(material[i]);
				}
			} else {
				fixMaterial(material);
			}

			editor.signals.sceneGraphChanged.dispatch();
		}
	}

	function fixMaterial(material) {
		var needsUpdate = material.needsUpdate;

		for (var i = 0; i < colorMaps.length; i++) {
			var map = material[colorMaps[i]];

			if (map) {
				map.encoding = THREE.sRGBEncoding;
				needsUpdate = true;
			}
		}

		material.needsUpdate = needsUpdate;
	}
	return container;
}

export { NavBar };
