$(document).ready(function(){
	console.log("ready");
	var board = createBoard();
	render(board);
	setMines(board);
	setDistances(board);
	//start(board);

	$('.banner').click(function(event){
		if(time == 0){
			start(board);
		} else {
			reset(board);
		}
	});
});

var size = 9;
var flagsToUse = 10;
var animation;
var timeStep = 1000;
var time = 0;

var reset = function(board){
	board = createBoard();
	render(board);
	setMines(board);
	setDistances(board);
	flagsToUse = 10;
	time = 0;
	start(board);
}

var startTime = function(){
			animation = window.setInterval(function(){
			$('.banner').text("Time: "+time);
			time += 1;
		}, timeStep);
}
var stopTime = function(){
	window.clearInterval(animation);
	$('.banner').text('Click to start');
}
var start = function(board){
	startTime();
	$('.game').bind('contextmenu', function(){ return false });
	$('.cell').mousedown(function(event){
		event.preventDefault();
		console.log(event);
		var pos = event.target.id.split("");
		var column = pos[3];
		var row = pos[1];
		switch(event.which){
			case 1:
				makeMove(board, row, column);
			break;
			case 3:
				flagField(board, row, column);
			break;
		}
		checkVictory(board);
	});
}

var checkVictory = function(board){
 var end = true;
 if(flagsToUse == 0){
	for(var i = 0; i < size; i++){
		for(var j = 0; j < size; j++){
			if(board[i][j] != "X" && board[i][j] != "C")
				end = false;
		}
	}
 } else{
 	end = false;
 }
 if(end){
 	stopTime();
 	alert("You Won!");
 }
}

var flagField = function(board, row, column){
	//console.log("right clicked row "+row+" column "+column);
	row = Number(row);
	column = Number(column);
	if(board[row][column] != "C" && $(`#r${row}c${column}`).html() != "F" && flagsToUse > 0){
		$(`#r${row}c${column}`).html("F");
		flagsToUse -= 1;
		$(`#r${row}c${column}`).addClass('flagged');
	} else if (board[row][column] != "C" && $(`#r${row}c${column}`).html() == "F"){
		$(`#r${row}c${column}`).html(" ");
		flagsToUse += 1;
		$(`#r${row}c${column}`).removeClass('flagged');
	}
}

var makeMove = function(board, row, column){
	//var pos = event.target.id.split("");
	//var column = pos[3];
	//var row = pos[1];
	row = Number(row);
	column = Number(column);
	if(board[row][column] == " " && $(`#r${row}c${column}`).html() != "F"){
		uncoverBlanks(board, row, column);
		//renderChange(board, row, column);
		//board[row][column] = "C";
	} else if(board[row][column] != "X" && board[row][column] != "C" && $(`#r${row}c${column}`).html() != "F"){
		renderChange(board, row, column);
		board[row][column] = "C";
	} else if (board[row][column] == "X" && $(`#r${row}c${column}`).html() != "F"){
		uncoverMines(board);
		stopTime();
		alert("You lost!");
	}

}

var uncoverMines = function(board){
	for(var i = 0; i < size; i++){
		for(var j = 0; j < size; j++){
			if(board[i][j] == "X"){
				renderChange(board, i, j);
			}
		}
	}
}

var uncoverBlanks = function(board, row, column){
	row = Number(row);
	column = Number(column);
	renderChange(board, row, column);
	board[row][column] = "C";
	console.log("row "+row+" column "+column);
			if((row+1) < size && (column+1) < size){
			 if(board[row+1][column+1] != "C"){
				makeMove(board, row+1, column+1);}
			}
			if((row+1) < size){
				if(board[Number(row)+1][column] != "C"){
				makeMove(board,row+1, column);}
			}
			if((row+1) < size && (column-1) >= 0){
				if(board[row+1][column-1] != "C"){
				makeMove(board, row+1, column-1);}
			}
			if((column+1) < size ){
				if(board[row][column+1] != "C"){
				makeMove(board, row, column+1);}
			}
			if((column-1) >= 0){
				if(board[row][column-1] != "C"){
				makeMove(board, row, column-1);}
			}
			if((row-1) >= 0 && (column+1) < size){
				if(board[row-1][column+1] != "C"){
				makeMove(board, row-1, column+1);}
			}
			if((row-1) >= 0){
				if(board[row-1][column] != "C"){
				makeMove(board, row-1, column);}
			}
			if((row-1) >= 0 && (column-1) >= 0){
				if(board[row-1][column-1] != "C"){
				makeMove(board, row-1, column-1);}
			}	
}

var createBoard = function(){
	var b = new Array(size);
	for(var i = 0; i < size; i++){
		b[i] = new Array(size);
		for(var j = 0; j < size; j++){
			b[i][j] = " ";
		}
	}
	return b;
};

var render = function(board){
	$('.game').empty();
	for(var i=0; i < size; i++){
		for(var j=0; j < size; j++){
			//$('.game').append(`<div class="cell" id="r${i}c${j}">${board[i][j]}</div>`);
			$('.game').append(`<div class="cell" id="r${i}c${j}"></div>`);
		}
	}
};

var renderChanges = function(board){
	for(var i=0; i < size; i++){
		for(var j=0; j < size; j++){
			$(`#r${i}c${j}`).html(board[i][j]);
		}
	}	
}

var renderChange = function(board, row, col){
	if(board[row][col] != "C" && $(`#r${row}c${col}`).html() != "F"){
		$(`#r${row}c${col}`).html(board[row][col]);
		if(board[row][col] == "X")
			$(`#r${row}c${col}`).addClass('mine');
		$(`#r${row}c${col}`).addClass('cell_opened');
	}
}

var setMines = function(board){
	var mineNo = 10;
	do{
		var col = Math.floor(Math.random()*(size-1));
		var row = Math.floor(Math.random()*(size-1));
		if(board[row][col] == " "){
			board[row][col] = "X";
			mineNo -= 1;
			//$(`#r${row}c${col}`).addClass('mine');
		}
	}while(mineNo > 0)
}

var setDistances = function(board){
	var dist = 0;
	for(var i = 0; i < size; i++){
		for(var j = 0; j < size; j++){
			if((i+1) < size && (j+1) < size){
			 if(board[i+1][j+1] == "X"){
				dist += 1;}
			}
			if((i+1) < size){
				if(board[i+1][j] == "X"){
				dist += 1;}
			}
			if((i+1) < size && (j-1) >= 0){
				if(board[i+1][j-1] == "X"){
				dist += 1;}
			}
			if((j+1) < size ){
				if(board[i][j+1] == "X"){
				dist += 1;}
			}
			if((j-1) >= 0){
				if(board[i][j-1] == "X"){
				dist += 1;}
			}
			if((i-1) >= 0 && (j+1) < size){
				if(board[i-1][j+1] == "X"){
				dist += 1;}
			}
			if((i-1) >= 0){
				if(board[i-1][j] == "X"){
				dist += 1;}
			}
			if((i-1) >= 0 && (j-1) >= 0){
				if(board[i-1][j-1] == "X"){
				dist += 1;}
			}
			if(dist > 0 && board[i][j] == " "){
				board[i][j] = dist;
			}
			dist = 0;
		}
	}
}