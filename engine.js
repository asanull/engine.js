let three = {}
let engine = {
    ready: {},
    loaded: {}
}
three.loaded = new Promise(resolve => three.ready = resolve)
engine.ready.scene = new Promise(resolve => engine.loaded.scene = resolve)
engine.ready.camera = new Promise(resolve => engine.loaded.camera = resolve)
import('/three.js').then(async () => three.ready())
engine.js = async function () {
    await three.loaded
    let canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    engine.scene = new THREE.Scene()
    engine.renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });

    engine.renderer.setPixelRatio(window.devicePixelRatio);
    engine.renderer.shadowMap.enabled = true;
    engine.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    async function animate() {
        requestAnimationFrame(animate)
        if (engine.scene !== undefined && engine.camera !== undefined) {
            await engine.ready.scene
            await engine.ready.camera
            let d = 20;
            engine.renderer.setSize(window.innerWidth, window.innerHeight);
            aspect = window.innerWidth / window.innerHeight;
            engine.camera.left = -d * window.innerWidth / window.innerHeight;
            engine.camera.right = d * window.innerWidth / window.innerHeight;
            engine.camera.updateProjectionMatrix()
            engine.renderer.render(engine.scene, engine.camera);
        }
    }
    animate();
}
engine.load = async function (name, object) {
    if (typeof name === 'string') {
        if (object instanceof THREE.Scene) {
            object.name = name
            engine.scene = object
            engine.loaded.scene()

        } else if (object instanceof THREE.Camera) {
            object.name = name
            engine.camera = object
            engine.loaded.camera()

        } else if (object instanceof THREE.Light) {
            console.log('engine.js [LOAD LIGHT]')
        }
    } else console.log('name is not good enough')
}
var map = {}
onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
}
engine.getKey = function (character) {
    let key = {
        character: character.toLowerCase(),
        code: undefined
    }
    switch (key.character) {
        case 'a':key.code = 65;break;
        case 'b':key.code = 66;break;
        case 'c':key.code = 67;break;
        case 'd':key.code = 68;break;
        case 'e':key.code = 69;break;
        case 'f':key.code = 70;break;
        case 'g':key.code = 71;break;
        case 'h':key.code = 72;break;
        case 'i':key.code = 73;break;
        case 'j':key.code = 74;break;
        case 'k':key.code = 75;break;
        case 'l':key.code = 76;break;
        case 'm':key.code = 77;break;
        case 'n':key.code = 78;break;
        case 'o':key.code = 79;break;
        case 'p':key.code = 80;break;
        case 'q':key.code = 81;break;
        case 'r':key.code = 82;break;
        case 's':key.code = 83;break;
        case 't':key.code = 84;break;
        case 'u':key.code = 85;break;
        case 'v':key.code = 86;break;
        case 'w':key.code = 87;break;
        case 'x':key.code = 88;break;
        case 'y':key.code = 89;break;
        case 'z':key.code = 90;break;
        case '0':key.code = 48;break;
        case '1':key.code = 49;break;
        case '2':key.code = 50;break;
        case '3':key.code = 51;break;
        case '4':key.code = 52;break;
        case '5':key.code = 53;break;
        case '6':key.code = 54;break;
        case '7':key.code = 55;break;
        case '8':key.code = 56;break;
        case '9':key.code = 57;break;
        case ' ':key.code = 32;break;
        case '!':key.code = 33;break;
        case '"':key.code = 34;break;
        case '#':key.code = 35;break;
        case '$':key.code = 36;break;
        case '%':key.code = 37;break;
        case '&':key.code = 38;break;
        case '\'':key.code = 39;break;
        case '(':key.code = 40;break;
        case ')':key.code = 41;break;
        case '*':key.code = 42;break;
        case '+':key.code = 43;break;
        case ',':key.code = 44;break;
        case '-':key.code = 45;break;
        case '.':key.code = 46;break;
        case '/':key.code = 47;break;
        case ':':key.code = 58;break;
        case ';':key.code = 59;break;
        case '<':key.code = 60;break;
        case '=':key.code = 61;break;
        case '>':key.code = 62;break;
        case '?':key.code = 63;break;
        case '@':key.code = 64;break;
        case '[':key.code = 91;break;
        case '\\':key.code = 92;break;
        case ']':key.code = 93;break;
        case '^':key.code = 94;break;
        case '_':key.code = 95;break;
        case '`':key.code = 96;break;
        case '{':key.code = 123;break;
        case '|':key.code = 124;break;
        case '}':key.code = 125;break;
        case '~':key.code = 126;break;
        default: key.code = undefined;
    }
    if (map[key.code] === true) return true
    else return false
}