var Scorpion = function( dom ){

	var scene = this;
	ModelScene.call( scene, dom );

	scene.name = 'Scorpion';

	fbxLoader.load('models/jeepjeep/scorpion.fbx', function(fbx){
		var scorpion = window.scorpion = fbx;
		var body = scorpion.getObjectByName('scorpion');
		body.material.shininess = 2;
		scorpion.position.set( 0, .04, 0 );
		scorpion.scale.setScalar( .12 );
		scene.userData.group.add( scorpion );

		var elbowL = scorpion.getObjectByName('elbowLeft');
		var elbowR = scorpion.getObjectByName('elbowRight');

		var pincherL = scorpion.getObjectByName('pincherLeftBottom');
		var pincherR = scorpion.getObjectByName('pincherRightBottom');

		var bones = body.skeleton.bones;

		// var sh = new THREE.SkeletonHelper( body.skeleton.bones[0] ); // why doesn't this one work?
		var sh = new THREE.SkeletonHelper( scorpion.children[0] );
		scene.add( sh );
		sh.visible = false;
		skeletons.push( sh );

		scene.userData.update = function( time ) {
			elbowL.rotation.x = - Math.abs( Math.sin( 5 * time ) ) * THREE.Math.degToRad( 20 );
			elbowR.rotation.x = - Math.abs( Math.cos( 5 * time ) ) * THREE.Math.degToRad( 20 );

			pincherL.rotation.x = - Math.abs( Math.sin( 7 * time ) ) * THREE.Math.degToRad( 20 );
			pincherL.rotation.y = - Math.abs( Math.sin( 7 * time ) ) * THREE.Math.degToRad( 10 );

			pincherR.rotation.x = - Math.abs( Math.cos( 7 * time ) ) * THREE.Math.degToRad( 20 );
			pincherR.rotation.y = - Math.abs( Math.cos( 7 * time ) ) * THREE.Math.degToRad( - 10 );

			// // tail
			bones[16].rotation.x = bones[17].rotation.x = bones[18].rotation.x = 
			bones[19].rotation.x = bones[20].rotation.x = bones[21].rotation.x = 
			Math.sin( 4 * time ) * THREE.Math.degToRad( 5 );

		};

	});

	scene.userData.camera.position.x = 0.2;
	scene.userData.camera.position.y = 0.2;
	scene.userData.camera.position.z = 0.25;

	scene.userData.controls.target.y = 0.05;

}

Scorpion.prototype = Object.create( ModelScene.prototype );
Scorpion.prototype.constructor = Scorpion;