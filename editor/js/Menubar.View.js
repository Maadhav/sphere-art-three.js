
import { UIDiv } from './libs/ui.js';


function MenubarView(editor) {
	var strings = editor.strings;
	var menu = new UIDiv()
	menu.setId('menu-options')
	var addIcon = document.createElement('img');
	addIcon.src = 'images/view.svg';
	addIcon.className = 'icon';
	menu.dom.appendChild(addIcon);
	var text = new UIDiv()
	text.setTextContent(strings.getKey('menubar/view'))
	text.setClass('text')

	menu.add(text)
	return menu
}

export { MenubarView };

// function MenubarView( editor ) {

// 	var strings = editor.strings;

// 	var container = new UIPanel();
// 	container.setClass( 'menu' );

// 	var title = new UIPanel();
// 	title.setClass( 'title' );
// 	title.setTextContent( strings.getKey( 'menubar/view' ) );
// 	container.add( title );

// 	var options = new UIPanel();
// 	options.setClass( 'options' );
// 	container.add( options );

// 	// Fullscreen

// 	var option = new UIRow();
// 	option.setClass( 'option' );
// 	option.setTextContent( strings.getKey( 'menubar/view/fullscreen' ) );
// 	option.onClick( function () {

// 		if ( document.fullscreenElement === null ) {

// 			document.documentElement.requestFullscreen();

// 		} else if ( document.exitFullscreen ) {

// 			document.exitFullscreen();

// 		}

// 		// Safari

// 		if ( document.webkitFullscreenElement === null ) {

// 			document.documentElement.webkitRequestFullscreen();

// 		} else if ( document.webkitExitFullscreen ) {

// 			document.webkitExitFullscreen();

// 		}

// 	} );
// 	options.add( option );

// 	// VR (Work in progress)

// 	if ( 'xr' in navigator ) {

// 		navigator.xr.isSessionSupported( 'immersive-vr' )
// 			.then( function ( supported ) {

// 				if ( supported ) {

// 					var option = new UIRow();
// 					option.setClass( 'option' );
// 					option.setTextContent( 'VR' );
// 					option.onClick( function () {

// 						editor.signals.toggleVR.dispatch();

// 					} );
// 					options.add( option );

// 				}

// 			} );

// 	}

// 	return container;

// }


