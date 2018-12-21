// Create an object
function info( fullName, mass, height, BMI ) {
	this.fullName = fullName;
	this.mass = mass;
	this.height = height;
	this.BMI = BMI;
}

// Assign value to objects jonas & jose
let jonas = new info( `Jonas Schmedtmann`, 60, 1.85, function () {
	this.BMI = this.mass / ( this.height ** 2 );
	return this.BMI;
} );

let jose = new info( `Jose Cerqueira`, 80, 1.79, function () {
	this.BMI = this.mass / ( this.height ** 2 );
	return this.BMI;
} );

// Log on the console who has the higher BMI
function higherBMI( jonasBMI, joseBMI, fullNameJonas, fullNameJose ) {
	switch ( jonasBMI > 0 && joseBMI > 0 ) {
	case jonasBMI > joseBMI:
		console.log( fullNameJonas + " has a higher BMI of " + jonasBMI );
		break;
	case joseBMI > jonasBMI:
		console.log( fullNameJose + " has a higher BMI of " + joseBMI );
		break;
	default:
		console.log( "It seems they have the same BMI!" );
	};
}

higherBMI( jonas.BMI(), jose.BMI(), jonas.fullName, jose.fullName );
