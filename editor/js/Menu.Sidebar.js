import { UIDiv, UIText } from "./libs/ui.js";
import MenuSidebarAdd from "./Menu.SideBar.Add.js";

function MenuSidebar(editor) {
    var container = new UIDiv();
    container.setId("menu-sidebar");

    document.addEventListener("click", function (e) {
        var sidebar = document.getElementById("menu-sidebar");
        var element = document.getElementsByClassName('menu-options active')[0];
        if (element.dataset.icon == 'add') {
            var menubar_add = MenuSidebarAdd()

            sidebar.replaceChildren(menubar_add.dom);
        }
        else {
            var div = new UIDiv();
            sidebar.replaceChildren(div.dom);
        }
    })
    return container;
}

export { MenuSidebar };