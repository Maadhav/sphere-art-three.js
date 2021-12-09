import { UIDiv } from "./libs/ui.js";
import MenuSidebarButton from "./Menu.Sidebar.Button.js";
import * as THREE from "../../build/three.module.js";
import { AddObjectCommand } from "./commands/AddObjectCommand.js";

export default function MenuSidebarExport(editor) {
	var container = new UIDiv();
	container.setId("menu-sidebar-export");

	// Files
	var fileHeader = new UIDiv();
	fileHeader.setClass("header");
	fileHeader.setTextContent("Files");
	var files = new UIDiv();
	files.setClass("grid");
	var geometry = MenuSidebarButton("Geometry", "geometry", () => {
		var object = editor.selected;

		if (object === null) {
			alert("No object selected.");
			return;
		}

		var geometry = object.geometry;

		if (geometry === undefined) {
			alert("The selected object doesn't have geometry.");
			return;
		}

		var output = geometry.toJSON();

		try {
			output = JSON.stringify(output, null, "\t");
			output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1");
		} catch (e) {
			output = JSON.stringify(output);
		}

		saveString(output, "geometry.json");
	});
	var object = MenuSidebarButton("Object", "object", () => {
		var object = editor.selected;

		if (object === null) {
			alert("No object selected");
			return;
		}

		var output = object.toJSON();

		try {
			output = JSON.stringify(output, null, "\t");
			output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1");
		} catch (e) {
			output = JSON.stringify(output);
		}

		saveString(output, "model.json");
	});
	var scene = MenuSidebarButton("Scene", "scene", () => {
		var output = editor.scene.toJSON();

		try {
			output = JSON.stringify(output, null, "\t");
			output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1");
		} catch (e) {
			output = JSON.stringify(output);
		}

		saveString(output, "scene.json");
	});
	files.add(geometry, object, scene);

	// Object 3D
	var fileFormatHeader = new UIDiv();
	fileFormatHeader.setClass("header");
	fileFormatHeader.setTextContent("File Formats");
	var fileFormat = new UIDiv();
	fileFormat.setClass("grid");
	var dae = MenuSidebarButton(".DAE", undefined, async () => {
		var { ColladaExporter } = await import(
			"../../examples/jsm/exporters/ColladaExporter.js"
		);

		var exporter = new ColladaExporter();

		exporter.parse(editor.scene, function (result) {
			saveString(result.data, "scene.dae");
		});
	});
	var drc = MenuSidebarButton(".DRC", undefined, async () => {
		var object = editor.selected;

		if (object === null || object.isMesh === undefined) {
			alert("No mesh selected");
			return;
		}

		var { DRACOExporter } = await import(
			"../../examples/jsm/exporters/DRACOExporter.js"
		);

		var exporter = new DRACOExporter();

		const options = {
			decodeSpeed: 5,
			encodeSpeed: 5,
			encoderMethod: DRACOExporter.MESH_EDGEBREAKER_ENCODING,
			quantization: [16, 8, 8, 8, 8],
			exportUvs: true,
			exportNormals: true,
			exportColor: object.geometry.hasAttribute("color"),
		};

		var result = exporter.parse(object, options);
		saveArrayBuffer(result, "model.drc");
	});
	var gle = MenuSidebarButton(".GLB", undefined, async () => {
		var scene = editor.scene;
		var animations = getAnimations(scene);

		var { GLTFExporter } = await import(
			"../../examples/jsm/exporters/GLTFExporter.js"
		);

		var exporter = new GLTFExporter();

		exporter.parse(
			scene,
			function (result) {
				saveArrayBuffer(result, "scene.glb");
			},
			{ binary: true, animations: animations }
		);
	});
	var gltf = MenuSidebarButton(".GLTF", undefined, async () => {
		var scene = editor.scene;
		var animations = getAnimations(scene);

		var { GLTFExporter } = await import(
			"../../examples/jsm/exporters/GLTFExporter.js"
		);

		var exporter = new GLTFExporter();

		exporter.parse(
			scene,
			function (result) {
				saveString(JSON.stringify(result, null, 2), "scene.gltf");
			},
			{ animations: animations }
		);
	});
	var obj = MenuSidebarButton(".OBJ", undefined, async () => {
		var object = editor.selected;

		if (object === null) {
			alert("No object selected.");
			return;
		}

		var { OBJExporter } = await import(
			"../../examples/jsm/exporters/OBJExporter.js"
		);

		var exporter = new OBJExporter();

		saveString(exporter.parse(object), "model.obj");
	});
	var ply = MenuSidebarButton(".PLY", undefined, async () => {
		var { PLYExporter } = await import(
			"../../examples/jsm/exporters/PLYExporter.js"
		);

		var exporter = new PLYExporter();

		exporter.parse(editor.scene, function (result) {
			saveArrayBuffer(result, "model.ply");
		});
	});
	var ply_binary = MenuSidebarButton(".PLY (Binary)", undefined, async () => {
		var { PLYExporter } = await import(
			"../../examples/jsm/exporters/PLYExporter.js"
		);

		var exporter = new PLYExporter();

		exporter.parse(
			editor.scene,
			function (result) {
				saveArrayBuffer(result, "model-binary.ply");
			},
			{ binary: true }
		);
	});
	var slt = MenuSidebarButton(".STL", undefined, async () => {
		var { STLExporter } = await import(
			"../../examples/jsm/exporters/STLExporter.js"
		);

		var exporter = new STLExporter();

		saveString(exporter.parse(editor.scene), "model.stl");
	});
	var slt_binary = MenuSidebarButton(".STL (Binary)", undefined, async () => {
		var { STLExporter } = await import(
			"../../examples/jsm/exporters/STLExporter.js"
		);

		var exporter = new STLExporter();

		saveArrayBuffer(
			exporter.parse(editor.scene, { binary: true }),
			"model-binary.stl"
		);
	});
	var usdz = MenuSidebarButton(".USDZ", undefined, async () => {
		var { USDZExporter } = await import(
			"../../examples/jsm/exporters/USDZExporter.js"
		);

		var exporter = new USDZExporter();

		saveArrayBuffer(
			await exporter.parse(editor.scene, { binary: true }),
			"model.usdz"
		);
	});
	fileFormat.add(
		dae,
		drc,
		gle,
		gltf,
		obj,
		ply,
		ply_binary,
		slt,
		slt_binary,
		usdz
	);

	container.add(fileHeader, files, fileFormatHeader, fileFormat);

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
