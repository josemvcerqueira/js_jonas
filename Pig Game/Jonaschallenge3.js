let bill = [ 124, 48, 268 ];

// Create an array of the tips
function tip( n ) {
	let tipArray = [];
	for ( i = 0; i < n.length; i++ ) {
		if ( n[ i ] < 50 ) {
			tipArray[ i ] = n[ i ] * ( 20 / 100 );
		} else if ( n[ i ] >= 50 && n[ i ] < 200 ) {
			tipArray[ i ] = n[ i ] * ( 15 / 100 );
		} else {
			tipArray[ i ] = n[ i ] * ( 10 / 100 );
		}
	}
	return tipArray;
}

// Console Log the Tips in an array
let tips = tip( bill );
console.log( tips );

// Create an array of the tips + initial amount
function totalAmount( n ) {
	let amountArray = [];
	for ( i = 0; i < n.length; i++ ) {
		if ( n[ i ] < 50 ) {
			amountArray[ i ] = ( n[ i ] * ( 20 / 100 ) ) + n[ i ];
		} else if ( n[ i ] >= 50 && n[ i ] < 200 ) {
			amountArray[ i ] = ( n[ i ] * ( 15 / 100 ) ) + n[ i ];
		} else {
			amountArray[ i ] = ( n[ i ] * ( 10 / 100 ) ) + n[ i ];
		}
	}
	return amountArray;
}

// Console Log the total in an array
let total = totalAmount( bill );
console.log( total );
