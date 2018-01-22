var Horse = function( dom ){

	var scene = this;
	ModelScene.call( scene, dom );

	scene.name = 'Horse';

	fbxLoader.load('models/horse/horse.fbx', function(fbx){
		var horse = window.horse = fbx.children[0];
		var body = horse.getObjectByName('body');
		horse.getObjectByName('eyeLeft').material.shininess = 500;
		horse.scale.setScalar( .1 );
		scene.userData.group.add( horse );

		// var wireframe = new THREE.WireframeGeometry( body.geometry );
		// line = new THREE.LineSegments( wireframe );
		// line.material.color.setHex( 0x111111 );
		// body.add( line );
		// line.visible = false;
	});

	scene.userData.controls.target.y = 0.15;

}

Horse.prototype = Object.create( ModelScene.prototype );
Horse.prototype.constructor = Horse;