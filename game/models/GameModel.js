var GameModule = window.GameModule || {};

(function(module) {

	module.GameModel = function() {
		
		var staps = 0,
			gameProgress = false,
			countGames = 0,
			first_user_wins = 0,
			second_user_wins = 0,
			countMatchers = 5;


		var chekVertical = function(board, x, y, type) {
			var winData = {
				is_win: false,
				coords: []
			},
			countMatch = 0;

			for(var j = 1; (board[y + j] && board[y + j][x] == type); j++ ) {

					countMatch++;
					winData.coords.push([x, y + j]);
			}	

			for(var j = 0; (board[y - j] && board[y  - j][x] == type); j++ ) {
					
					countMatch++;
					winData.coords.push([x, y - j]);

			}

			if(countMatch == 5) {

			   winData.type = "vertical";	
			   winData.is_win = true;
				
			}

			return winData;
		} 

		var chekHorisontal = function(board, x, y, type) {

			var winData = {
				is_win: false,
				coords: []
			},
			countMatch = 0;

			for(var j = 1; board[y][x + j] == type; j++ ) {

				countMatch++;
				winData.coords.push([x + j, y]);
			}	

			for(var j = 0; board[y][x - j] == type; j++ ) {
					
				countMatch++;
				winData.coords.push([x - j, y]);

			}

			if(countMatch == 5) {

				  winData.type = "horisontal";	
				  winData.is_win = true;
				
			}

			return winData;
		} 

		var chekLeftDiagonal = function(board, x, y, type) {
			var winData = {
				is_win: false,
				coords: []
			},
			countMatch = 0;

			for(var j = 0; (board[y - j] && board[y - j][x + j] == type); j++ ) {

				countMatch++;
				winData.coords.push([x + j, y - j]);
			}	

			for(var j = 1; (board[y + j] && board[y + j][x - j] == type); j++ ) {
					
				countMatch++;
				winData.coords.push([x - j, y + j]);

			}

			if(countMatch == 5) {

				winData.type = "left";	
				winData.is_win = true;
				
			}

			return winData;
		}

		var chekRightDiagonal = function(board, x, y, type) {
			var winData = {
				is_win: false,
				coords: []
			},
			countMatch = 0;

			for(var j = 0; (board[y + j] && board[y + j][x + j] == type); j++ ) {

				countMatch++;
				winData.coords.push([x + j, y + j]);
			}	

			for(var j = 1; (board[y - j] && board[y  - j][x - j] == type); j++ ) {
					
				countMatch++;
				winData.coords.push([x - j, y - j]);

			}

			if(countMatch == 5) {

				winData.type = "right";	
				winData.is_win = true;
				
			}

			return winData;	
		}	

		this.getStat = function() {
			
			return {
				second_user_wins: second_user_wins,
				first_user_wins: first_user_wins,
				stap_count: staps,
				game_progress: gameProgress
			};
		}

		this.finishGame = function(whoWin) {

			whoWin == 0 ? first_user_wins++ : second_user_wins++;

			gameProgress = false;
		}

		this.startNewGame = function() {

			staps = 0;
			gameProgress = true;
		}

		this.moveUser = function() {

			staps++;

			return true;
		}

		this.whoMove = function() {
			
			return staps%2 == 0 ? 0 : 1;
		}

		this.whoNextMove = function() {
			
			return (staps + 1)%2 == 0 ? 0 : 1;
		}

		this.checkWin = function(lastX, lastY, board, type) {
			var winData,
				lastX = parseInt(lastX, 10),
				lastY = parseInt(lastY, 10),

			winData = chekVertical(board, lastX, lastY, type);

			if(winData.is_win) {
				return winData;
			}

			winData = chekHorisontal(board, lastX, lastY, type);

			if(winData.is_win) {
				return winData;
			}

			winData = chekRightDiagonal(board, lastX, lastY, type);

			if(winData.is_win) {
				return winData;
			}

			winData = chekLeftDiagonal(board, lastX, lastY, type);


			return winData;	
		}
	}

})(GameModule);