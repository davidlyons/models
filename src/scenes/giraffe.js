var Giraffe = function( dom ){

	var scene = this;
	ModelScene.call( scene, dom );

	scene.name = 'Giraffe';

	fbxLoader.load('models/bowwow/giraffe.fbx', function(fbx){
		var giraffe = window.giraffe = fbx;
		var body = giraffe.getObjectByName('giraffe');
		body.material.shininess = 2;
		giraffe.scale.setScalar( .07 );
		scene.userData.group.add( giraffe );

		var bones = body.skeleton.bones;

		var sh = new THREE.SkeletonHelper( body.skeleton.bones[0] );
		scene.add( sh );
		sh.visible = false;
		skeletons.push( sh );

		scene.userData.update = function( time ) {
			bones[1].rotation.x = 
			bones[2].rotation.x = 
			bones[3].rotation.x = 
			bones[4].rotation.x = 
			bones[5].rotation.x = 
			Math.sin( 3 * time ) * THREE.Math.degToRad( 5 );
		};

	});

	scene.userData.camera.position.x = 0.38;
	scene.userData.camera.position.y = 0.5;
	scene.userData.camera.position.z = 0.38;

	scene.userData.controls.target.y = 0.21;

}

Giraffe.prototype = Object.create( ModelScene.prototype );
Giraffe.prototype.constructor = Giraffe;