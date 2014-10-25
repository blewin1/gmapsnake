var UI = {

	userScore: 0,
	pointValue: 100,

	init: function() {
		this.userScore = 0;

		this.incrementScore();
	},

	incrementScore: function() {
		this.userScore += this.pointValue;
		$('#scoreValue').html(this.userScore);
	}

}