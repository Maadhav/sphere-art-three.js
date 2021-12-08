import { UIDiv } from "./libs/ui.js";
import MenuSidebarAdd from "./Menu.SideBar.Add.js";
import MenuSidebarExamples from "./Menu.Sidebar.Examples.js";
import MenuSidebarExport from "./Menu.Sidebar.Export.js";
import MenuSidebarImport from "./Menu.Sidebar.Import.js";

function MenubarOptions(editor, name) {
	var strings = editor.strings;
	var menu = new UIDiv();
	menu.addClass("menu-options");
	menu.dom.dataset.icon = name;

	var icon = document.createElement("img");
	icon.src = "images/" + name + ".svg";
	icon.className = "icon";

	menu.dom.appendChild(icon);
	var text = new UIDiv();
	text.setTextContent(strings.getKey("menubar/" + name));
	text.setClass("text");

	menu.add(text);
	menu.dom.addEventListener("click", function (event) {
		var elements = document.getElementsByClassName("menu-options");
		var activeelement = document.getElementsByClassName(
			"menu-options active"
		)[0];
		var element = document.getElementById("menu-sidebar");
		for (var i = 0; i < elements.length; i++) {
			elements[i].classList.remove("active");
		}
		if (
			element.style.display == "block" &&
			activeelement.dataset.icon == menu.dom.dataset.icon
		) {
			element.style.opacity = 0;
			setTimeout(function () {
				element.style.display = "none";
			}, 300);
		} else {
			menu.dom.classList.add("active");
			updateSideBarOptions();
			element.style.display = "block";
			setTimeout(function () {
				element.style.opacity = 1;
			}, 300);
		}
	});

	function updateSideBarOptions() {
		var sidebar = document.getElementById("menu-sidebar");
		var element = document.getElementsByClassName("menu-options active")[0];
		switch (element.dataset.icon) {
			case "add":
				var menubar_add = MenuSidebarAdd(editor);
				sidebar.replaceChildren(menubar_add.dom);
				break;
			case "import":
				var menubar_import = MenuSidebarImport(editor);
				sidebar.replaceChildren(menubar_import.dom);
				break;
			case "examples":
				var menubar_examples = MenuSidebarExamples(editor);
				sidebar.replaceChildren(menubar_examples.dom);
				break;
			case "export":
				var menubar_export = MenuSidebarExport(editor);
				sidebar.replaceChildren(menubar_export.dom);
				break;
			default:
				var div = new UIDiv();
				sidebar.replaceChildren(div.dom);
		}
	}

	return menu;
}

export { MenubarOptions };
