var ModelScene = function( dom ){

	var scene = this;
	THREE.Scene.call( scene );

	// model group
	var group = scene.userData.group = new THREE.Group();
	scene.add( group );

	// scene.add( new THREE.AxesHelper(1) );

	var camera = new THREE.PerspectiveCamera( 60, 1, .001, 10 );
	camera.position.x = 0.25;
	camera.position.y = 0.2;
	camera.position.z = 0.25;
	scene.userData.camera = camera;

	scene.userData.element = dom;

	var controls = new THREE.OrbitControls( camera, dom );
	controls.minDistance = 0.1;
	controls.maxDistance = 5;
	controls.enablePan = false;
	controls.enableZoom = false;
	controls.target.y = 0.1;
	controls.autoRotate = false;
	controls.autoRotateSpeed = 10;
	scene.userData.controls = controls;

	var hlight = scene.userData.hlight = new THREE.HemisphereLight( 0xaaaaaa, 0x444444 );
	scene.add( hlight );

	var klight = scene.userData.klight = new THREE.DirectionalLight( 0xffffff, 0.8 );
	klight.position.set( 1, 1, 1 );
	scene.add( klight );

	var blight = scene.userData.blight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	blight.position.set( -1, 1, -1 );
	scene.add( blight );

}

ModelScene.prototype = Object.create( THREE.Scene.prototype );
ModelScene.prototype.constructor = ModelScene;