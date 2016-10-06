$(document).ready(function(){
	console.log("ready");
	var board = createBoard();
	render(board);
	setMines(board);
	render(board);
	setDistances(board);
	render(board);
});

var size = 9;

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
			$('.game').append(`<div class="cell" id="c${j}r${i}">${board[i][j]}</div>`);
		}
	}
};

var setMines = function(board){
	var mineNo = 10;
	do{
		var col = Math.floor(Math.random()*(size-1));
		var row = Math.floor(Math.random()*(size-1));
		if(board[row][col] == " "){
			board[row][col] = "X";
			mineNo -= 1;
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