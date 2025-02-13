import * as THREE from 'three'


console.log('Javascript ok')
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Helpers

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Objects

const geometry = new THREE.BoxGeometry(1, 1, 1)

const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const material2 = new THREE.MeshBasicMaterial({color: 0x00ff00})

const mesh = new THREE.Mesh(geometry, material)
const mesh2 = new THREE.Mesh(geometry, material2)

const group = new THREE.Group()

const sphere1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5,0.5,0.5),
    new THREE.MeshBasicMaterial({color: 0x0000ff})
)

sphere1.position.set(0.5,-0.5,0.5)

group.add(sphere1)

scene.add(mesh)
scene.add(mesh2)
scene.add(group)

mesh.position.set(1,1,1)

// console.log("Distance between mesh and center of scene is " +  mesh.position.length())


//Size

const sizes = {
    width: 800,
    height: 600
}

// Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0,1,3)
scene.add(camera)

camera.lookAt(mesh.position)

// console.log("Distance between mesh and camera is " + mesh.position.distanceTo(camera.position))

// mesh.position.normalize() /** Reduce vector length to 1 */

// console.log("Normalized")
// console.log("Distance between mesh and center of scene is " +  mesh.position.length())
// console.log("Distance between mesh and camera is " + mesh.position.distanceTo(camera.position))

// mesh.position.set(0,0,0) /**Is another way of setting 3D object position */
// mesh.scale.set(0.5,0.5,0.5)

mesh.rotation.reorder('ZXY')

mesh.rotation.z = Math.PI/4
mesh.rotation.y = Math.PI/4

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)