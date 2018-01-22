var Max = function( dom ){

	var scene = this;
	ModelScene.call( scene, dom );

	scene.name = 'Bearded Man';

	var maxEyeTex = textureLoader.load('models/max/max.png');

	fbxLoader.load('models/max/max.fbx', function(fbx){
		var max = window.max = fbx;
		max.scale.setScalar( .07 );
		
		var head = max.getObjectByName('head');
		head.material.shininess = 2;

		var eyeL = max.getObjectByName('eyeLeft');
		var eyeR = max.getObjectByName('eyeRight');
		eyeL.material = eyeR.material = new THREE.MeshPhongMaterial({
			map: maxEyeTex
		});
		
		scene.userData.group.add( max );
	});

	scene.userData.camera.position.z = 0.4;
	scene.userData.camera.position.y = 0.4;
	
	scene.userData.controls.target.y = 0.2;

}

Max.prototype = Object.create( ModelScene.prototype );
Max.prototype.constructor = Max;