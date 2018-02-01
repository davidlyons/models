var OutlineShader = {

	uniforms: {
		offset: { type: 'f', value: 0.03 },
		color: { type: 'v3', value: new THREE.Color('#000000') },
		alpha: { type: 'f', value: 1.0 }
	},

	vertexShader: [

		"uniform float offset;",

		"void main() {",
		"  vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );",
		"  gl_Position = projectionMatrix * pos;",
		"}"

	].join('\n'),

	fragmentShader: [

		"uniform vec3 color;",
		"uniform float alpha;",

		"void main() {",
		"  gl_FragColor = vec4( color, alpha );",
		"}"

	].join('\n')

};;var ModelScene = function( dom ){

	var scene = this;
	THREE.Scene.call( scene );

	// model group
	var group = scene.userData.group = new THREE.Group();
	scene.add( group );

	// scene.add( new THREE.AxesHelper(1) );

	var camera = new THREE.PerspectiveCamera( 60, 1, .001, 10 );
	camera.position.x = 0.25;
	camera.position.y = 0.2;
	camera.position.z = 0.25;
	scene.userData.camera = camera;

	scene.userData.element = dom;

	var controls = new THREE.OrbitControls( camera, dom );
	controls.minDistance = 0.1;
	controls.maxDistance = 5;
	controls.enablePan = false;
	controls.enableZoom = false;
	controls.target.y = 0.1;
	controls.autoRotate = true;
	controls.autoRotateSpeed = 10;
	scene.userData.controls = controls;

	var hlight = scene.userData.hlight = new THREE.HemisphereLight( 0xaaaaaa, 0x444444 );
	scene.add( hlight );

	var klight = scene.userData.klight = new THREE.DirectionalLight( 0xffffff, 0.8 );
	klight.position.set( 1, 1, 1 );
	scene.add( klight );

	var blight = scene.userData.blight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	blight.position.set( -1, 1, -1 );
	scene.add( blight );

}

