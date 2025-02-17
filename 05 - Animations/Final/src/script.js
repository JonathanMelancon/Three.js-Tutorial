import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube1 = new THREE.Mesh(geometry, material)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x0000ff})
)

scene.add(cube1)
cube1.position.x = -1.5

scene.add(cube2)
cube2.position.x = 1.5

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height)
camera.position.z = 10
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


/**Exemple with clock
 * 
 * We first initiate the clock with new THREE.Clock()
 * We calculate the elapsed time twith clock.getElapsedTime
 * Since this number is always growing (incrementing), we use it directly as a 3D Objet transformation multiplier
 */

const clock = new THREE.Clock()

const tick2 = () => // const tick2 = A Function and return nothing
{   
    const elapsedTime = clock.getElapsedTime()

    // console.log(deltaTime)

    //Update Objects
    cube2.position.y = Math.cos(elapsedTime)
    cube2.rotation.y = elapsedTime
    
    //Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick2)
}

tick2()

/**
 * Exemple with time
 * 
 * We ask the computer to get the current time a first time with let time = Date.now()
 * We ask the computer to get it again with currentTime = Date.now()
 * We calculate the difference between the two times.
 * A fast computer will result in a smaller delta time, a slower computer will result in a bigger delta time.
 * By multiplying the delta time with the object transformation multiplier (0.001), the computer speed cancels out.
 * Thus, the animation will appear the same on fast or slow machines.
 * Since deltaTime is a constant (almost), we must increment it by another value to create mouvement (0.001)
 */

let time = Date.now()
let animation = 0
// Animation

const tick = () => // const tick = A Function and return nothing
{   
    //Time
    const currentTime= Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    // console.log(deltaTime)

    //Update Objects

   
    
    animation += 0.001 * deltaTime
    // console.log(animation)
    cube1.position.y = Math.sin(animation)
    cube1.rotation.y += 0.001 * deltaTime

    // console.log(0.01*deltaTime)
    //Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()

/** En of exemple with time */