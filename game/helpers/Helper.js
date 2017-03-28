var GameModule = window.GameModule || {};

(function(module) {

	module.Helper = function() {
		
		this.getTypeCellByWinType = function(win_type, user) {
			var map = {
				1: {

					"vertical": 2,
					"horisontal": 3,
					"left": 5,
					"right": 4,
				},
				0: {

					"vertical": 6,
					"horisontal": 7,
					"left": 9,
					"right": 8,

				}
			};

			return map[user][win_type];

		}
	}

})(GameModule);