var GameModule = window.GameModule || {};

(function(module) {

	module.BotModel = function() {
		
		var getRate = function(board, x, y, user_type) {

			var matchCount = 0,
				rate = 0;
	
			// horisontal

			for(var i = x + 1; board[y][i] == user_type; i++) {

				matchCount++;
			}

			for(var i = x - 1; board[y][i] == user_type; i--) {

				matchCount++;
			}

			rate = matchCount;
			matchCount = 0;


			// vertical

			for(var i = y + 1; (board[i] && board[i][x] == user_type); i++) {

				matchCount++;
			}

			for(var i = y - 1; (board[i] && board[i][x] == user_type); i--) {

				matchCount++;
			}

			rate = matchCount > rate ? matchCount : rate;
			matchCount = 0;


			// left

			for(var i = 1; (board[y + i] && board[y + i][x + i] == user_type); i++) {

				matchCount++;
			}

			for(var i = 1; (board[y - i] && board[y - i][x - i] == user_type); i++) {

				matchCount++;
			}

			rate = matchCount > rate ? matchCount : rate;
			matchCount = 0;

			// right


			for(var i = 1; (board[y - i] && board[y - i][x + i] == user_type); i++) {

				matchCount++;
			}

			for(var i = 1; (board[y + i] && board[y + i][x - i] == user_type); i++) {

				matchCount++;
			}

			rate = matchCount > rate ? matchCount : rate;

			return rate;

		}

		this.getStapCoords = function(board, bot_type, user_type) {
			
			var outObj = {
					maxRate : 0,
					coords: [4, 4]
				},
				rateBoard = [];


			for(var i = 0; i < board.length - 1; i++) {

				rateBoard.push([]);	

				for(var j = 0; j < board[0].length - 1; j++) { 

					var botRate,
					    userRate;

					if(board[i][j] == 0 || 
					   board[i][j] == 1){

						rateBoard[i][j] = 0;

					} else {

					   	botRate = getRate(board, j, i, bot_type);
					   	userRate = getRate(board, j, i, user_type);

					   	rateBoard[i][j] =  botRate > userRate ? botRate : userRate;

					   	if (rateBoard[i][j] > outObj.maxRate) {

							outObj.maxRate = rateBoard[i][j];
							outObj.coords = [j, i];

						} 

					} 
					
				}

			}

			return outObj;
		}
	}

})(GameModule);