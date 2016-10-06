$(document).ready(function(){
	console.log("ready");
	var board = createBoard();
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