var boardSize = 6; // global var

var model = {
	boardSize : 6,
	numShips : 2,
	shipLength : 3,
	shipsSunk : 0,
	ships : [
		{location : ["x1y1", "x1y2", "x1y3"], hit : ["","",""]},
		{location : ["x3y1", "x4y1", "x5y1"], hit : ["","",""]}
	],

	isSunk : function(ship) {
		for(var i=0; i<this.shipLength; i++) {
			if(ship.hit[i] != "hit") {
				console.log("no");
				return false;
			}
		}

		console.log("yup");
		return true;
	},

	fire : function(loc) {
		for(var i=0; i<this.numShips; i++) {
			var ship = this.ships[i];
			var idx = ship.location.indexOf(loc);
			if(idx >= 0)
			{
				if(ship.hit[idx] == "hit") {
					view.displayMessage("Can't hit the same place 2x !");
					return "r";
				}

				view.displayHit(loc);
				view.displayMessage("You've got a hit punk !");

				ship.hit[idx] = "hit";

				if(this.isSunk(ship)) {
					this.shipsSunk++;
					view.displayMessage("You sank my ship.");
				}

				return "s";
			}
		}

		view.displayMiss(loc);
		view.displayMessage("You missed punk !");

		return null;
	},

	validateLocation : function(loc) {
		if(loc == null || loc.length != 4) {
			view.displayMessage("Invalid location");
		} else if(loc.charAt(0) != 'x' || loc.charAt(2) != 'y') {
			view.displayMessage("Incorrect long/lat");
		} else if(loc.charAt(1) < 1 || loc.charAt(1) > 6) {
			view.displayMessage("Invalid X");
		} else if(loc.charAt(3) < 1 || loc.charAt(3) > 6) {
			view.displayMessage("Invalid Y");
		} else {
			return true;
		}

		return false;
	},

	isGameOver : function() {
		return this.shipsSunk == this.numShips;
	}

};

var view = {
	displayMessage : function(msg) {
		var msgArea = document.getElementById("message");
		msgArea.innerHTML = msg;
	},

	displayMiss : function(loc) {
		var cell = document.getElementById(loc);
		cell.innerHTML = "";
		cell.setAttribute("class", "miss");
	},

	displayHit : function(loc) {
		var cell = document.getElementById(loc);
		cell.innerHTML = "";
		cell.setAttribute("class", "hit");
	},

	setCoordinates : function() {
		for(var i = 1; i<=boardSize; i++)
		{
			for(var j=1; j<=boardSize; j++)
			{
				var id = "x" + i + "y" + j;
				var cell = document.getElementById(id);
				cell.innerHTML = id;
			}
		}
	}
};

var controller = {
	guesses : 0,

	processLoc : function(loc) {
		if(model.isGameOver()) {
			view.displayMessage("Game already over ! Refresh to play again");
			return;
		}

		if(model.validateLocation(loc)) {
			var status = model.fire(loc)
			if(status) {
				if(status == "s") {
					this.guesses++;
				}

				if(model.numShips == model.shipsSunk) {
					view.displayMessage("KO ! All ships sunk in " +
						this.guesses + " guesses ! Accuracy = " + (model.numShips * model.shipLength*100)/this.guesses + "%");
				}
			} else {
				this.guesses++;
			}
		}
	}
};

function handleFireClick() {
	var loc = document.getElementById("fire-loc").value;
	console.log(loc);
	controller.processLoc(loc);

	document.getElementById("fire-loc").value = "";
}

function init() {
	view.setCoordinates();
	var fireBtn = document.getElementById("fire-btn");
	fireBtn.onclick = handleFireClick;
}

window.onload = init;