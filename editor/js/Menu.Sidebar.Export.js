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
    var geometry = MenuSidebarButton("Geometry", 'geometry', () => { });
    var object = MenuSidebarButton("Object", 'object', () => { });
    var scene = MenuSidebarButton("Scene", 'scene', () => { });
    files.add(geometry, object, scene);

    // Object 3D
    var fileFormatHeader = new UIDiv();
    fileFormatHeader.setClass("header");
    fileFormatHeader.setTextContent("File Formats");
    var fileFormat = new UIDiv();
    fileFormat.setClass("grid");
    var dae = MenuSidebarButton(".DAE", undefined, () => { });
    var drc = MenuSidebarButton(".DRC", undefined, () => { });
    var gle = MenuSidebarButton(".GLE", undefined, () => { });
    var gltf = MenuSidebarButton(".GLTF", undefined, () => { });
    var obj = MenuSidebarButton(".OBJ", undefined, () => { });
    var ply = MenuSidebarButton(".PLY", undefined, () => { });
    var ply_binary = MenuSidebarButton(".PLY (Binary)", undefined, () => { });
    var slt = MenuSidebarButton(".STL", undefined, () => { });
    var slt_binary = MenuSidebarButton(".STL (Binary)", undefined, () => { });
    var usdz = MenuSidebarButton(".USDZ", undefined, () => { });
    fileFormat.add(dae, drc, gle, gltf, obj, ply, ply_binary, slt, slt_binary, usdz);

    container.add(
        fileHeader,
        files,
        fileFormatHeader,
        fileFormat
    );

    return container;
}
