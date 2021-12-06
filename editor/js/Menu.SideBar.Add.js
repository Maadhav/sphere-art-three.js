import { UIDiv } from "./libs/ui.js";
import MenuSidebarButton from "./Menu.Sidebar.Button.js";


export default function MenuSidebarAdd(editor) {
    var container = new UIDiv()
    container.setId("menu-sidebar-add")

    // Group
    var grid = new UIDiv()
    grid.setClass("grid")
    var group = MenuSidebarButton('Group', 'group', () => { })
    grid.add(group)


    // Object 3D
    var objectsHeader = new UIDiv()
    objectsHeader.setClass("header")
    objectsHeader.setTextContent("Objects")
    var objects = new UIDiv()
    objects.setClass("grid")
    var sphere = MenuSidebarButton('Sphere', 'sphere', () => { })
    objects.add(sphere)


    var lightsHeader = new UIDiv()
    lightsHeader.setClass("header")
    lightsHeader.setTextContent("Lights")
    var lights = new UIDiv()
    lights.setClass("grid")
    var ambient_light = MenuSidebarButton('Ambient Light', 'ambient_light', () => { })
    var directional_light = MenuSidebarButton('Directional Light', 'directional_light', () => { })
    var hemisphere_light = MenuSidebarButton('Hemisphere Light', 'hemisphere_light', () => { })
    var point_light = MenuSidebarButton('Point Light', 'point_light', () => { })
    var spot_light = MenuSidebarButton('Spot Light', 'spot_light', () => { })
    lights.add(ambient_light, directional_light, hemisphere_light, point_light, spot_light)

    var cameraHeader = new UIDiv()
    cameraHeader.setClass("header")
    cameraHeader.setTextContent("Camera")
    var cameras = new UIDiv()
    cameras.setClass("grid")
    var camera_perspective = MenuSidebarButton('Perspective Camera', 'camera_2', () => { })
    var camera_orthographic = MenuSidebarButton('Orthographic Camera', 'camera_1', () => { })
    cameras.add(camera_orthographic, camera_perspective)


    container.add(grid, objectsHeader, objects, lightsHeader, lights, cameraHeader, cameras)


    return container;
}