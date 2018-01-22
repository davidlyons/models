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

};