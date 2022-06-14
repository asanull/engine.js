<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
</head>
<style>
    #toggle {
        position: fixed;
        top: 24px;
        right: 24px;
        z-index: 999;
        background: #222;
        width: 17.5%;
        border-radius: 10px;
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        padding: 1%;
        cursor: pointer;
        user-select: none;
    }
</style>
<body>
    <div id="toggle">
        Switch Perspective
    </div>
</body>
<script src="https://cdn.jsdelivr.net/gh/asanull/engine.js/engine.js"></script>
<script type="text/javascript">
    let camera = {}
    engine.ready.callback = () => {
        engine.js().then(() => {
            let scene = new THREE.Scene()               // create a new scene
        
            let aspect = window.innerWidth / window.innerHeight;
            let d = 20;
            camera.orthographic = new THREE.OrthographicCamera(
                -d * aspect,                            // left, right, top, bottom, near, far
                d * aspect,
                d,
                -d,
                1,
                1000
            )
            camera.orthographic.position.set(20, 20, 20) // set the camera position
            camera.orthographic.lookAt(scene.position)   // look at the center of the scene

            camera.perspective = new THREE.PerspectiveCamera(
                75,                                     // fov, aspect, near, far
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            )
            camera.perspective.position.set(20, 20, 20) // set the camera position
            camera.perspective.lookAt(scene.position)   // look at the center of the scene

            engine.load(scene, 'myScene')               // load the scene into the engine
            engine.add(                                 // add the orthographic camera to the scene
                camera.orthographic,
                'OrthographicCamera'
            )
            engine.add(                                 // add the perspective camera to the scene
                camera.perspective,
                'PerspectiveCamera'
            )

            const gridHelper = new THREE.GridHelper(    // create a grid helper
                100,
                10
            )
            engine.load(gridHelper)
            
            let object = engine.object(                 // create a new object
                new THREE.BoxGeometry(10, 10, 10),
                new THREE.MeshBasicMaterial({ color: 'white', wireframe: true }),
                'myCube'
            )
            object.position.set(0, .1, 0)               // set the position of the object
            engine.add(object, 'myCube')                // add the object to the scene

            engine.update = () => {                     // rotate the object for each frame
                object.rotation.x += 0.01
                object.rotation.y += 0.01
            }
        })
    }
</script>
<script>
    let state = true                                    // set the initial state of the toggle
    function switchCamera() {                           // function to switch the camera
        switch (state) {
            case true:engine.camera = camera.orthographic;break;
            default:engine.camera = camera.perspective
        }
        state = !state
    }
    document.getElementById('toggle')                   // add the event listener to the toggle
        .addEventListener('click', switchCamera)
</script>
</html>
