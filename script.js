import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Sky } from 'three/addons/objects/Sky.js'

const canvas = document.querySelector('canvas.webgl');

const sizes = { width: 800, height: 600 };
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 100;
camera.position.x = -90;

// Add road
const road = new THREE.Mesh(
  new THREE.PlaneGeometry(140, 2000),
  new THREE.MeshBasicMaterial({
    color: "slategray",
    transparent: true,
    side: THREE.DoubleSide
  })
);

road.rotation.x = Math.PI / 2;
road.position.y = -30;
scene.add(road);

// Add car group
const car = new THREE.Group();
scene.add(car);

const geometry = new THREE.BoxGeometry(40, 4, 1);
const material = new THREE.MeshPhongMaterial({ color: "red" });
const frontlights = new THREE.Mesh(geometry, material);
car.add(frontlights);

const hood = new THREE.Mesh(
  new THREE.BoxGeometry(90, 20, 90),
  new THREE.MeshPhongMaterial({ 
    color: "black",
    side: THREE.DoubleSide
  })
);
hood.position.z = -45;
hood.position.y = -5;
car.add(hood);

const body = new THREE.Mesh(
  new THREE.BoxGeometry(90, 40, 90),
  new THREE.MeshPhongMaterial({ 
    color: "black",
    side: THREE.DoubleSide
  })
);
body.position.z = -90;
body.position.y = 5;
car.add(body);

const wheel1 = new THREE.Mesh(
  new THREE.CylinderGeometry(15, 15, 15),
  new THREE.MeshPhongMaterial({ 
    color: "red",
    side: THREE.DoubleSide
  })
);

wheel1.rotation.z = Math.PI / 2;
wheel1.position.y = -14;
wheel1.position.x = 40.1;
wheel1.position.z = -35;
car.add(wheel1);

const wheel2 = new THREE.Mesh(
  new THREE.CylinderGeometry(15, 15, 15),
  new THREE.MeshPhongMaterial({ 
    color: "red",
    side: THREE.DoubleSide
  })
);

wheel2.rotation.z = Math.PI / 2;
wheel2.position.y = -14;
wheel2.position.x = -40.1;
wheel2.position.z = -35;
car.add(wheel2);

const wheel3 = new THREE.Mesh(
  new THREE.CylinderGeometry(15, 15, 15),
  new THREE.MeshPhongMaterial({ 
    color: "red",
    side: THREE.DoubleSide
  })
);

wheel3.rotation.z = Math.PI / 2;
wheel3.position.y = -14;
wheel3.position.x = -40.1;
wheel3.position.z = -120;
car.add(wheel3);

const wheel4 = new THREE.Mesh(
  new THREE.CylinderGeometry(15, 15, 15),
  new THREE.MeshPhongMaterial({ 
    color: "red",
    side: THREE.DoubleSide
  })
);

wheel4.rotation.z = Math.PI / 2;
wheel4.position.y = -14;
wheel4.position.x = 40.1;
wheel4.position.z = -120;
car.add(wheel4);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.z = 8;
directionalLight.position.x = 4;
directionalLight.position.y = 4;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xff0000, .4);
car.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 9);
pointLight.position.z = 2;
pointLight.position.x = 0;
scene.add(pointLight);

// Sky
const sky = new Sky();
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)
sky.scale.set(1000, 1000, 1000);
scene.add(sky);

// Fog
scene.fog = new THREE.Fog('#16333e', 100, 800);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height);

const controls = new OrbitControls(camera, renderer.domElement);

let right = true;
function move() {
  if (right) {
    pointLight.position.x += 1;
  } else {
    pointLight.position.x -= 1;
  }
  if (pointLight.position.x === 20 || pointLight.position.x === -20) {
    right = !right;
  }
}
function tick() {
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
  move();
  console.log(pointLight.position.x);

}

tick();
