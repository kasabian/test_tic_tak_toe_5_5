var GameModule = window.GameModule || {};

(function(module) {

	module.GameModel = function() {
		
		var staps = 0,
			gameProgress = false,
			countGames = 0,
			first_user_wins = 0,
			second_user_wins = 0,
			countMatchers = 5;

		var checkHorisontalLines = function(board, type) {
			
			var winData = {
				is_win: false,
				coords: []
			},
			i = 0,
			j = 0;

			while(!winData.is_win && (i < board.length)) {
				var matchCount = 0;

				j = 0;

				while(j < board[i].length) {

					if (board[i][j] == type) {
						
						matchCount++;
						winData.coords.push([j, i]);

					} else if (!winData.is_win) {

						matchCount = 0;
						winData.coords = [];

					}

					if(matchCount == countMatchers) {
						winData.is_win = true;
					}

					j++;	
				}

				i++;
			}


			return winData;

		}

		var checkVerticalLines = function(board, type) {
			
			var winData = {
				is_win: false,
				coords: []
			},
			i = 0,
			j = 0;

			while(!winData.is_win && (i < board[0].length)) {
				var matchCount = 0;

				j = 0;

				while(j < board.length) {

					if (board[j][i] == type) {
						
						matchCount++;
						winData.coords.push([i, j]);

					} else if (!winData.is_win) {

						matchCount = 0;
						winData.coords = [];

					}

					if(matchCount == countMatchers) {
						winData.is_win = true;
					}

					j++;	
				}

				i++;
			}

			return winData;

		}

		var checkLeftSquintLines = function(board, type) {

			var winData = {
				is_win: false,
				coords: []
			},
			matchCount = 0,
			limitX = board[0].length - 1,
			limitY = board.length - 1,
			limitSum = limitX + limitY;

			for(var j = limitSum; j >= 0 && !winData.is_win; j--) {

				for(var i = j; i >= 0; i--) {
					
					var x = j - i,
						y = i;

					if(x <= limitX && 
					   y <= limitY ) {


					   	if (board[y][x] == type) {
						
							matchCount++;
							winData.coords.push([x, y]);

						} else if (!winData.is_win) {

							matchCount = 0;
							winData.coords = [];

						}

						if(matchCount == countMatchers) {
							winData.is_win = true;
						}

					}

				}

			}

			return winData;
		}

		var checkRightSquintLines = function(board, type) {

			var winData = {
				is_win: false,
				coords: []
			},
			matchCount = 0,
			limitX = board[0].length - 1,
			limitY = board.length - 1;

			for (var j = (limitX * -1); j < limitY && !winData.is_win; j++) {

				for (var i = 0; i <= limitX; i++) {

					var x = i,
					    y = i + j;

					if(y >= 0 &&
					   y <= limitY) {

						if (board[y][x] == type) {
						
							matchCount++;
							winData.coords.push([x, y]);

						} else if (!winData.is_win) {

							matchCount = 0;
							winData.coords = [];

						}

						if(matchCount == countMatchers) {
							winData.is_win = true;
						}
					} 
				}
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

		this.checkWin = function(board, type) {
			var checkObj = checkVerticalLines(board, type);

			if (checkObj.is_win) {
				
				checkObj.type = "vertical";
				return checkObj;
			}

			checkObj = checkHorisontalLines(board, type);

			if (checkObj.is_win) {

				checkObj.type = "horisontal";
				return checkObj;
			}

			checkObj = checkLeftSquintLines(board, type);

			if (checkObj.is_win) {

				checkObj.type = "left";
				return checkObj;
			}

			checkObj = checkRightSquintLines(board, type);
			checkObj.type = "right";

			return checkObj;	
		}
	}

})(GameModule);