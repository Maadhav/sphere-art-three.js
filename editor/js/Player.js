import { UIPanel } from "./libs/ui.js";
import { APP } from "./libs/app.js";

function Player(editor) {
	var recorder = new CanvasRecorder();
	var signals = editor.signals;
	var container = new UIPanel();
	container.setId("player");
	container.setPosition("absolute");
	container.setDisplay("none");
	//

	var player = new APP.Player();
	container.dom.appendChild(player.dom);

	window.addEventListener("resize", function () {
		player.setSize(
			Math.min(container.dom.clientHeight, container.dom.clientWidth),
			Math.min(container.dom.clientHeight, container.dom.clientWidth)
		);
	});

	signals.startPlayer.add(function () {
		container.setDisplay("");

		player.load(editor.toJSON());
		player.setSize(
			Math.min(container.dom.clientHeight, container.dom.clientWidth),
			Math.min(container.dom.clientHeight, container.dom.clientWidth)
		);
		player.play();
	});

	signals.record.add(async function () {
		container.setDisplay("");

		player.load(editor.toJSON());
		player.setSize(
			Math.min(container.dom.clientHeight, container.dom.clientWidth),
			Math.min(container.dom.clientHeight, container.dom.clientWidth)
		);
		player.play();
		var video = document.createElement("video");
		await recorder.initialize(player.rendererElement, video);
		await recorder.start();
		setTimeout(async ()  => {
			editor.thumbnail = player.rendererElement.toDataURL();
			recorder.stop();
			editor.preview = await (recorder.toBlob()).arrayBuffer();
			container.setDisplay("none");
			console.log(editor)
			player.stop();
			player.dispose();
		}, 6000);
	});

	signals.stopPlayer.add(function () {
		container.setDisplay("none");

		player.stop();
		player.dispose();
	});

	return container;
}

export { Player };
