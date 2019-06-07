var express = require('express');       // imports the express library
var router = express.Router();          // Router object for routes

var filmModel = require('../models/films');

router.get('/api', function HomePageHandler(request, response) {
	response.sendFile("/" + "index.html");
});

router.post('/films', function FilmsPostHandler(request, response) {
  filmModel.insert(
    request.body.title,
    request.body.description,
    request.body.releaseYear,
    request.body.length,
    request.body.rating,
		request.body.categoryID,
    function DoneInserting(err, result) {
			let output = ['Error',''];
      if (err) {
        console.log("Some error inserting");
        console.log(err);
      } else {
				console.log("Successfully inserted film");
				output[0] = [`
					<th scope="col">ID</th>
					<th scope="col">Title</th>
					<th scope="col">Description</th>
					<th scope="col">Release Year</th>
					<th scope="col">Length</th>
					<th scope="col">Rating</th>
					<th scope="col">Category ID</th>
					`];
				output[1] += "<td>" + result + "</td>";
				output[1] += "<td>" + request.body.title + "</td>";
				output[1] += "<td>" + request.body.description + "</td>";
				output[1] += "<td>" + request.body.releaseYear + "</td>";
				output[1] += "<td>" + request.body.length + "</td>";
				output[1] += "<td>" + request.body.rating + "</td>";
				output[1] += "<td>" + request.body.categoryID + "</td>";
      }
			response.send(output);
	});
});

router.get('/films', function FilmsGetHandler(request, response){
  filmModel.getAll(function DoneGettingAll(err, result, fields){
    if (err) {
      console.log("Some error selecting all");
      console.log(err);
      response.write("Error Getting All");
    } else {
      console.log("Successfully retrieved all records");
			var page = `
				<head>
					<!-- Required meta tags -->
					<meta charset="utf-8">
					<metahttp-equiv="X-UA-Compatible"content="IE=edge">
					<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
					<!-- Descriptor meta tags -->
					<title>Film Information</title>
					<meta name="author" content="Chandler Stevens">
					<meta name="description" content="Displays info about films.">
					<!-- Bootstrap CSS -->
					<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
				</head>
				<body>
						<table class="table table-striped" id="dbTable" name="dbTable">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Title</th>
									<th scope="col">Description</th>
									<th scope="col">Release Year</th>
									<th scope="col">Length</th>
									<th scope="col">Rating</th>
									<th scope="col">Category ID</th>
									<th scope="col">Last Updated</th>
								</tr>
							</thead>
						<tbody>
				`;
			for (var i = 0; i < result.length; i++) {
				var film = result[i];
				page += "<tr>";
				for (var field in film) {
					page += "<td>" + film[field] + "</td>";
				}
				page += "</tr>";
			}
			page += `
						</tbody>
					</table>
					<!-- Optional JavaScript -->
					<!-- jQuery first, then Popper.js, then Bootstrap JS -->
					<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
					<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
					<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
				</body>
				`;
			response.send(page);
    }
  });
});

router.get('/films/:id', function FilmsGetByIdHandler(request, response){
  filmModel.findById(request.params.id, function DoneGettingById(err, result, fields){
		let output = ['Error','',[]];
		if (err) {
      console.log("Some error finding by id");
      console.log(err);
    } else {
			console.log("Successfully found film by ID");
			output[0] = [`
				<th scope="col">ID</th>
				<th scope="col">Title</th>
				<th scope="col">Description</th>
				<th scope="col">Release Year</th>
				<th scope="col">Length</th>
				<th scope="col">Rating</th>
				<th scope="col">Category ID</th>
				<th scope="col">Category</th>
				<th scope="col">Last Updated</th>
				`];
			for (var i = 0; i < result.length; i++) {
				var film = result[i];
				output[1] += "<tr>";
				for (var field in film) {
					output[1] += "<td>" + film[field] + "</td>";
					output[2].push(film[field]);
				}
				output[1] += "</tr>";
			}
    }
		response.send(output);
  });
});

router.get('/films-categories', function FilmsCategoriesGetByIdHandler(request, response){
  filmModel.getAllByCategory(function DoneGettingById(err, result, fields){
		let output = ['Error',''];
		if (err) {
      console.log("Some error finding by category");
      console.log(err);
    } else {
			console.log("Successfully found films by category");
			output[0] = [`
				<th scope="col">ID</th>
				<th scope="col">Title</th>
				<th scope="col">Description</th>
				<th scope="col">Release Year</th>
				<th scope="col">Length</th>
				<th scope="col">Rating</th>
				<th scope="col">Category</th>
				<th scope="col">Last Updated</th>
				`];
			for (var i = 0; i < result.length; i++) {
				var film = result[i];
				output[1] += "<tr>";
				for (var field in film) {
					output[1] += "<td>" + film[field] + "</td>";
				}
				output[1] += "</tr>";
			}
    }
		response.send(output);
  });
});

router.put('/films', function FilmsUpdateByIdHandler(request, response) {
  filmModel.updateById(
		request.body.title,
    request.body.description,
    request.body.releaseYear,
    request.body.length,
    request.body.rating,
		request.body.categoryID,
		request.body.filmID,
    function DoneUpdatingById(err, result) {
			let output = ['Error',''];
      if (err) {
        console.log("Some error updating");
        console.log(err);
      } else {
				console.log("Successfully updated film");
				output[0] = [`
					<th scope="col">ID</th>
					<th scope="col">Title</th>
					<th scope="col">Description</th>
					<th scope="col">Release Year</th>
					<th scope="col">Length</th>
					<th scope="col">Rating</th>
					<th scope="col">Category ID</th>
					`];
				output[1] += "<td>" + request.body.filmID + "</td>";
				output[1] += "<td>" + request.body.title + "</td>";
				output[1] += "<td>" + request.body.description + "</td>";
				output[1] += "<td>" + request.body.releaseYear + "</td>";
				output[1] += "<td>" + request.body.length + "</td>";
				output[1] += "<td>" + request.body.rating + "</td>";
				output[1] += "<td>" + request.body.categoryID + "</td>";
      }
			response.send(output);
    });
});

router.delete('/films', function FilmsDeleteByIdHandler(request, response) {
	filmModel.deleteById(
		request.body.filmID,
		function DoneDeletingById(err, result, fields) {
			let output = ['Error',''];
	    if (err){
	      console.log("Some error deleting by id");
	      console.log(err);
	    } else {
				console.log("Successfully deleted film");
				output[0] = "Success";
	    }
			response.send(output);
	  });
	});

module.exports = router;
