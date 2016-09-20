function clickIt(e) {
	window.alert("Botton is clicked");
}

var button = document.getElementById("button");

button.addEventListener("click", clickIt);

// EventEmitter