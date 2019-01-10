// BUDGET CONTROLLER
let budgetController = ( function () {

	let Expense = function ( id, description, value ) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calcPercentage = function ( totalIncome ) {
		if ( totalIncome > 0 ) {
			this.percentage = Math.round( ( this.value / totalIncome ) * 100 );
		} else {
			this.percentage = -1;
		}
	};

	Expense.prototype.getPercentage = function () {
		return this.percentage;
	};

	let Income = function ( id, description, value ) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	let calculateTotal = ( type ) => {
		let sum = 0;
		data.allItems[ type ].forEach( ( current ) => {
			sum += current.value;
		} );
		data.totals[ type ] = sum;
	};

	let data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	};

	return {
		addItem: ( type, des, val ) => {
			let newItem, ID;
			// Create new ID
			if ( data.allItems[ type ].length === 0 ) {
				ID = 0
			} else {
				ID = data.allItems[ type ][ data.allItems[ type ].length - 1 ].id + 1;
			}

			// Create new Item, Inc or Exp
			if ( type === "exp" ) {
				newItem = new Expense( ID, des, val );
			} else if ( type === "inc" ) {
				newItem = new Income( ID, des, val );
			}

			// Push it on the data structure
			data.allItems[ type ].push( newItem );
			return newItem;
		},

		deleteItem: ( type, id ) => {
			let ids, index;

			ids = data.allItems[ type ].map( ( current ) => {
				return current.id
			} );

			index = ids.indexOf( id );

			if ( index !== -1 ) {
				data.allItems[ type ].splice( index, 1 );
			}
		},

		calculateBudget: () => {

			// calculate total income && expenses
			calculateTotal( "exp" );
			calculateTotal( "inc" );

			// calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp;

			// calculate the percentage of income that we spent
			if ( data.totals.inc > data.totals.exp ) {
				data.percentage = Math.round( ( data.totals.exp / data.totals.inc ) * 100 );
			} else if ( data.totals.inc <= data.totals.exp ) {
				data.percentage = -1;
			}
		},

		calculatePercentages: () => {
			data.allItems.exp.forEach( ( current ) => {
				current.calcPercentage( data.totals.inc );
			} );
		},

		getPercentages: () => {

			let allPerc = data.allItems.exp.map( ( curr ) => {
				return curr.getPercentage();
			} );
			return allPerc;
		},

		getBudget: () => {

			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			};
		},

		testing: function () {
			console.log( data );
		}
	}

} )();



// UI Controller
let UI_Controller = ( function () {

	let DOMstrings = {
		inputType: ".add__type",
		inputDescription: ".add__description",
		inputValue: ".add__value",
		inputBtn: ".add__btn",
		incomeContainer: ".income__list",
		expenseContainer: ".expenses__list",
		budgetLabel: ".budget__value",
		incomeLabel: ".budget__income--value",
		expensesLabel: ".budget__expenses--value",
		percentageLabel: ".budget__expenses--percentage",
		container: ".container",
		expensesPercLabel: ".item__percentage",
		dateLabel: ".budget__title--month"
	};

	let formatNumber = ( num, type ) => {
		let numSplit, int, dec;

		num = Math.abs( num );
		num = num.toFixed( 2 );

		numSplit = num.split( "." );
		int = numSplit[ 0 ];
		if ( int.length > 3 ) {
			int = int.substr( 0, int.length - 3 ) + "," + int.substr( int.length - 3, 3 );
		};
		dec = numSplit[ 1 ];

		return `${type === "exp" ? "-" : "+"} ${int}.${dec}`;

	};

	return {
		getinput: () => {
			return {
				type: document.querySelector( DOMstrings.inputType )
					.value,
				description: document.querySelector( DOMstrings.inputDescription )
					.value,
				value: parseFloat( document.querySelector( DOMstrings.inputValue )
					.value )
			};
		},

		addListItem: ( obj, type ) => {
			let html, newHtml, element;

			// Create HTML string with placeholder text

			if ( type === "inc" ) {
				element = DOMstrings.incomeContainer;

				html = `<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
			} else if ( type === "exp" ) {
				element = DOMstrings.expenseContainer;

				html = `<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
			};


			// Replace the placeholder text with some actual data
			newHtml = html.replace( "%id%", obj.id );
			newHtml = newHtml.replace( "%description%", obj.description );
			newHtml = newHtml.replace( "%value%", formatNumber( obj.value, type ) );

			// Insert the HTML into the DOM
			document.querySelector( element )
				.insertAdjacentHTML( "beforeend", newHtml );
		},

		deleteItem: ( selectorID ) => {
			let el = document.getElementById( selectorID );
			el.parentNode.removeChild( el );
		},

		displayBudget: ( obj ) => {
			let type;
			obj.budget > 0 ? type = "inc" : type = "exp";
			document.querySelector( DOMstrings.budgetLabel )
				.textContent = formatNumber( obj.budget, type );
			document.querySelector( DOMstrings.incomeLabel )
				.textContent = formatNumber( obj.totalInc, "inc" );
			document.querySelector( DOMstrings.expensesLabel )
				.textContent = formatNumber( obj.totalExp, "exp" );

			if ( obj.percentage > 0 ) {
				document.querySelector( DOMstrings.percentageLabel )
					.textContent = obj.percentage + "%"
			} else {
				document.querySelector( DOMstrings.percentageLabel )
					.textContent = "---";
			}

		},

		displayPercentages: ( percentages ) => {

			let fields = document.querySelectorAll( DOMstrings.expensesPercLabel );

			let nodeListForEach = ( list, callback ) => {
				for ( i = 0; i < list.length; i++ ) {
					callback( list[ i ], i );
				}
			};

			nodeListForEach( fields, ( current, index ) => {
				if ( percentages[ index ] > 0 ) {
					current.textContent = percentages[ index ] + "%";
				} else {
					current.textContent = "---";
				}
			} );

		},

		displayMonth: () => {
			let now, month, months, year;
			now = new Date();
			year = now.getFullYear();
			months = [ "January", "February", "March", "April", "May", "June", "July", "August", "Septemer", "October", "November", "December" ];
			month = months[ now.getMonth() ];

			document.querySelector( DOMstrings.dateLabel )
				.textContent = `${month} ${year}`;

		},

		changeType: () => {

			let fields = document.querySelectorAll(
				DOMstrings.inputType + "," +
				DOMstrings.inputDescription + "," +
				DOMstrings.inputValue );

			Array.prototype.forEach.call( fields, ( curr ) => {
				curr.classList.toggle( "red-focus" );
			} )

			document.querySelector( DOMstrings.inputBtn )
				.classList.toggle( "red" );

		},

		getDOMstrings: () => {
			return DOMstrings;
		},

		clearFields: () => {
			let fields, fieldsArr;

			// Returns a list that needs to convert to an array
			fields = document.querySelectorAll( DOMstrings.inputDescription + "," + DOMstrings.inputValue );

			// Calls the array slice prototype to the list
			fieldsArr = Array.prototype.slice.call( fields );

			fieldsArr.forEach( ( current, index, array ) => {
				current.value = "";
			} );
			fieldsArr[ 0 ].focus();
		}
	};
} )();



