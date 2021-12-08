import { UIDiv } from "./libs/ui.js";
import * as THREE from '../../build/three.module.js';

export default function MenuSidebarExamples(editor) {
    var container = new UIDiv();
    container.setId("menu-sidebar-examples");


    var header = new UIDiv();
    header.addClass("header");
    header.setTextContent("Examples");
    container.add(header);

    var loader = new THREE.FileLoader();

    var items = [
        { title: 'Moon', file: 'moon.app.json', image: 'moon.png' },
    ];
    for (const item in items) {
        var example_card = new UIDiv();
        example_card.addClass("example-card");
        var example_card_image = document.createElement("img");
        example_card_image.classList.add("example-card-image");
        example_card_image.src = "./examples/" + items[item].image;
        console.log(item);
        var example_card_overlay = new UIDiv();
        example_card_overlay.addClass("example-card-overlay");
        var title = new UIDiv();
        title.addClass("example-card-title");
        title.setTextContent(items[item].title);
        var actions = new UIDiv();
        actions.addClass("example-card-action");
        var button = new UIDiv();
        button.addClass("example-card-button");
        actions.add(button);
        button.setTextContent("Try");
        button.onClick(function () {
            if (confirm('Any unsaved data will be lost. Are you sure?')) {

                loader.load('examples/' + items[item].file, function (text) {

                    editor.clear();
                    editor.fromJSON(JSON.parse(text));

                });

            }
        })
        example_card_overlay.add(title, actions)
        example_card.dom.append(example_card_image, example_card_overlay.dom);
        container.add(example_card);
    }
    return container;
}