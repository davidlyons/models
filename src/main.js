if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

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
			rotate: false,
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