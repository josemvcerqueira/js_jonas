let mikeTeam, johnTeam, maryTeam, mikeAvg, johnAvg, maryAvg;

mikeTeam = [ 116, 94, 123 ];
johnTeam = [ 89, 120, 103 ];
maryTeam = [ 97, 134, 105 ];

function average( numbers ) {
	let sum = 0;
	for ( i = 0; i < numbers.length; i++ ) {
		sum += numbers[ i ];
	}
	return sum / numbers.length;
}

mikeAvg = average( mikeTeam );
johnAvg = average( johnTeam );
maryAvg = average( maryTeam );

console.log( `Mike's average is ${mikeAvg}.
John's average is ${johnAvg}.
Mary's average is ${maryAvg}.` )

function winner() {
	if ( mikeAvg > johnAvg && mikeAvg > maryAvg ) {
		console.log( "Mike is the winner!" );
	} else if ( johnAvg > mikeAvg && johnAvg > maryAvg ) {
		console.log( "John is the winner!" );
	} else if ( maryAvg > mikeAvg && maryAvg > johnAvg ) {
		console.log( "Mary is the winner!" );
	} else {
		console.log( "There is a draw!" );
	}
}

console.log( winner() );
