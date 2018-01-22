var GasMask = function( dom ){

	var scene = this;
	ModelScene.call( scene, dom );

	scene.name = 'Gas Mask';

	fbxLoader.load('models/gasmask/gas-mask.fbx', function(fbx){

		var gasMask = fbx;
		gasMask.scale.setScalar( .15 );
		scene.userData.group.add( gasMask );

	});

	scene.userData.camera.position.x = .15;
	scene.userData.camera.position.y = .2;
	scene.userData.camera.position.z = .2;

}

GasMask.prototype = Object.create( ModelScene.prototype );
GasMask.prototype.constructor = GasMask;