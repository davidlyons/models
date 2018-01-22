var Bird = function( dom ){

	var scene = this;
	ModelScene.call( scene, dom );

	scene.name = 'Bird';

	fbxLoader.load('models/jeepjeep/bird.fbx', function(fbx){
		var bird = window.bird = fbx;
		var body = bird.getObjectByName('body');
		body.material.shininess = 2;
		bird.scale.setScalar( 0.07 );
		scene.userData.group.add( bird );

		var neck = bird.getObjectByName('neck');

		// var sh = new THREE.SkeletonHelper( body.skeleton.bones[0] ); // why doesn't this one work?
		var sh = new THREE.SkeletonHelper( bird.children[1] );
		scene.add( sh );
		sh.visible = false;
		skeletons.push( sh );

		scene.userData.update = function( time ) {
			neck.rotation.x = Math.sin( 8 * time ) * THREE.Math.degToRad( 10 );
		};

	});

	scene.userData.camera.position.x = 0.2;
	scene.userData.camera.position.y = 0.2;
	scene.userData.camera.position.z = 0.2;

	// scene.userData.controls.target.y = 0.15;

}

Bird.prototype = Object.create( ModelScene.prototype );
Bird.prototype.constructor = Bird;