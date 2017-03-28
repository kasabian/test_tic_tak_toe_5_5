var GameModule = window.GameModule || {};

(function(module) {

	module.BoardModel = function(x, y) {
		var board = [],
			saveStaps = [],
			boardX = x,
			helper = new GameModule.Helper(),
			boardY = y;

		var createBoard = function() {

			for(var i = 0; i < boardY; i++) {

				var line = [];

				for(var j = 0; j < boardX; j++) {

					line[j] = -1;

				}

				board.push(line);

			}

		}	

		createBoard();	

		this.markWin = function(checkObj, whoMove) {

			for(var i = 0; i < checkObj.coords.length; i++) {
				
				board[checkObj.coords[i][1]][checkObj.coords[i][0]] = helper.getTypeCellByWinType(checkObj.type, whoMove);
			}

			return board;
		}

		this.getBoard = function() {

			return board;
		}

		this.getAllStaps = function() {

			return saveStaps;				
		}

		this.setStap = function(x, y, type) {

			if(board[y][x] == -1) {

				board[y][x] = type;

				saveStaps.push({
					x: parseInt(x, 10),
					y: parseInt(y, 10),
					type: type
				});

				return true;
			}

			return false;
			
		}

	}

})(GameModule);