( function () {
	const Game_questions = function ( question, answers, rightAnswer ) {
		this.question = question;
		this.answers = answers;
		this.rightAnswer = rightAnswer;
	}

	Game_questions.prototype.correct = function () {
		console.log( this.question );
		for ( i = 0; i < this.answers.length; i++ ) {
			console.log( `${i}: ${this.answers[ i ]}` );
		}
		let userAnswer = prompt( `Please answer with a number.\nType exit if you wish to quit :)` );
		if ( userAnswer === this.rightAnswer ) {
			console.log( `%c Correct!`, `color: green` );
			userScore++;
			return this.score(), startGame();
		} else if ( userAnswer === `exit` ) {
			console.log( `You haven't even tried!` );
		} else {
			console.log( `%c Wrong!`, `color: red` );
			return this.score(), startGame();
		};
	}

	Game_questions.prototype.score = function () {
		console.log( `%c Your current score is: %c ${userScore}!\n%c ___________________________________________________`, `color: royalblue`, `color: gold`, `color: royalblue` );
	}

	let userScore = 0;

	let questionOne = new Game_questions( `Is Javascript the coolest programming language in the world?`, [ `Yes`, `No` ], `0` );

	let questionTwo = new Game_questions( `What is the name of the coolest JS instructor?`, [ `John`, `Michael`, `Jonas` ], `2` );

	let questionThree = new Game_questions( `How to best describes coding?`, [ `Boring`, `Superfun!`, `Hard`, `Useless` ], `1` );
	
	let arr = [ questionOne, questionTwo, questionThree ];

	function startGame() {
		random = Math.floor( Math.random() * 3 );
		return arr[ random ].correct();
	}
	startGame();
} )();
