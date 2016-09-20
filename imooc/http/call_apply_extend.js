function pet(words) {
	this.words = words;
	this.speak = function () {
		console.log(this.words);
	};
}

function dog(words) {
	// pet.call(this, words);
	pet.apply(this, arguments);
}

var dog = new dog("Wang");

dog.speak();