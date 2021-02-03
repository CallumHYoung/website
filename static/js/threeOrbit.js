let orbitalShowcase = null;
let renderer = null;

let scene, camera = null;

let textures = [];
let geometries = [];
let meshes = [];

let earthMesh;
let earthLineMesh;

function initScene(){
    // orbitalShowcase = document.createElement('div');
    // // orbitalShowcase.style.height = "80vh";
    // orbitalShowcase.classList.add("showcase");
    // document.getElementById("showcaseSection").appendChild(orbitalShowcase);
    orbitalShowcase = document.getElementById("showcaseSection");
    var containerPositionInfo = orbitalShowcase.getBoundingClientRect()

    renderer = new THREE.WebGLRenderer();
    orbitalShowcase.append(renderer.domElement);

    camera = new THREE.PerspectiveCamera(75, containerPositionInfo.width / containerPositionInfo.height, 1, 1000);
    camera.aspect = containerPositionInfo.width / containerPositionInfo.height;
    camera.position.set(0, 0, 50);
    camera.updateProjectionMatrix();
    renderer.setSize( containerPositionInfo.width, containerPositionInfo.height );

    scene = new THREE.Scene();

    const light = new THREE.PointLight( 0xff0000, 1, 100 );
    light.position.set( 50, 50, 50 );
    scene.add( light );

    let earthGeo = new THREE.SphereBufferGeometry(50, 50, 50);
    let wireframeGeo = new THREE.WireframeGeometry(earthGeo);
    let earthMat = new THREE.LineBasicMaterial( {
        "color": 0x3383FF,
        "linewidth": 1
    });

    earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthLineMesh = new THREE.LineSegments( wireframeGeo );
    earthLineMesh.material.depthTest = false;
    earthLineMesh.material.opacity = 0.25;
    earthLineMesh.material.transparent = true;

    earthMesh.position.set(-35, 0, -100);
    earthMesh.scale.set(0.98, 0.98, 0.98);
    earthLineMesh.position.set(-35, 0, -100);

    meshes.push(earthMesh);
    scene.add(earthMesh);
    scene.add(earthLineMesh);

    let dotCount = 1000;
    const vector = new THREE.Vector3();
    const dotGeometry = new THREE.CircleGeometry(2, 5);
    const dotMaterial = new THREE.MeshPhongMaterial({color: 0x0fab6c});

    for(let i = dotCount; i >= 0; --i){
        const phi = Math.acos(-1 + (2 * i) / dotCount);
        const theta = Math.sqrt(dotCount * Math.PI) * phi;

        vector.setFromSphericalCoords(600, phi, theta);
        dotGeometry.lookAt(vector);
        dotGeometry.translate(vector.x, vector.y, vector.z);
        let circle = new THREE.Mesh(dotGeometry, dotMaterial);
        scene.add(circle);
    }
}

function renderUpdate(){
    earthMesh.rotation.y += 0.001;
    earthLineMesh.rotation.y += 0.001;

    renderer.render(scene, camera);
    requestAnimationFrame(renderUpdate);
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    var containerPositionInfo = orbitalShowcase.getBoundingClientRect()
    camera.aspect = containerPositionInfo.width / containerPositionInfo.height;
    camera.updateProjectionMatrix();

    renderer.setSize( containerPositionInfo.width, containerPositionInfo.height );
}


initScene();
renderUpdate();