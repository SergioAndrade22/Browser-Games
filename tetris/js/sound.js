class Sound {
	constructor() {
		this.move = new Howl({
			src: ['../sound/move.mp3'],
			loop: false
		});
		this.clear = new Howl({
			src: ['../sound/clear.mp3'],
			loop: false
		});
		this.main = new Howl({
			src: ['../music/main_theme.mp3'],
			loop: true
		});
		this.main.play();
	}

	playMove() {
		this.move.play();
	}

	playClear() {
		this.clear.play();
	}
}