import * as THREE from "../../build/three.module.js";

import { zipSync, strToU8, convertDataURIToBinary } from "../../examples/jsm/libs/fflate.module.js";

import { UIPanel, UIRow, UIHorizontalRule } from "./libs/ui.js";
import { APP } from "./libs/app.js";
function MenubarFile(editor) {
	var config = editor.config;
	var strings = editor.strings;

	var container = new UIPanel();
	container.setClass("menu");

	var title = new UIPanel();
	title.setClass("title");
	title.setTextContent(strings.getKey("menubar/file"));
	container.add(title);

	var options = new UIPanel();
	options.setClass("options");
	container.add(options);

	// New

	var option = new UIRow();
	option.setClass("option");
	option.setTextContent(strings.getKey("menubar/file/new"));
	option.onClick(function () {
		if (confirm("Any unsaved data will be lost. Are you sure?")) {
			editor.clear();
		}
	});
	options.add(option);

	//

	options.add(new UIHorizontalRule());

	// Import

	var form = document.createElement("form");
	form.style.display = "none";
	document.body.appendChild(form);

	var fileInput = document.createElement("input");
	fileInput.multiple = true;
	fileInput.type = "file";
	fileInput.addEventListener("change", function () {
		editor.loader.loadFiles(fileInput.files);
		form.reset();
	});
	form.appendChild(fileInput);

	var option = new UIRow();
	option.setClass("option");
	option.setTextContent(strings.getKey("menubar/file/import"));
	option.onClick(function () {
		fileInput.click();
	});
	options.add(option);

	//

	options.add(new UIHorizontalRule());

	// Publish

	var option = new UIRow();
	option.setClass("option");
	option.setTextContent(strings.getKey("menubar/file/publish"));
	option.onClick(async function () {
		async function sleep (){
			return new Promise(resolve => setTimeout(resolve, 7000));
		}
		var signals = editor.signals;
		await signals.record.dispatch();
		await sleep()
		var toZip = {};

		//

		var output = editor.toJSON();
		output.metadata.type = "App";
		delete output.history;

		output = JSON.stringify(output, null, "\t");
		output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1");

		toZip["app.json"] = strToU8(output);
		toZip["thumbnail.png"] = convertDataURIToBinary(editor.thumbnail)
		var uintVideo = new Uint8Array(editor.preview);
		toZip["preview.webm"] = uintVideo

		//
		
		var title = config.getKey("project/title");

		var manager = new THREE.LoadingManager(function () {
			var zipped = zipSync(toZip, { level: 9 });

			var blob = new Blob([zipped.buffer], { type: "application/zip" });

			save(blob, (title !== "" ? title : "untitled") + ".zip");
		});

		var loader = new THREE.FileLoader(manager);
		loader.load("js/libs/app/index.html", function (content) {});
	});
	options.add(option);

	//

	var link = document.createElement("a");
	function save(blob, filename) {
		if (link.href) {
			URL.revokeObjectURL(link.href);
		}

		link.href = URL.createObjectURL(blob);
		link.download = filename || "data.json";
		link.dispatchEvent(new MouseEvent("click"));
	}

	function saveArrayBuffer(buffer, filename) {
		save(new Blob([buffer], { type: "application/octet-stream" }), filename);
	}

	function saveString(text, filename) {
		save(new Blob([text], { type: "text/plain" }), filename);
	}

	function getAnimations(scene) {
		var animations = [];

		scene.traverse(function (object) {
			animations.push(...object.animations);
		});

		return animations;
	}

	return container;
}

export { MenubarFile };
