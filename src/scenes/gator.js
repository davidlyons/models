var Gator = function( dom ){

	var scene = this;
	ModelScene.call( scene, dom );

	scene.name = 'Gator';

	fbxLoader.load('models/bowwow/gator.fbx', function(fbx){
		var gator = window.gator = fbx;
		var body = gator.getObjectByName('body');
		body.material.shininess = 2;
		gator.scale.setScalar( .07 );
		scene.userData.group.add( gator );

		var neck = gator.getObjectByName('neck');
		var mouth = gator.getObjectByName('mouth');

		var sh = new THREE.SkeletonHelper( body.skeleton.bones[0] );
		scene.add( sh );
		sh.visible = false;
		skeletons.push( sh );

		scene.userData.update = function( time ) {
			neck.rotation.x = - Math.abs( Math.sin( 2 * time ) ) * THREE.Math.degToRad( 10 );
			mouth.rotation.x = - Math.abs( Math.sin( 2 * time ) ) * THREE.Math.degToRad( 20 );
		};

	});

	scene.userData.camera.position.x = 0.3;
	scene.userData.camera.position.y = 0.2;
	scene.userData.camera.position.z = 0.35;

	scene.userData.controls.target.y = 0.05;

}

Gator.prototype = Object.create( ModelScene.prototype );
Gator.prototype.constructor = Gator;