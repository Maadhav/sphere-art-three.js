
import { UIDiv, } from './libs/ui.js';


function MenubarExamples( editor ) {
	var strings = editor.strings;
	var menu = new UIDiv()
	menu.setId('menu-options')
	var addIcon = document.createElement( 'img' );
	addIcon.src = 'images/examples.svg';
	addIcon.className = 'icon';
	menu.dom.appendChild( addIcon );
	var text = new UIDiv()
	text.setTextContent(strings.getKey('menubar/examples'))
	text.setClass('text')

	menu.add(text)
	return menu
}

export { MenubarExamples };


// function MenubarExamples( editor ) {

// 	var strings = editor.strings;

// 	var container = new UIPanel();
// 	container.setClass( 'menu' );

// 	var title = new UIPanel();
// 	title.setClass( 'title' );
// 	title.setTextContent( strings.getKey( 'menubar/examples' ) );
// 	container.add( title );

// 	var options = new UIPanel();
// 	options.setClass( 'options' );
// 	container.add( options );

// 	// Examples

// 	var items = [
// 		{ title: 'menubar/examples/Moon', file: 'moon.app.json' },
// 	];

// 	var loader = new THREE.FileLoader();

// 	for ( var i = 0; i < items.length; i ++ ) {

// 		( function ( i ) {

// 			var item = items[ i ];

// 			var option = new UIRow();
// 			option.setClass( 'option' );
// 			option.setTextContent( strings.getKey( item.title ) );
// 			option.onClick( function () {

// 				if ( confirm( 'Any unsaved data will be lost. Are you sure?' ) ) {

// 					loader.load( 'examples/' + item.file, function ( text ) {

// 						editor.clear();
// 						editor.fromJSON( JSON.parse( text ) );

// 					} );

// 				}

// 			} );
// 			options.add( option );

// 		} )( i );

// 	}

// 	return container;

// }

