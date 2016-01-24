









function initialise() {
	
	//document.body.style.visibility = "visible";
}

var trou = 0;

function retourne() {
	
	if (trou>0) {trou--;	}
	var nom = "trou_"+trou;
	document.getElementById(nom).style.visibility = "hidden";
	
	}
	
function avance() {
	
	var nom = "trou_"+trou;
	document.getElementById(nom).style.visibility = "visible";
	trou++;
	}