ModelScene.prototype = Object.create( THREE.Scene.prototype );
ModelScene.prototype.constructor = ModelScene;;var Helmet = function( dom ){

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
Helmet.prototype.constructor = Helmet;;var Horse = function( dom ){

	var scene = this;
	ModelScene.call( scene, dom );

	scene.name = 'Horse';

	fbxLoader.load('models/horse/horse.fbx', function(fbx){
		var horse = window.horse = fbx.children[0];
		var body = horse.getObjectByName('body');
		horse.getObjectByName('eyeLeft').material.shininess = 500;
		horse.scale.setScalar( .1 );
		scene.userData.group.add( horse );

		// var wireframe = new THREE.WireframeGeometry( body.geometry );
		// line = new THREE.LineSegments( wireframe );
		// line.material.color.setHex( 0x111111 );
		// body.add( line );
		// line.visible = false;
	});

	scene.userData.controls.target.y = 0.15;

}

Horse.prototype = Object.create( ModelScene.prototype );
Horse.prototype.constructor = Horse;;var Skull = function( dom ){

	var scene = this;
	ModelScene.call( scene, dom );

	scene.name = 'Skull';

	var skullColor = textureLoader.load( 'models/skull/skull-color.jpg' );
	var skullNormal = textureLoader.load( 'models/skull/skull-normal.jpg' );

	var skullMat = new THREE.MeshPhongMaterial({
		color: 0xdddddd,
		// specular: 0xffffff,
		shininess: 1,
		map: skullColor,
		normalMap: skullNormal,
		morphTargets: true
	});

	jsonLoader.load( 'models/skull/skull-morph.js', function ( geometry, materials ) {
		var skull = window.skull = new THREE.Mesh( geometry, skullMat );
		skull.scale.setScalar( .14 );
		scene.userData.group.add( skull );

		scene.userData.update = function( time ) {
			skull.morphTargetInfluences[0] = Math.abs( Math.sin( time * 2 ) );
			skull.morphTargetInfluences[1] = Math.abs( Math.cos( time * 2 ) );
			// skull.position.y = Math.sin( time ) * 0.02;
		};

	});

	scene.userData.controls.target.y = 0;
	scene.userData.camera.position.x = 0.1;
	scene.userData.camera.position.y = -0.05;

}

Skull.prototype = Object.create( ModelScene.prototype );
Skull.prototype.constructor = Skull;;var Max = function( dom ){

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
Max.prototype.constructor = Max;;var Rhino = function( dom ){

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
Rhino.prototype.constructor = Rhino;;var Elephant = function( dom ){

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
Elephant.prototype.constructor = Elephant;;var Giraffe = function( dom ){

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
Giraffe.prototype.constructor = Giraffe;;var Gator = function( dom ){

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
Gator.prototype.constructor = Gator;;var Scorpion = function( dom ){

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
Scorpion.prototype.constructor = Scorpion;;var Bird = function( dom ){

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
Bird.prototype.constructor = Bird;;var Wavid = function( dom ){

	var scene = this;
	ModelScene.call( scene, dom );

	scene.name = 'Wavid';

	var floaties = [];

	var wavidMat = new THREE.MeshToonMaterial({
		map: textureLoader.load('models/wavid/wavid.png'),
		specular: 0x333333,
		shininess: 1
	});

	var outlineMat = new THREE.ShaderMaterial({
		uniforms: THREE.UniformsUtils.clone( OutlineShader.uniforms ),
		vertexShader: OutlineShader.vertexShader,
		fragmentShader: OutlineShader.fragmentShader,
		side: THREE.BackSide,
		transparent: true
	});

	jsonLoader.load( 'models/wavid/wavid.js', function(geometry) {
		var wavid = THREE.SceneUtils.createMultiMaterialObject( geometry, [ wavidMat, outlineMat ] );
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

	scene.userData.klight.intensity = 1;
	scene.remove( scene.userData.hlight );
	scene.remove( scene.userData.blight );

	var alight = new THREE.AmbientLight( 0x222222 );
	scene.add( alight );

}

Wavid.prototype = Object.create( ModelScene.prototype );
Wavid.prototype.constructor = Wavid;;if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var fbxLoader = new THREE.FBXLoader();
var textureLoader = new THREE.TextureLoader();
var jsonLoader = new THREE.JSONLoader();
var skeletons = [];

(function(){

	var canvas;
	var scenes = [];
	var renderer;
	var clock = new THREE.Clock();

	var fullScene = null;

	var gui = new dat.GUI();
	gui.close();

	var pctLoaded = document.querySelector('#pctLoaded');
	THREE.DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
		// console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
		var pct = Math.floor( itemsLoaded / itemsTotal * 100 ) + '%';
		pctLoaded.textContent = pct;
	};

	THREE.DefaultLoadingManager.onLoad = function ( ) {
		// console.log('Loading complete!');
		document.body.classList.add('loaded');
		loop();
	};

	init();
	// loop();

	function init() {

		canvas = document.getElementById('canvas');

		renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true
		});

		renderer.setClearColor( 0xffffff, 1 );
		renderer.setPixelRatio( window.devicePixelRatio );

		var models = [
			Rhino,
			Elephant,
			Giraffe,
			Gator,
			Scorpion,
			Bird,
			Wavid,
			Max,
			Horse,
			Skull,
			Helmet
		];

		var content = document.getElementById('scenes');

		for ( var i =  0; i < models.length; i ++ ) {

			var element = document.createElement('div');
			element.className = 'list-item';

			var sceneEl = document.createElement('div');
			sceneEl.className = 'scene';

			var scene = new models[i]( sceneEl );
			scenes.push( scene );

			var title = document.createElement('div');
			title.className = 'title';
			title.innerHTML = scene.name;

			element.appendChild( sceneEl );
			// element.appendChild( title );
			content.appendChild( element );

			var full = document.createElement('div');
			full.className = 'full-toggle';
			var icon = document.createElement('icon');
			icon.className = 'fas fa-lg fa-search-plus';;
			full.appendChild( icon );
			element.appendChild( full );

			scene.userData.icon = icon;

			var mouseup = function(s){
				return function() {

					if ( window.gtag ) {
						var action = fullScene ? 'minimize' : 'maximize';
						gtag('event', action, {
							'event_category': 'Scenes',
							'event_label': s.name
						});
					}

					if ( fullScene ) {

						fullScene.userData.element.parentNode.classList.remove('full');

						fullScene.userData.icon.classList.remove('fa-search-minus');
						fullScene.userData.icon.classList.add('fa-search-plus');

						fullScene = null;

						scenes.forEach(function(scene){
							scene.userData.element.parentNode.removeAttribute('style');
						});

					} else {

						fullScene = s;

						scenes.forEach(function(scene){
							scene.userData.element.parentNode.style.display = 'none';
						});

						s.userData.element.parentNode.style.display = 'inline-block';
						s.userData.element.parentNode.classList.add('full');

						s.userData.icon.classList.remove('fa-search-plus');
						s.userData.icon.classList.add('fa-search-minus');

					}
				}
			}( scene );

			full.addEventListener('mouseup', mouseup, false);

		}

		var settings = {
			wireframe: false,
			skeletons: false,
			rotate: true,
			speed: 10
		};


		var applyDown = function( obj, key, value ){

			if (obj.isMesh) obj.material[ key ] = value

			if( obj.children !== undefined && obj.children.length > 0 ){

				obj.children.forEach( function( child ){

					applyDown( child, key, value )
				})
			}
		};

		gui.add(settings, 'wireframe').onChange(function(val){
			scenes.forEach(function(scene){
				applyDown( scene.userData.group, 'wireframe', val );
			});
		});

		gui.add(settings, 'skeletons').onChange(function(val){
			for ( var i = 0; i < skeletons.length; i++) {
				skeletons[i].visible = val;
			}
		});

		gui.add(settings, 'rotate').onChange(function(val){
			scenes.forEach(function(scene){
				scene.userData.controls.autoRotate = val;
			});
		});

		gui.add(settings, 'speed', 2, 20).onChange(function(val){
			scenes.forEach(function(scene){
				scene.userData.controls.autoRotateSpeed = val;
			});
		});

	}

	function updateSize() {

		var width = canvas.clientWidth;
		var height = canvas.clientHeight;

		if ( canvas.width !== width || canvas.height != height ) {

			renderer.setSize( width, height, false );

		}

	}

	function loop() {

		requestAnimationFrame( loop );

		var delta = clock.getDelta();
		var time = clock.getElapsedTime();

		updateSize();

		renderer.setClearColor( 0xffffff );
		renderer.setScissorTest( false );
		renderer.clear();

		renderer.setClearColor( 0xe0e0e0 );
		renderer.setScissorTest( true );

		scenes.forEach( function( scene ) {

			// so something moves
			// scene.userData.group.rotation.y = Date.now() * 0.001;

			// get the element that is a place holder for where we want to draw the scene
			var element = scene.userData.element;

			// get its position relative to the page's viewport
			var rect = element.getBoundingClientRect();

			// check if it's offscreen. If so skip it
			if ( rect.bottom < 0 || rect.top  > renderer.domElement.clientHeight ||
				 rect.right  < 0 || rect.left > renderer.domElement.clientWidth ||
				 element.parentNode.style.display == 'none' ) {

				return;  // it's off screen

			}

			// set the viewport
			var width  = rect.right - rect.left;
			var height = rect.bottom - rect.top;
			var left   = rect.left;
			var top    = rect.top;

			renderer.setViewport( left, top, width, height );
			renderer.setScissor( left, top, width, height );

			var camera = scene.userData.camera;

			// changes when a scene goes fullscreen
			camera.aspect = width / height;
			camera.updateProjectionMatrix();

			scene.userData.controls.update();

			if ( scene.userData.update ) {
				scene.userData.update( time );
			}

			renderer.render( scene, camera );

		} );

	}

})();