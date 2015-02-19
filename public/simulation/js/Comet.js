// object
var Comet = function(position, color){
	// visuals
	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff
	});
	var mesh = new THREE.Mesh(Comet.geometry, material);
	mesh.position.set(position.x, position.y, position.z);
	mesh.material.color.setRGB(color.r, color.g, color.b);

	// point light
	var light = new THREE.PointLight(0x000000, 1, 5000);
	light.color.setRGB(color.r, color.g, color.b);
	light.position.set(position.x, position.y, position.z);

	// physics
	var sphereBody = new CANNON.Body({
		mass: 5,
		position: new CANNON.Vec3(position.x, position.y, position.z),
		shape: new CANNON.Sphere(Comet.radius),
		velocity: Comet.velocity
	});

	this.getLight = function(){
		return light;
	};

	this.getMesh = function(){
		return mesh;
	};

	this.getBody = function () {
		return sphereBody;
	};

	this.updatePosition = function() {
		var pos = sphereBody.position;
		light.position.set(pos.x, pos.y, pos.z);
		mesh.position.copy(pos);
		mesh.quaternion.copy(sphereBody.quaternion);
	};
};

// static variables
Comet.radius = 10;
Comet.geometry = new THREE.SphereGeometry(Comet.radius, 12, 12);
Comet.velocity = new CANNON.Vec3(0,0,-100);
