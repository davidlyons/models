var Helmet = function( dom ){

	var scene = this;
	ModelScene.call( scene, dom );

	scene.name = 'Helmet';

	fbxLoader.load('models/helmet/helmet.fbx', function(fbx){

		var helmet = fbx;
		helmet.scale.setScalar( .15 );
		scene.userData.group.add( helmet );

	});

	scene.userData.camera.position.x = .14;
	scene.userData.camera.position.y = .05;
	scene.userData.camera.position.z = .23;

	scene.userData.controls.target.y = 0;

}

Helmet.prototype = Object.create( ModelScene.prototype );
Helmet.prototype.constructor = Helmet;