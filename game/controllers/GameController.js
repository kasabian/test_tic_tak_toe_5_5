var GameModule = window.GameModule || {};

(function(module) {

	module.GameController = function() {

		var board = new GameModule.BoardModel(10,10),
			game = new GameModule.GameModel(),
			view = new GameModule.GameView(),
			bot = new GameModule.BotModel(),
			helper = new GameModule.Helper(),
			boardElId = "game_board",
			newGameBtnElId = "start_new_game",
			botOrUserElId = "bot_or_user",
			playBot = false,
			statElId = "stat_header";
			
		var render = function() {
			view.renderBoard(board.getBoard(), boardElId);
			view.renderStat(game.getStat(), statElId); 
		}

		var checkStap = function(whoMove) {

			var checkObj = game.checkWin(board.getAllStaps(), board.getBoard(), whoMove);

			if (checkObj.is_win) {

				board.markWin(checkObj, whoMove);
				game.finishGame(whoMove);

			}

		}

		var botMove = function() {

			var whoMove = game.whoMove(),
				whoNextMove = game.whoNextMove(),
				coords = bot.getStapCoords(board.getBoard(), whoMove, whoNextMove);

				botCoords = coords.coords;

				board.setStap(botCoords[0], botCoords[1], whoMove);
			 
			 	checkStap(whoMove);

			 	game.moveUser();

			 	render();

		}

		var stapHundler = function(target) {
			var x = target.getAttribute("attr-col"),
				y = target.getAttribute("attr-row"),
				whoMove = game.whoMove();

			if(!game.getStat().game_progress) {

				return false;
			}	

			if (board.setStap(x, y, whoMove)) {

				game.moveUser();

				checkStap(whoMove);

				render();

				if(whoMove == 1 && 
				   game.getStat().game_progress &&
				   playBot) {

				   botMove();
				} 
			};

		}	

		// start new game event

		document.getElementById(newGameBtnElId).onclick = function(event) {

			board = new GameModule.BoardModel(10, 10);
			
			game.startNewGame();

			playBot = document.getElementById("bot_or_user").checked
			
			if(playBot) {
				botMove();
			}

			render();	

		}

		//  stap event

		document.getElementById(boardElId).onclick = function(event) {
			var target = event.target; 

			if (target.tagName == 'TD') {

				stapHundler(target);

			}
			
		}

		game.startNewGame();
		render();
	}

})(GameModule);