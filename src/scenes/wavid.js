var Wavid = function( dom ){

	var scene = this;
	ModelScene.call( scene, dom );

	scene.name = 'Wavid';

	var floaties = [];

	// var wavidMat = new THREE.MeshPhongMaterial({
	var wavidMat = new THREE.MeshToonMaterial({
		map: textureLoader.load('models/wavid/wavid.png'),
		specular: 0x333333,
		// shininess: 20
		shininess: 1
	});

	jsonLoader.load( 'models/wavid/wavid.js', function(geometry) {
		var wavid = window.wavid = new THREE.Mesh(geometry, wavidMat);
		wavid.scale.setScalar( 0.07 );
		scene.userData.group.add( wavid );
		floaties.push( wavid );

		var i = 0;
		scene.userData.update = function( time ) {
			wavid.position.y = Math.sin( time * 8 + i ) * .012 + 0.01;
			wavid.rotation.z = - Math.sin( time * 8 + 2 + i ) * THREE.Math.degToRad(2.5);
		}
	});

	// var others = ['bobbin','edgar','h2dough','vince','poolygon'];
	// others.forEach(function( name ) {
	// 	var mat = name == 'poolygon' ? 'Phong' : 'Toon';
	// 	var floatyMat = new THREE['Mesh'+mat+'Material']({
	// 		map: textureLoader.load( 'models/wavid/' + name + '.png' ),
	// 		specular: 0x333333,
	// 		shininess: 20
	// 	});
	// 	jsonLoader.load( 'models/wavid/' + name + '.js', function( geometry ) {
	// 		var floaty = new THREE.Mesh( geometry, floatyMat );
	// 		floaty.scale.setScalar( 0.05 );
	// 		scene.userData.group.add( floaty );
	// 		floaties.push( floaty );
	// 	});
	// });

	scene.userData.camera.position.x = 0.2;
	scene.userData.camera.position.z = 0.3;

	// scene.userData.controls.target.y = 0;

	scene.userData.klight.intensity = 1;
	scene.remove( scene.userData.hlight );
	scene.remove( scene.userData.blight );

	var alight = new THREE.AmbientLight( 0x222222 );
	scene.add( alight );

}

Wavid.prototype = Object.create( ModelScene.prototype );
Wavid.prototype.constructor = Wavid;