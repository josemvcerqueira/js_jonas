//Part 1
let johnBill = {
	bills: [ 124, 48, 268, 180, 42 ],
	calcTip: function () {
		let tipArray = [],
			totalArray = [];
		for ( i = 0; i < this.bills.length; i++ ) {
			if ( this.bills[ i ] < 50 ) {
				tipArray[ i ] = this.bills[ i ] * .20;
				totalArray[ i ] = tipArray[ i ] + this.bills[ i ];
			} else if ( this.bills[ i ] >= 50 && this.bills[ i ] <= 200 ) {
				tipArray[ i ] = this.bills[ i ] * .15;
				totalArray[ i ] = tipArray[ i ] + this.bills[ i ];
			} else {
				tipArray[ i ] = this.bills[ i ] * .10;
				totalArray[ i ] = tipArray[ i ] + this.bills[ i ];
			}
		};
		return this.tipArray = tipArray, this.totalArray = totalArray;
	}
};

//Part 2 Extra
let markBill = {
	bills: [ 77, 375, 110, 45 ],
	calcTip: function () {
		let tipArray = [],
			totalArray = [];
		for ( i = 0; i < this.bills.length; i++ ) {
			if ( this.bills[ i ] < 100 ) {
				tipArray[ i ] = this.bills[ i ] * .20;
				totalArray[ i ] = tipArray[ i ] + this.bills[ i ];
			} else if ( this.bills[ i ] >= 100 && this.bills[ i ] <= 300 ) {
				tipArray[ i ] = this.bills[ i ] * .10;
				totalArray[ i ] = tipArray[ i ] + this.bills[ i ];
			} else {
				tipArray[ i ] = this.bills[ i ] * .25;
				totalArray[ i ] = tipArray[ i ] + this.bills[ i ];
			}
		};
		return this.tipArray = tipArray, this.totalArray = totalArray;
	}
};

// Call the functions
johnBill.calcTip();
markBill.calcTip();

// Tip function
function tip( tipArray ) {
	let sum = 0;
	for ( i = 0; i < tipArray.length; i++ ) {
		sum = sum + tipArray[ i ];
	}
	return sum / tipArray.length;
}

let johnAvgTip = tip( johnBill.tipArray );
let markAvgTip = tip( markBill.tipArray );

// Log the arrays
console.log(
	`
	John paid the following tips: ${johnBill.tipArray}.
	John total bills amount to ${johnBill.totalArray}

	Mark paid the following tips: ${markBill.tipArray}.
	Mark total bills amount to ${markBill.totalArray}
	` );

// Check who pays the higher tip
if ( johnAvgTip > markAvgTip ) {
	console.log( `John family tips more than Mark's family with an average of ${johnAvgTip}` );
} else if ( markAvgTip > johnAvgTip ) {
	console.log( `Mark family tips more than John's family with an average of ${markAvgTip}` );
} else {
	console.log( `On average both families tip the same amount!` );
}
