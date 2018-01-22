var Rhino = function( dom ){

	var scene = this;
	ModelScene.call( scene, dom );

	scene.name = 'Rhino';

	fbxLoader.load('models/bowwow/rhino.fbx', function(fbx){
		var rhino = fbx;
		var body = rhino.getObjectByName('rhino');
		body.material.shininess = 2;
		rhino.scale.setScalar( .07 );
		scene.userData.group.add( rhino );

		var sh = new THREE.SkeletonHelper( body.skeleton.bones[0] );
		scene.add( sh );
		sh.visible = false;
		skeletons.push( sh );
		
		var neck = rhino.getObjectByName('neck2');

		scene.userData.update = function( time ) {
			neck.rotation.x = Math.sin( 4 * time ) * 0.175;
		};

	});

	scene.userData.camera.position.x = 0.22;
	scene.userData.camera.position.z = 0.22;

}

Rhino.prototype = Object.create( ModelScene.prototype );
Rhino.prototype.constructor = Rhino;