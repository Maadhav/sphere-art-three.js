
import { UIDiv } from './libs/ui.js';


function MenubarOptions(editor, name) {
	var strings = editor.strings;
	var menu = new UIDiv()
	menu.addClass('menu-options')
	menu.dom.dataset.icon = name;

	var icon = document.createElement('img');
	icon.src = 'images/' + name + '.svg';
	icon.className = 'icon';

	menu.dom.appendChild(icon);
	var text = new UIDiv()
	text.setTextContent(strings.getKey('menubar/' + name))
	text.setClass('text')

	menu.add(text)
	menu.dom.addEventListener('click', function (event) {
		var elements = document.getElementsByClassName('menu-options')
		for (var i = 0; i < elements.length; i++) {
			elements[i].classList.remove('active')
		}
		menu.dom.classList.add('active')
		var element = document.getElementById('menu-sidebar');
		if (element.style.display == 'block') {
			element.style.display = 'none';
		} else {
			element.style.display = 'block';
		}
	})

	return menu
}

export { MenubarOptions };

// function MenubarAdd( editor ) {

// 	var strings = editor.strings;

// 	var container = new UIPanel();
// 	container.setClass( 'menu' );

// 	var title = new UIPanel();
// 	title.setClass( 'title' );
// 	title.setTextContent( strings.getKey( 'menubar/add' ) );
// 	container.add( title );

// 	var options = new UIPanel();
// 	options.setClass( 'options' );
// 	container.add( options );

// 	// Group

// 	var option = new UIRow();
// 	option.setClass( 'option' );
// 	option.setTextContent( strings.getKey( 'menubar/add/group' ) );
// 	option.onClick( function () {

// 		var mesh = new THREE.Group();
// 		mesh.name = 'Group';

// 		editor.execute( new AddObjectCommand( editor, mesh ) );

// 	} );
// 	options.add( option );

// 	//

// 	options.add( new UIHorizontalRule() );

// 	// Sphere

// 	var option = new UIRow();
// 	option.setClass( 'option' );
// 	option.setTextContent( strings.getKey( 'menubar/add/sphere' ) );
// 	option.onClick( function () {

// 		var geometry = new THREE.SphereGeometry( 1, 32, 16, 0, Math.PI * 2, 0, Math.PI );
// 		var mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
// 		mesh.name = 'Sphere';

// 		editor.execute( new AddObjectCommand( editor, mesh ) );

// 	} );
// 	options.add( option );

// 	// 

// 	options.add( new UIHorizontalRule() );

// 	// AmbientLight

// 	var option = new UIRow();
// 	option.setClass( 'option' );
// 	option.setTextContent( strings.getKey( 'menubar/add/ambientlight' ) );
// 	option.onClick( function () {

// 		var color = 0x222222;

// 		var light = new THREE.AmbientLight( color );
// 		light.name = 'AmbientLight';

// 		editor.execute( new AddObjectCommand( editor, light ) );

// 	} );
// 	options.add( option );

// 	// DirectionalLight

// 	var option = new UIRow();
// 	option.setClass( 'option' );
// 	option.setTextContent( strings.getKey( 'menubar/add/directionallight' ) );
// 	option.onClick( function () {

// 		var color = 0xffffff;
// 		var intensity = 1;

// 		var light = new THREE.DirectionalLight( color, intensity );
// 		light.name = 'DirectionalLight';
// 		light.target.name = 'DirectionalLight Target';

// 		light.position.set( 5, 10, 7.5 );

// 		editor.execute( new AddObjectCommand( editor, light ) );

// 	} );
// 	options.add( option );

// 	// HemisphereLight

// 	var option = new UIRow();
// 	option.setClass( 'option' );
// 	option.setTextContent( strings.getKey( 'menubar/add/hemispherelight' ) );
// 	option.onClick( function () {

// 		var skyColor = 0x00aaff;
// 		var groundColor = 0xffaa00;
// 		var intensity = 1;

// 		var light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
// 		light.name = 'HemisphereLight';

// 		light.position.set( 0, 10, 0 );

// 		editor.execute( new AddObjectCommand( editor, light ) );

// 	} );
// 	options.add( option );

// 	// PointLight

// 	var option = new UIRow();
// 	option.setClass( 'option' );
// 	option.setTextContent( strings.getKey( 'menubar/add/pointlight' ) );
// 	option.onClick( function () {

// 		var color = 0xffffff;
// 		var intensity = 1;
// 		var distance = 0;

// 		var light = new THREE.PointLight( color, intensity, distance );
// 		light.name = 'PointLight';

// 		editor.execute( new AddObjectCommand( editor, light ) );

// 	} );
// 	options.add( option );

// 	// SpotLight

// 	var option = new UIRow();
// 	option.setClass( 'option' );
// 	option.setTextContent( strings.getKey( 'menubar/add/spotlight' ) );
// 	option.onClick( function () {

// 		var color = 0xffffff;
// 		var intensity = 1;
// 		var distance = 0;
// 		var angle = Math.PI * 0.1;
// 		var penumbra = 0;

// 		var light = new THREE.SpotLight( color, intensity, distance, angle, penumbra );
// 		light.name = 'SpotLight';
// 		light.target.name = 'SpotLight Target';

// 		light.position.set( 5, 10, 7.5 );

// 		editor.execute( new AddObjectCommand( editor, light ) );

// 	} );
// 	options.add( option );

// 	//

// 	options.add( new UIHorizontalRule() );

// 	// OrthographicCamera

// 	var option = new UIRow();
// 	option.setClass( 'option' );
// 	option.setTextContent( strings.getKey( 'menubar/add/orthographiccamera' ) );
// 	option.onClick( function () {

// 		var aspect = editor.camera.aspect;
// 		var camera = new THREE.OrthographicCamera( - aspect, aspect );
// 		camera.name = 'OrthographicCamera';

// 		editor.execute( new AddObjectCommand( editor, camera ) );

// 	} );
// 	options.add( option );

// 	// PerspectiveCamera

// 	var option = new UIRow();
// 	option.setClass( 'option' );
// 	option.setTextContent( strings.getKey( 'menubar/add/perspectivecamera' ) );
// 	option.onClick( function () {

// 		var camera = new THREE.PerspectiveCamera();
// 		camera.name = 'PerspectiveCamera';

// 		editor.execute( new AddObjectCommand( editor, camera ) );

// 	} );
// 	options.add( option );

// 	return container;

// }
