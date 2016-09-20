var globalVariable = "This is global variable";

function globalFunction() {
	var localVariable = "This is local variable"

	console.log("Visit global/local variable");
	console.log(globalVariable);
	console.log(localVariable);

	globalVariable = "This is changed variable";

	console.log(globalVariable);

	function localFunction() {
		var innrtLocalVariable = "This is inner local variable";

		console.log("variable global/local/innrtLocal variable");
		console.log(globalVariable);
		console.log(localVariable);
		console.log(innrtLocalVariable);		
	}

	localFunction();
}

globalFunction();