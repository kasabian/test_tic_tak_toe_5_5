var GameModule = window.GameModule || {};

(function(module) {

	module.GameView = function() {

		this.renderBoard = function(board, idEl) {
			var htmlCode = "<table class='game_board'>";

			for(var i = 0; i < board.length; i++) {

				htmlCode += "<tr>";

				for(var j=0; j < board[0].length; j++) {

					if (board[i][j] == -1) {

						htmlCode += "<td attr-col='" + j + "' attr-row='" + i + "'></td>";

					} else if(board[i][j] == 0) { // clear 0

						htmlCode += "<td attr-col='" + j + "' attr-row='" + i + "' class = 'sprite zero'></td>";

					} else if(board[i][j] == 1) { // clear 1

						htmlCode += "<td attr-col='" + j + "' attr-row='" + i + "' class = 'sprite x'></td>";

					} else if(board[i][j] == 2) { // vertical 0

						htmlCode += "<td attr-col='" + j + "' attr-row='" + i + "' class = 'sprite x x-vertical_line'></td>";

					} else if(board[i][j] == 3) { // horisontal 0

						htmlCode += "<td attr-col='" + j + "' attr-row='" + i + "' class = 'sprite x x-horisontal_line'></td>";	

					} else if(board[i][j] == 4) { // left 0

						htmlCode += "<td attr-col='" + j + "' attr-row='" + i + "' class = 'sprite x x-left_line'></td>";	

					} else if(board[i][j] == 5) { // right 0
						
						htmlCode += "<td attr-col='" + j + "' attr-row='" + i + "' class = 'sprite x x-right_line'></td>";	
					
					} else if(board[i][j] == 6) { //  vertical 1

						htmlCode += "<td attr-col='" + j + "' attr-row='" + i + "' class = 'sprite y y-vertical_line'></td>";
					
					} else if(board[i][j] == 7) { //  horisontal 1

						htmlCode += "<td attr-col='" + j + "' attr-row='" + i + "' class = 'sprite y y-horisontal_line'></td>";	

					} else if(board[i][j] == 8) { //  left 1
						
						htmlCode += "<td attr-col='" + j + "' attr-row='" + i + "' class = 'sprite y y-left_line'></td>";	

					} else if(board[i][j] == 9) { //  right 1

						htmlCode += "<td attr-col='" + j + "' attr-row='" + i + "' class = 'sprite y y-right_line'></td>";	

					}		

				}

				htmlCode += "</tr>";

			}

			htmlCode += "</table>";

			document.getElementById(idEl).innerHTML = htmlCode;

		}

		this.renderStat = function (obj, idEl) {
			var  htmlCode = "<span><b>Нолик выиграл:</b> " + obj.second_user_wins + "</span>&nbsp &nbsp<span><b>Крестик выиграл :</b> " + obj.first_user_wins + "</span>&nbsp &nbsp<span><b>Номер хода:</b> " + obj.stap_count + "</span>&nbsp";	

			document.getElementById(idEl).innerHTML = htmlCode;

		}

	}

})(GameModule);