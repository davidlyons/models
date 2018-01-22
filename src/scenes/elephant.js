var Elephant = function( dom ){

	var scene = this;
	ModelScene.call( scene, dom );

	scene.name = 'Elephant';

	fbxLoader.load('models/bowwow/elephant.fbx', function(fbx) {
		var elephant = fbx;
		var body = elephant.getObjectByName('elephant')
		body.material.shininess = 2;
		elephant.scale.setScalar( .07 );
		scene.userData.group.add( elephant );

		var bones = body.skeleton.bones;

		var sh = new THREE.SkeletonHelper( body.skeleton.bones[0] );
		scene.add( sh );
		sh.visible = false;
		skeletons.push( sh );

		scene.userData.update = function( time ) {
			bones[3].rotation.x = 
			bones[4].rotation.x = 
			bones[5].rotation.x = 
			bones[6].rotation.x = 
			bones[7].rotation.x = 
			bones[8].rotation.x = 
			Math.sin( 4 * time ) * THREE.Math.degToRad( 5 );
		};
	});

	scene.userData.camera.position.x = 0.3;
	scene.userData.camera.position.z = 0.3;

}

Elephant.prototype = Object.create( ModelScene.prototype );
Elephant.prototype.constructor = Elephant;