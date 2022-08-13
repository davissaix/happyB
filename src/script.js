import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import{FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import { AxesHelper } from 'three'
/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')

//fonts 
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Feliz Cumple Pa',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4   
            }
        )
        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     -(textGeometry.boundingBox.max.x-0.02) * 0.5,
        //     -(textGeometry.boundingBox.max.y-0.02) * 0.5,
        //     -(textGeometry.boundingBox.max.z-0.03) * 0.5
        // )  
        textGeometry.center()  

        // const material = new THREE.MeshMatcapMaterial()
        // material.matcap = matcapTexture
        // textMaterial.wireframe = false
        // const donutGeometry = new THREE.TorusBufferGeometry(0.3,0.2,20,45)
        
        
        
        
        const items = ['red', 'blue', 'yellow', 'orange', 'pink', 'pink']
        
        for (let i = 0; i < 300; i++){
            const material = new THREE.MeshMatcapMaterial({
                // matcap:matcapTexture,
                // color:'red'
            
            })
            const text = new THREE.Mesh(textGeometry, material)
            // const donut = new THREE.Mesh(donutGeometry, material)
            let item = items[Math.floor(Math.random()*items.length)];
            material.color = new THREE.Color(item)

            // donut.position.x = (Math.random() - 0.5) * 10
            // donut.position.y = (Math.random() - 0.5) * 10
            // donut.position.z = (Math.random() - 0.5) * 10
            // donut.rotation.y = Math.random() * Math.PI
            // donut.rotation.z = Math.random() * Math.PI
            // const scale = Math.random()
            // donut.scale.x = scale
            // donut.scale.y = scale
            // donut.scale.z = scale
            scene.add(text)
            // scene.add(donut)
        }
    }
)

//axisHelper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

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
for (let i = 0; i < 300; i++){
    const material = new THREE.MeshMatcapMaterial({
        matcap:matcapTexture,
        // color:'red'
    
    })

    const items = ['red', 'blue', 'yellow', 'orange', 'pink', 'pink']
    const donutGeometry = new THREE.TorusBufferGeometry(0.3,0.2,20,45)
    const donut = new THREE.Mesh(donutGeometry, material)
    let item = items[Math.floor(Math.random()*items.length)];
    material.color = new THREE.Color(item)

    var precision = 100; // 2 decimals
    var randomnum = Math.floor(Math.random() * 
    (10 * precision - 1 * precision) + 1 * precision) / (1*precision)

    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10
    donut.rotation.y = Math.random() * Math.PI
    donut.rotation.z = Math.random() * Math.PI
    const scale = Math.random()
    donut.scale.x = scale
    donut.scale.y = scale
    donut.scale.z = scale
    
    scene.add(donut)
    const clock = new THREE.Clock()
    const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    
    
    donut.rotation.x = (elapsedTime * randomnum + randomnum ) 
    // donut.rotation.y = (elapsedTime + randomnum) * scale
    // donut.rotation.z = (elapsedTime + randomnum)* scale

    //animation donut
    // donut.rotation.x = elapsedTime
   
        // Update controls
    // controls.update()

    // Render
    // renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
    
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

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

    //animation donut
    // donut.rotation.x = elapsedTime
   
        // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()