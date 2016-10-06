$(document).ready(function(){
	console.log("ready");
	var board = createBoard();
	render(board);
	setMines(board);
	//renderChanges(board);
	setDistances(board);
	//renderChanges(board);
	start(board);
});

var size = 9;

var start = function(board){
	$('.cell').click(function(event){
		console.log(event);
		var pos = event.target.id.split("");
		var column = pos[3];
		var row = pos[1];
		makeMove(board, row, column);
	});
}

var makeMove = function(board, row, column){
	//var pos = event.target.id.split("");
	//var column = pos[3];
	//var row = pos[1];
	row = Number(row);
	column = Number(column);
	if(board[row][column] == " "){
		uncoverBlanks(board, row, column);
		//renderChange(board, row, column);
		//board[row][column] = "C";
	} else if(board[row][column] != "X" && board[row][column] != "C"){
		renderChange(board, row, column);
		board[row][column] = "C";
	} else if (board[row][column] == "X"){
		uncoverMines(board);
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
	if(board[row][col] != "C"){
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