import { UIDiv, UINumber, UIText } from "./libs/ui.js";
import { UIBoolean, UIOutliner } from "./libs/ui.three.js";
import * as THREE from "../../build/three.module.js";
import { RemoveObjectCommand } from "./commands/RemoveObjectCommand.js";
export default function MenuSidebarSettings(editor) {
    var container = new UIDiv();
    container.setId("menu-sidebar-settings");

    var strings = editor.strings;

    var signals = editor.signals;

    var config = editor.config;

    var history = editor.history;

    var currentRenderer = null;

    var IS_MAC = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

    function isValidKeyBinding(key) {
        return key.match(/^[A-Za-z0-9]$/i); // Can't use z currently due to undo/redo
    }

    var projectContainer = new UIDiv();
    projectContainer.setClass("setting-container");

    var editable = rowField({
        label: "Editable",
        editor: editor,
        type: [
            {
                type: "checkbox",
                id: "editable",
                value: config.getKey("project/editable"),
                onChange: function (value) {
                    config.setKey("project/editable", value);
                },
            },
        ],
    });

    var vr = rowField({
        label: "VR",
        editor: editor,
        type: [
            {
                type: "checkbox",
                id: "vr",
                value: config.getKey("project/vr"),
                onChange: function (value) {
                    config.setKey("project/vr", value);
                },
            },
        ],
    });

    var language = rowField({
        label: "Language",
        editor: editor,
        type: [
            {
                type: "select",
                id: "language",
                options: {
                    en: 'English',
                },
                value: config.getKey("language"),
                onChange: function (value) {
                    config.setKey("language", value);
                },
            },
        ],
    });

    projectContainer.add(editable, vr, language);
    container.add(projectContainer);
    var header = new UIDiv();
    header.addClass("header");
    header.setTextContent("Renderer");
    container.add(header);
    var rendererContainer = new UIDiv();
    rendererContainer.setClass("setting-container");

    var antialias = rowField({
        editor: editor,
        label: "Antialias",

        type: [
            {
                type: "checkbox",
                id: "antialias",
                value: config.getKey("project/renderer/antialias"),
                onChange: createRenderer,
            },
        ],
    });
    var physical_light = rowField({
        editor: editor,
        label: "Physical Light",
        type: [
            {
                type: "checkbox",
                id: "physical_light",
                value: config.getKey("sidebar/project/physicallyCorrectLights"),
                onChange: function (value) {
                    currentRenderer.physicallyCorrectLights = value;
                    signals.rendererUpdated.dispatch();
                },
            },
        ],
    });
    var shadow = rowField({
        editor: editor,
        label: "Shadow",
        type: [
            {
                type: "checkbox",
                id: "shadow",
                value: config.getKey("project/renderer/shadows"),
                onChange: function (value) {
                    currentRenderer.shadowMap.enabled = value;
                    signals.rendererUpdated.dispatch();
                },
            },
            {
                type: "select",
                id: "shadowType",
                value: config.getKey("project/renderer/shadowType"),
                options: {
                    0: 'Basic',
                    1: 'PCF',
                    2: 'PCF Soft',
                    //	3: 'VSM'
                },
                onChange: function (value) {
                    currentRenderer.shadowMap.type =
                        parseFloat(value);
                    signals.rendererUpdated.dispatch();
                },
            },
        ],
    });
    var tone_mapping = rowField({
        editor: editor,
        label: "Tone Mapping",
        type: [
            {
                type: "select",
                id: "tone_mapping",
                options: {
                    0: 'No',
                    1: 'Linear',
                    2: 'Reinhard',
                    3: 'Cineon',
                    4: 'ACESFilmic'
                },
                value: config.getKey("project/renderer/toneMapping"),
                onChange: function (value) {
                    currentRenderer.toneMapping = parseFloat(value);
                    if (value == 0) {
                        console.log('no tone mapping');
                        document.getElementById("tone_mapping_exposure").style.display = "none";
                    }
                    else {
                        document.getElementById("tone_mapping_exposure").style.display = "block";

                    }
                    signals.rendererUpdated.dispatch();
                },
            },
            {
                type: "number",
                id: "tone_mapping_exposure",
                initial: 1,
                value: config.getKey("project/renderer/toneMappingExposure"),
                onChange: function (value) {
                    currentRenderer.toneMappingExposure = value;
                    signals.rendererUpdated.dispatch();
                },
            },
        ],
    });
    rendererContainer.add(antialias, physical_light, shadow, tone_mapping);

    container.add(rendererContainer);

    var header = new UIDiv();
    header.addClass("header");
    header.setTextContent("Viewport");
    container.add(header);
    var settingContainer = new UIDiv();
    settingContainer.setClass("setting-container");

    var helper = rowField({
        editor: editor,
        label: "Helper",
        type: [
            {
                type: "checkbox",
                id: "helper",
                value: true,
                onChange: function (value) {
                    signals.showHelpersChanged.dispatch(value);
                    signals.rendererUpdated.dispatch();
                },
            },
        ],
    });

    var grid = rowField({
        editor: editor,
        label: "Grid",
        type: [
            {
                type: "checkbox",
                id: "grid",
                value: true,
                onChange: function (value) {
                    signals.showGridChanged.dispatch(value);
                },
            },
        ],
    });

    settingContainer.add(helper, grid);
    container.add(settingContainer);

    var header = new UIDiv();
    header.addClass("header");
    header.setTextContent("Shortcuts");
    container.add(header);
    var shortcutsContainer = new UIDiv();
    shortcutsContainer.setClass("setting-container");
    var shortcuts = {
        w: "Translate",
        e: "Rotate",
        r: "Scale",
        z: "Undo",
        f: "Focus",
    };
    var table = document.createElement("table");
    table.className = "shortcuts";

    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.textContent = "Description";
    tr.appendChild(th);
    th = document.createElement("th");
    th.textContent = "Key";
    tr.appendChild(th);
    table.appendChild(tr);
    for (var key in shortcuts) {
        var row = document.createElement("tr");
        var valueCell = document.createElement("td");
        valueCell.textContent = shortcuts[key];
        var keyCell = document.createElement("td");
        keyCell.textContent = key;
        row.appendChild(valueCell);
        row.appendChild(keyCell);
        table.appendChild(row);
    }
    shortcutsContainer.dom.appendChild(table);
    document.addEventListener("keydown", onShortcutsPressed, false);

    function onShortcutsPressed(event) {
        switch (event.key.toLowerCase()) {
            case "backspace":
                event.preventDefault(); // prevent browser back

            // fall-through

            case "delete":
                var object = editor.selected;

                if (object === null) return;

                var parent = object.parent;
                if (parent !== null)
                    editor.execute(new RemoveObjectCommand(editor, object));

                break;

            case config.getKey("settings/shortcuts/translate"):
                signals.transformModeChanged.dispatch("translate");

                break;

            case config.getKey("settings/shortcuts/rotate"):
                signals.transformModeChanged.dispatch("rotate");

                break;

            case config.getKey("settings/shortcuts/scale"):
                signals.transformModeChanged.dispatch("scale");

                break;

            case config.getKey("settings/shortcuts/undo"):
                if (IS_MAC ? event.metaKey : event.ctrlKey) {
                    event.preventDefault(); // Prevent browser specific hotkeys

                    if (event.shiftKey) {
                        editor.redo();
                    } else {
                        editor.undo();
                    }
                }

                break;

            case config.getKey("settings/shortcuts/focus"):
                if (editor.selected !== null) {
                    editor.focus(editor.selected);
                }

                break;
        }
    }

    container.add(shortcutsContainer);

    var header = new UIDiv();
    header.addClass("header");
    header.dom.style =
        "display: flex; justify-content: space-between; align-items: center;";
    var text = new UIText();
    text.setTextContent("History");
    var persistentContainer = new UIDiv();
    persistentContainer.dom.style =
        "display: flex; align-items: center; gap: 0 10px;";
    var checkbox = checkboxField({
        value: config.getKey('settings/history'),
        onChange: function (value) {
            config.setKey('settings/history', value);

            if (value) {

                alert('The history will be preserved across sessions.\nThis can have an impact on performance when working with textures.');

                var lastUndoCmd = history.undos[history.undos.length - 1];
                var lastUndoId = (lastUndoCmd !== undefined) ? lastUndoCmd.id : 0;
                editor.history.enableSerialization(lastUndoId);

            } else {

                signals.historyChanged.dispatch();

            }
        }
    });
    persistentContainer.dom.append(checkbox);
    var persistent = new UIText();
    persistent.dom.style = "font-size: var(--p3); font-weight: 400;";
    persistent.setTextContent("persistent");
    persistentContainer.add(persistent);
    header.add(text, persistentContainer);
    container.add(header);

    var ignoreObjectSelectedSignal = false;

    var historyContainer = new UIDiv();
    historyContainer.setClass("setting-container");
    var outliner = new UIOutliner(editor);
    outliner.onChange(function () {
        ignoreObjectSelectedSignal = true;

        editor.history.goToState(parseInt(outliner.getValue()));

        ignoreObjectSelectedSignal = false;
    });
    historyContainer.add(outliner);
    container.add(historyContainer);

    var refreshUI = function () {
        var options = [];

        function buildOption(object) {
            var option = document.createElement("div");
            option.value = object.id;

            return option;
        }

        (function addObjects(objects) {
            for (var i = 0, l = objects.length; i < l; i++) {
                var object = objects[i];

                var option = buildOption(object);
                option.innerHTML = "&nbsp;" + object.name;

                options.push(option);
            }
        })(history.undos);

        (function addObjects(objects) {
            for (var i = objects.length - 1; i >= 0; i--) {
                var object = objects[i];

                var option = buildOption(object);
                option.innerHTML = "&nbsp;" + object.name;
                option.style.opacity = 0.3;

                options.push(option);
            }
        })(history.redos);

        outliner.setOptions(options);
    };

    refreshUI();

    signals.editorCleared.add(refreshUI);

    signals.historyChanged.add(refreshUI);
    signals.historyChanged.add(function (cmd) {
        if (ignoreObjectSelectedSignal === true) return;

        outliner.setValue(cmd !== undefined ? cmd.id : null);
    });
    //

    function createRenderer(value) {
        currentRenderer = new THREE.WebGLRenderer({
            antialias: value,
        });
        currentRenderer.outputEncoding = THREE.sRGBEncoding;
        currentRenderer.physicallyCorrectLights =
            config.getKey("sidebar/project/physicallyCorrectLights");
        currentRenderer.shadowMap.enabled = config.getKey("project/renderer/shadows");
        currentRenderer.shadowMap.type = parseFloat(config.getKey("project/renderer/shadowMapType"));
        currentRenderer.toneMapping = parseFloat(config.getKey("project/renderer/toneMapping"));
        currentRenderer.toneMappingExposure = config.getKey("project/renderer/toneMappingExposure");

        signals.rendererCreated.dispatch(currentRenderer);
        signals.rendererUpdated.dispatch();
    }

    createRenderer();

    // Signals

    signals.editorCleared.add(function () {
        currentRenderer.physicallyCorrectLights = false;
        currentRenderer.shadowMap.enabled = true;
        currentRenderer.shadowMap.type = THREE.PCFShadowMap;
        currentRenderer.toneMapping = THREE.NoToneMapping;
        currentRenderer.toneMappingExposure = 1;
        
        // var physical_light = document.getElementById("physical_light");
        // console.log(physical_light.checked);

        // document.getElementById("physical_light").value = true;
        // shadowsBoolean.setValue(currentRenderer.shadowMap.enabled);
        // shadowTypeSelect.setValue(currentRenderer.shadowMap.type);
        // toneMappingSelect.setValue(currentRenderer.toneMapping);
        // toneMappingExposure.setValue(currentRenderer.toneMappingExposure);
        // toneMappingExposure.setDisplay(
        //     currentRenderer.toneMapping === 0 ? "none" : ""
        // );

        signals.rendererUpdated.dispatch();
    });

    signals.rendererUpdated.add(function () {
        config.setKey(
            "project/renderer/antialias",
            currentRenderer.antialias,
            "project/renderer/physicallyCorrectLights",
            currentRenderer.physicallyCorrectLights,
            "project/renderer/shadows",
            currentRenderer.shadowMap.enabled,
            "project/renderer/shadowType",
            currentRenderer.shadowMap.type,
            "project/renderer/toneMapping",
            currentRenderer.toneMapping,
            "project/renderer/toneMappingExposure",
            currentRenderer.toneMappingExposure
        );
    });
    return container;
}

