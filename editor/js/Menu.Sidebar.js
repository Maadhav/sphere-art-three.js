import { UIDiv, UIText } from "./libs/ui.js";
import MenuSidebarAdd from "./Menu.SideBar.Add.js";
import MenuSidebarImport from "./Menu.Sidebar.Import.js";

function MenuSidebar(editor) {
    var container = new UIDiv();
    container.setId("menu-sidebar");

    document.addEventListener("click", function (e) {
        // console.log(e.target)
        var sidebar = document.getElementById("menu-sidebar");
        var element = document.getElementsByClassName('menu-options active')[0];
        switch (element.dataset.icon) {
            case "add":
                var menubar_add = MenuSidebarAdd(editor)
                sidebar.replaceChildren(menubar_add.dom);
                break;
            case "import":
                var menubar_import = MenuSidebarImport(editor)
                sidebar.replaceChildren(menubar_import.dom);
                break;
            default:
                var div = new UIDiv();
                sidebar.replaceChildren(div.dom);
        }
    })
    return container;
}

export { MenuSidebar };