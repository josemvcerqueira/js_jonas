/*
.1 Player loses all it's score if it rolls 6 in a row.
.2 Add an input field to the Html so the players can decide the winning score.
.3 Add another dice to the game - (if one of them is a 1: player loses the current score)
*/

let scores, roundScore, activePlayer, diceDOM, gamePlaying, lastDice, lastDice2, winningScore, dice, dice2;

init();

// Buttons
document.querySelector( ".btn-roll" )
	.addEventListener( "click", function () {
		if ( gamePlaying ) {
			// Random number
			dice = Math.floor( Math.random() * 6 ) + 1;
			dice2 = Math.floor( Math.random() * 6 ) + 1;

			// Dices
			diceDOM.style.display = "block";
			diceDOM.src = "dice-" + dice + ".png";
			document.querySelector( ".dice-2" )
				.style.display = "block";
			document.querySelector( ".dice-2" )
				.src = "dice-" + dice2 + ".png";

			//  Update the current scores
			//Challenge 1
			if ( lastDice === 6 && dice === 6 || lastDice2 === 6 && dice2 === 6 ) {
				scores[ activePlayer ] = 0;
				document.querySelector( "#score-" + activePlayer )
					.textContent = scores[ activePlayer ];
				console.log( "dice2 = " + lastDice2 + " " + dice2 );
				console.log( "dice = " + lastDice + " " + dice );
				nextPlayer();
			} else if ( dice !== 1 && dice2 !== 1 ) {
				roundScore += dice;
				roundScore += dice2;
				document.querySelector( "#current-" + activePlayer )
					.textContent = roundScore;
				lastDice = dice;
				lastDice2 = dice2;
			} else {
				//next player

				nextPlayer()
			}
		}
	} );

document.querySelector( ".btn-hold" )
	.addEventListener( "click", function () {
		let input = document.getElementById( "winningScore" )
			.value;

		//Undefined, 0, null or "" are COERCED to false
		if ( input ) {
			winningScore = input;
		} else {
			winningScore = 100;
		}
		if ( gamePlaying ) {
			//Add current score to the global score
			scores[ activePlayer ] += roundScore;

			//Update the UI
			document.querySelector( "#score-" + activePlayer )
				.textContent = scores[ activePlayer ];

			//Check if player won the game
			scores[ activePlayer ] >= winningScore ?
				(
					document.getElementById( "name-" + activePlayer )
					.textContent = "Winner!",
					document.querySelector( ".dice" )
					.style.display = "none",
					document.querySelector( ".dice-2" )
					.style.display = "none",
					document.querySelector( ".player-" + activePlayer + "-panel" )
					.classList.add( "winner" ),
					document.querySelector( ".player-" + activePlayer + "-panel" )
					.classList.remove( "active" ),
					gamePlaying = false ) : nextPlayer()
		}
	} );

document.querySelector( ".btn-new" )
	.addEventListener( "click", init )

// Functions
function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	//reset current score to 0
	document.getElementById( "current-0" )
		.textContent = "0";
	document.getElementById( "current-1" )
		.textContent = "0";

	//alternate players background
	document.querySelector( ".player-0-panel" )
		.classList.toggle( "active" );
	document.querySelector( ".player-1-panel" )
		.classList.toggle( "active" );

	diceDOM.style.display = "none";
	document.querySelector( ".dice-2" )
		.style.display = "none";
}

function init() {
	gamePlaying = true;
	scores = [ 0, 0 ];
	roundScore = 0;
	activePlayer = 0;
	diceDOM = document.querySelector( ".dice" );
	diceDOM.style.display = "none";
	document.querySelector( ".dice-2" )
		.style.display = "none";
	document.getElementById( "score-0" )
		.textContent = "0";
	document.getElementById( "score-1" )
		.textContent = "0";
	document.getElementById( "current-0" )
		.textContent = "0";
	document.getElementById( "current-1" )
		.textContent = "0";
	document.getElementById( "name-0" )
		.textContent = "Player 1";
	document.getElementById( "name-1" )
		.textContent = "Player 2";
	document.querySelector( ".player-0-panel" )
		.classList.remove( "winner" );
	document.querySelector( ".player-1-panel" )
		.classList.remove( "winner" );
	document.querySelector( ".player-0-panel" )
		.classList.remove( "active" );
	document.querySelector( ".player-1-panel" )
		.classList.remove( "active" );
	document.querySelector( ".player-0-panel" )
		.classList.add( "active" );
}

/*
EXTRA MATERIAL

*****to insert HTML use .innerHTML

document.querySelector( "#current-" + activePlayer )
.innerHTML = "<em>" + dice + "<em>";

******to read content

let x = document.querySelector("#score-0").textContent;
console.log(x);

anonymous functions cannot be re-used, they do not have a name for example.
*/
