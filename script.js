class Infrastructure {
	constructor( name, buildYear ) {
		this.name = name;
		this.buildYear = buildYear;
	}
}

class Park extends Infrastructure {
	constructor( name, buildYear, numberOfTrees, parkArea ) {
		super( name, buildYear );
		this.numberOfTrees = numberOfTrees;
		this.parkArea = parkArea;
	}

	treeDensity() {
		let density = parseFloat( this.numberOfTrees / this.parkArea )
			.toFixed( 2 );
		return `${this.name} has a tree density of ${density} trees per square km.`;
	}

	age() {
		const currentYear = new Date();
		return currentYear.getFullYear() - this.buildYear;
	}

	thousand() {
		if ( this.numberOfTrees >= 1000 ) {
			console.log( `${this.name} has more than 1000 trees.` );
		} else null;
	}
}

class Street extends Infrastructure {
	constructor( name, buildYear, ln, size = 2 ) {
		super( name, buildYear );
		this.ln = ln;
		this.size = size;
	}
}

const greenPark = new Park( "Green Park", 1965, 700, .6 );
const nationalPark = new Park( "National Park", 1910, 1300, 1.1 );
const oakPark = new Park( "Oak Park", 1980, 560, .25 );

const oceanAvenue = new Street( "Ocean Avenue", 1999, 2.5, 3 );
const evergreenStreet = new Street( "Evergreen Street", 2000, 0.8, 1 );
const _4thStreet = new Street( "4th Street", 2015, 1 );
const sunset = new Street( "Sunset Boulevard", 1982, 3.3, 4 );

const infra = new Map();
infra.set( "parks", {
	age: [ greenPark.age(), nationalPark.age(), oakPark.age() ],
	density: [ greenPark.treeDensity(), nationalPark.treeDensity(), oakPark.treeDensity() ]
} );
infra.set( "streets", {
	ln: [ oceanAvenue.ln, evergreenStreet.ln, _4thStreet.ln, sunset.ln ],
	size: [ "tiny", "small", "normal", "big", "huge" ]
} );

const parks = infra.get( "parks" );
const streets = infra.get( "streets" );

const total = ( a, b, c, d ) => a + b + c + d;

const average = ( arr ) => {
	let sum = 0;
	arr.forEach( curr => sum += curr );
	return sum / arr.length;
};

const sizeClass = ( obj ) => {
	console.log( `${obj.name}, built in ${obj.buildYear}, is a ${streets.size[obj.size]} street.` );
};

const report = ( arr ) => {
	console.log( `-----Parks Report-----
Our ${parks.density.length} parks have an average age of ${average(parks.age)} years.` );
	arr.forEach( curr => console.log( curr ) )
	greenPark.thousand();
	nationalPark.thousand();
	oakPark.thousand();
	console.log( `-----Streets Report-----
Our ${streets.ln.length} streets have a total length of ${total(...streets.ln)} km, with an average of ${average(streets.ln)} km.` )
	sizeClass( oceanAvenue );
	sizeClass( evergreenStreet );
	sizeClass( _4thStreet );
	sizeClass( sunset );
};

report( parks.density );
