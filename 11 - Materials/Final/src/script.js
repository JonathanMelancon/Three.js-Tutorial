import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/Addons.js'

// Debug

const gui = new GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Lights

// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff,30)
// scene.add(pointLight)
// pointLight.position.set(2,3,4)

// Environnement Map

const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) =>
{
    environmentMap.mapping= THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
})

// Texture



const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbiantOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRougnessTexture = textureLoader.load('./textures/door/roughness.jpg')

const matCapTexture = textureLoader.load('./textures/matcaps/7.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

// const myMaterial = new THREE.MeshBasicMaterial()
// myMaterial.map = doorColorTexture
// myMaterial.color = new THREE.Color('Red')
// myMaterial.wireframe = true
// myMaterial.transparent = true
// myMaterial.opacity = 0.5
// myMaterial.alphaMap = doorAlphaTexture
// myMaterial.side = THREE.DoubleSide

// const myMaterial = new THREE.MeshNormalMaterial
// myMaterial.side = THREE.DoubleSide
// myMaterial.flatShading = true

// const myMaterial = new THREE.MeshMatcapMaterial()
// myMaterial.matcap = matCapTexture

// const myMaterial = new THREE.MeshLambertMaterial()

// const myMaterial = new THREE.MeshPhongMaterial()
// myMaterial.shininess = 100
// myMaterial.specular = new THREE.Color(0xFF00FF)

// const myMaterial = new THREE.MeshStandardMaterial()
// myMaterial.side = THREE.DoubleSide
// myMaterial.roughness = 1
// myMaterial.metalness = 1
// myMaterial.map = doorColorTexture
// myMaterial.aoMap = doorAmbiantOcclusionTexture
// myMaterial.aoMapIntensity = 1
// myMaterial.displacementMap = doorHeightTexture
// myMaterial.displacementScale = 0.05
// myMaterial.roughnessMap = doorRougnessTexture
// myMaterial.metalnessMap = doorMetalnessTexture
// myMaterial.normalMap = doorNormalTexture
// myMaterial.normalScale.set(0.5,0.5)
// myMaterial.transparent = true
// myMaterial.alphaMap = doorAlphaTexture




// gui.add(myMaterial, 'metalness').min(0).max(1).step(0.0001)
// gui.add(myMaterial, 'roughness').min(0).max(1).step(0.0001)

const myMaterial = new THREE.MeshPhysicalMaterial()
myMaterial.side = THREE.DoubleSide
myMaterial.roughness = 1
myMaterial.metalness = 1
myMaterial.map = doorColorTexture
myMaterial.aoMap = doorAmbiantOcclusionTexture
myMaterial.aoMapIntensity = 1
myMaterial.displacementMap = doorHeightTexture
myMaterial.displacementScale = 0.05
myMaterial.roughnessMap = doorRougnessTexture
myMaterial.metalnessMap = doorMetalnessTexture
myMaterial.normalMap = doorNormalTexture
myMaterial.normalScale.set(0.5,0.5)
myMaterial.transparent = true
myMaterial.alphaMap = doorAlphaTexture

// myMaterial.clearcoat = 1
// myMaterial.clearcoatRoughness = 0

myMaterial.transmission =1
myMaterial.ior = 1.5
myMaterial.thickness = 0.5


gui.add(myMaterial, 'metalness').min(0).max(1).step(0.0001)
gui.add(myMaterial, 'roughness').min(0).max(1).step(0.0001)
gui.add(myMaterial, 'clearcoat').min(0).max(1).step(0.0001)
gui.add(myMaterial, 'clearcoatRoughness').min(0).max(1).step(0.0001)

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matCapTexture.colorSpace = THREE.SRGBColorSpace

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matCapTexture.colorSpace = THREE.SRGBColorSpace



// Geometries

const mySphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    myMaterial,
)

const myPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1,100,100),
    myMaterial,
)

const myTorus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    myMaterial,
)

mySphere.position.x = -1.5
myTorus.position.x = 1.5


/**
 * Camera
 */

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

scene.add(mySphere, myPlane, myTorus)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    const xRotation = -0.15
    const yRotation = 0.1

    myPlane.rotation.y = yRotation * elapsedTime
    myPlane.rotation.y = yRotation * elapsedTime
    mySphere.rotation.y = yRotation * elapsedTime

    myTorus.rotation.x = xRotation * elapsedTime
    myPlane.rotation.x = xRotation * elapsedTime
    mySphere.rotation.x = xRotation * elapsedTime
  


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()