function checkboxField(params) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "sidebar-checkbox";
    checkbox.id = params.id;
    checkbox.checked = params.value || false;
    checkbox.addEventListener("change", function (event) {
        if (params.onChange) {
            params.onChange(event.target.checked);
        }
    });
    return checkbox;
}

function rowField(params) {
    var { label, editor, type } = params;
    var row = new UIDiv();
    row.setClass("row");

    var title = new UIDiv();
    title.setClass("row-title");
    title.setTextContent(label);
    row.add(title);
    type.forEach((item) => {
        switch (item.type) {
            case "select":
                var select = selectField(item);
                row.dom.appendChild(select);
                break;
            case "checkbox":
                var checkbox = checkboxField(item);
                row.dom.appendChild(checkbox);
                break;
            case "number":
                var number = numberField(item);
                row.dom.appendChild(number);
                break;
        }
    });
    return row;
}

function numberField(params) {
    var number = new UINumber(params.value);
    number.dom.className = "sidebar-number";
    number.setId(params.id);
    if (params.min && params.max)
        number.setRange(params.min, params.max);
    number.onChange(function () {
        if (params.onChange) {
            params.onChange(number.getValue());
        }
    });
    // number.value = initial;
    return number.dom;
}

function selectField(params) {
    var select = document.createElement("select");
    select.className = "sidebar-select";
    select.id = params.id;
    for (var option in params.options) {
        var optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = params.options[option];
        if (params.value) {
            if (typeof params.value === "string") {
                optionElement.selected = option === params.value;
            } else {
                optionElement.selected = option === params.value.toString();
            }
        }
        select.appendChild(optionElement);
    }

    select.addEventListener("change", function (event) {
        if (params.onChange) {
            params.onChange(event.target.value);
        }
    });
    return select;
}
