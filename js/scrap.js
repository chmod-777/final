	$scope.select = function() {
		var query = "SELECT title, img, date, body FROM articles";

		$cordovaSQLite.execute($rootScope.db, query).then(function(result) {
			if (result.rows.length > 0) {
				//console.log("SELECTED -> " + result.rows.item(4).title);

				counter = 0;

				for (i = 0; i < result.rows.length; i++) {
					counter++;
					console.log("Record #" + counter + ": " + "\n" +
						"Title: " + result.rows.item(i).title + "\n" +
						"img: " + result.rows.item(i).img + "\n" +
						"date: " + result.rows.item(i).date + "\n" +
						"body: " + result.rows.item(i).body + "\n\n");
				}
			}
		}, function(error) {
			console.log(error);
		});
	}