// GLOBAL APP CONTROLLER
let controller = ( function ( budgetCtrl, UICtrl ) {

	let setupEventListeners = () => {
		let DOM = UI_Controller.getDOMstrings();

		document.querySelector( DOM.inputBtn )
			.addEventListener( "click", ctrlAddItem );

		document.addEventListener( "keypress", function ( e ) {
			if ( event.KeyCode === 13 || event.which === 13 ) {
				ctrlAddItem();
			}
		} );

		document.querySelector( DOM.container )
			.addEventListener( "click", ctrlDeleteItem );

		document.querySelector( DOM.inputType )
			.addEventListener( "change", UICtrl.changeType )

	};

	let updateBudget = () => {

		// 1. Calculate the budget
		budgetCtrl.calculateBudget();

		// 2. Return the budget
		let budget = budgetCtrl.getBudget();

		// 3. Display the budget on the UI
		UICtrl.displayBudget( budget );
	};

	let updatePercentage = () => {

		// 1. Calculate the percentages
		budgetCtrl.calculatePercentages();

		// 2. Read percentages from the budget controller
		let percentages = budgetCtrl.getPercentages();

		// 3. Update the UI with the new percentages
		UICtrl.displayPercentages( percentages );

	};

	let ctrlAddItem = () => {
		let input, newItem;

		// 1. Get the field input data
		input = UI_Controller.getinput();

		if ( input.description && input.value && input.value > 0 ) {
			// 2. Add the item to the budget controller
			newItem = budgetCtrl.addItem( input.type, input.description, input.value );
			// 3. Add the item to the UI
			UICtrl.addListItem( newItem, input.type );

			// 4. Clear the fields
			UICtrl.clearFields();

			//5. Calculate and update budget
			updateBudget();

			// 6. Calculate and update percentages
			updatePercentage();
		}
	};

	let ctrlDeleteItem = ( event ) => {
		let itemID, splitID, type, ID;

		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if ( itemID ) {

			// inc-1
			splitID = itemID.split( "-" );
			type = splitID[ 0 ];
			ID = parseInt( splitID[ 1 ] );

			// 1. delete the item from the data source
			budgetCtrl.deleteItem( type, ID );

			// 2. delete the item from UI
			UICtrl.deleteItem( itemID );

			// 3. update budget
			updateBudget();

			// 4. Calculate and update percentages
			updatePercentage();

		};
	};

	return {
		init: () => {
			console.log( "Application has started" );
			UICtrl.displayMonth();
			UICtrl.displayBudget( {
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			} );
			setupEventListeners();
		}
	};

} )( budgetController, UI_Controller );

controller.init();
