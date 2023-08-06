const THREE = window.THREE;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var material = new THREE.LineBasicMaterial({
  color: 0xffffff,
  linewidth: 5
});

const points = [];
  points.push(new THREE.Vector3(-5, -5, -5));
  points.push(new THREE.Vector3(5, -5, -5));
  points.push(new THREE.Vector3(5, 5, -5));
  points.push(new THREE.Vector3(-5, 5, -5));
  points.push(new THREE.Vector3(-5, -5, -5));
  points.push(new THREE.Vector3(-5, -5, 5));
  points.push(new THREE.Vector3(5, -5, 5));
  points.push(new THREE.Vector3(5, -5, -5));
  points.push(new THREE.Vector3(5, -5, 5));
  points.push(new THREE.Vector3(5, 5, 5));
  points.push(new THREE.Vector3(-5, 5, 5));
  points.push(new THREE.Vector3(-5, -5, 5));
  points.push(new THREE.Vector3(-5, 5, 5));
  points.push(new THREE.Vector3(-5, 5, -5));
  points.push(new THREE.Vector3(5, 5, -5));
  points.push(new THREE.Vector3(5, 5, 5));

var geometry = new THREE.BufferGeometry().setFromPoints(points);
var line = new THREE.Line(geometry, material);


const group = new THREE.Group();

group.add(line);
scene.add(group);

camera.position.z = 20;

const animate = function() {
  requestAnimationFrame(animate);
  //group.rotation.x += 0.01;
  group.rotation.y += 0.01;

  renderer.render(scene, camera);
};

window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

animate();

// Instantiate a loader
const loader = new THREE.GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new THREE.DRACOLoader();
dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

// Load a glTF resource
loader.load(
	// resource URL
	'https://cdn.glitch.global/9184d289-4336-406e-bb87-d3c5ec60a51f/mateo.glb?v=1661982199918',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);