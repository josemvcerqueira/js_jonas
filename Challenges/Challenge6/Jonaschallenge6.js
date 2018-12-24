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
		let userAnswer = prompt( `Please answer with a number.` );
		if ( userAnswer === this.rightAnswer ) {
			console.log( `Correct!` );
		} else {
			console.log( `Wrong!` );
		};
	}

	let questionOne = new Game_questions( `Is Javascript the coolest programming language in the world?`, [ `Yes`, `No` ], `0` );

	let questionTwo = new Game_questions( `What is the name of the coolest JS instructor?`, [ `John`, `Michael`, `Jonas` ], `2` );

	let questionThree = new Game_questions( `How to best describes coding?`, [ `Boring`, `Superfun!`, `Hard`, `Useless` ], `1` );

	function startGame() {
		let arr = [ questionOne, questionTwo, questionThree ];
		random = Math.floor( Math.random() * arr.length );
		return arr[ random ].correct();
	}
	startGame();
} )();
