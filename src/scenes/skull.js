var Skull = function( dom ){

	var scene = this;
	ModelScene.call( scene, dom );

	scene.name = 'Skull';

	var skullColor = textureLoader.load( 'models/skull/skull-color.jpg' );
	var skullNormal = textureLoader.load( 'models/skull/skull-normal.jpg' );

	var skullMat = new THREE.MeshPhongMaterial({
		color: 0xdddddd,
		// specular: 0xffffff,
		shininess: 1,
		map: skullColor,
		normalMap: skullNormal,
		morphTargets: true
	});

	jsonLoader.load( 'models/skull/skull-morph.js', function ( geometry, materials ) {
		var skull = window.skull = new THREE.Mesh( geometry, skullMat );
		skull.scale.setScalar( .14 );
		scene.userData.group.add( skull );

		scene.userData.update = function( time ) {
			skull.morphTargetInfluences[0] = Math.abs( Math.sin( time * 2 ) );
			skull.morphTargetInfluences[1] = Math.abs( Math.cos( time * 2 ) );
			// skull.position.y = Math.sin( time ) * 0.02;
		};

	});

	scene.userData.controls.target.y = 0;
	scene.userData.camera.position.x = 0.1;
	scene.userData.camera.position.y = -0.05;

}

Skull.prototype = Object.create( ModelScene.prototype );
Skull.prototype.constructor = Skull;