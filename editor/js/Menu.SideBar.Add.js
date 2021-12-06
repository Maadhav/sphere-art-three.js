import { UIDiv } from "./libs/ui.js";
import MenuSidebarButton from "./Menu.Sidebar.Button.js";
import * as THREE from "../../build/three.module.js";
import { AddObjectCommand } from "./commands/AddObjectCommand.js";

export default function MenuSidebarAdd(editor) {
	var container = new UIDiv();
	container.setClass("menu-sidebar-add");

	// Group
	var grid = new UIDiv();
	grid.setClass("grid");
	var group = MenuSidebarButton("Group", "group", () => {
		var mesh = new THREE.Group();
		mesh.name = "Group";

		editor.execute(new AddObjectCommand(editor, mesh));
	});
	grid.add(group);

	// Object 3D
	var objectsHeader = new UIDiv();
	objectsHeader.setClass("header");
	objectsHeader.setTextContent("Objects");
	var objects = new UIDiv();
	objects.setClass("grid");
	var sphere = MenuSidebarButton("Sphere", "sphere", () => {
		var geometry = new THREE.SphereGeometry(
			1,
			32,
			16,
			0,
			Math.PI * 2,
			0,
			Math.PI
		);
		var mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
		mesh.name = "Sphere";

		editor.execute(new AddObjectCommand(editor, mesh));
	});
	objects.add(sphere);

	var lightsHeader = new UIDiv();
	lightsHeader.setClass("header");
	lightsHeader.setTextContent("Lights");
	var lights = new UIDiv();
	lights.setClass("grid");
	var ambient_light = MenuSidebarButton(
		"Ambient Light",
		"ambient_light",
		() => {
			var color = 0x222222;

			var light = new THREE.AmbientLight(color);
			light.name = "AmbientLight";

			editor.execute(new AddObjectCommand(editor, light));
		}
	);
	var directional_light = MenuSidebarButton(
		"Directional Light",
		"directional_light",
		() => {
			var color = 0xffffff;
			var intensity = 1;

			var light = new THREE.DirectionalLight(color, intensity);
			light.name = "DirectionalLight";
			light.target.name = "DirectionalLight Target";

			light.position.set(5, 10, 7.5);

			editor.execute(new AddObjectCommand(editor, light));
		}
	);
	var hemisphere_light = MenuSidebarButton(
		"Hemisphere Light",
		"hemisphere_light",
		() => {
			var skyColor = 0x00aaff;
			var groundColor = 0xffaa00;
			var intensity = 1;

			var light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
			light.name = "HemisphereLight";

			light.position.set(0, 10, 0);

			editor.execute(new AddObjectCommand(editor, light));
		}
	);
	var point_light = MenuSidebarButton("Point Light", "point_light", () => {
		var color = 0xffffff;
		var intensity = 1;
		var distance = 0;

		var light = new THREE.PointLight(color, intensity, distance);
		light.name = "PointLight";

		editor.execute(new AddObjectCommand(editor, light));
	});
	var spot_light = MenuSidebarButton("Spot Light", "spot_light", () => {
		var color = 0xffffff;
		var intensity = 1;
		var distance = 0;
		var angle = Math.PI * 0.1;
		var penumbra = 0;

		var light = new THREE.SpotLight(
			color,
			intensity,
			distance,
			angle,
			penumbra
		);
		light.name = "SpotLight";
		light.target.name = "SpotLight Target";

		light.position.set(5, 10, 7.5);

		editor.execute(new AddObjectCommand(editor, light));
	});
	lights.add(
		ambient_light,
		directional_light,
		hemisphere_light,
		point_light,
		spot_light
	);

	var cameraHeader = new UIDiv();
	cameraHeader.setClass("header");
	cameraHeader.setTextContent("Camera");
	var cameras = new UIDiv();
	cameras.setClass("grid");
	var camera_perspective = MenuSidebarButton(
		"Perspective Camera",
		"camera_2",
		() => {
			var camera = new THREE.PerspectiveCamera();
			camera.name = "PerspectiveCamera";

			editor.execute(new AddObjectCommand(editor, camera));
		}
	);
	var camera_orthographic = MenuSidebarButton(
		"Orthographic Camera",
		"camera_1",
		() => {
			var aspect = editor.camera.aspect;
			var camera = new THREE.OrthographicCamera(-aspect, aspect);
			camera.name = "OrthographicCamera";

			editor.execute(new AddObjectCommand(editor, camera));
		}
	);
	cameras.add(camera_orthographic, camera_perspective);

	container.add(
		grid,
		objectsHeader,
		objects,
		lightsHeader,
		lights,
		cameraHeader,
		cameras
	);

	return container;
}
