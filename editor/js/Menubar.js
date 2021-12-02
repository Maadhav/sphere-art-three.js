import { UIDiv, UIPanel } from './libs/ui.js';

import { MenubarOptions } from './Menubar.Options.js';

function Menubar(editor) {

	var container = new UIDiv();
	container.setId('side-menu-bar');


	container.add(new MenubarOptions(editor, 'add'));
	container.add(new MenubarOptions(editor, 'import'));
	container.add(new MenubarOptions(editor, 'examples'));
	container.add(new MenubarOptions(editor, 'view'));
	container.add(new MenubarOptions(editor, 'export'));
	container.add(new MenubarOptions(editor, 'settings'));

	// var container = new UIPanel();
	// container.setId( 'menubar' );

	// container.add( new MenubarFile( editor ) );
	// container.add( new MenubarEdit( editor ) );
	// container.add( new MenubarPlay( editor ) );
	// container.add( new MenubarHelp( editor ) );

	// container.add( new MenubarStatus( editor ) );

	return container;

}

export { Menubar };
