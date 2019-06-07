var express = require('express');       // imports the express library
var router = express.Router();          // Router object for routes

var categoryModel = require('../models/categories');

router.post('/categories', function CategoriesPostHandler(request, response) {
  categoryModel.insert(
    request.body.categoryName,
    function DoneInserting(err, result) {
			let output = ['Error',''];
      if (err) {
        console.log("Some error inserting");
        console.log(err);
      } else {
				console.log("Successfully inserted category");
				output[0] = [`
					<th scope="col">ID</th>
					<th scope="col">Name</th>
					`];
				output[1] += "<td>" + result + "</td>";
				output[1] += "<td>" + request.body.categoryName + "</td>";
      }
			response.send(output);
	});
});

router.get('/categories', function CategoriesGetHandler(request, response){
  categoryModel.getAll(function DoneGettingAll(err, result, fields){
		let output = ['Error','',[]];
    if (err) {
      console.log("Some error selecting all");
      console.log(err);
    } else {
      console.log("Successfully retrieved all records");
			output[0] = [`
				<th scope="col">ID</th>
				<th scope="col">Name</th>
				<th scope="col">Last Updated</th>
				`];
			for (var i = 0; i < result.length; i++){
				var category = result[i];
				output[1] += "<tr>";
				for (var field in category){
					output[1] += "<td>" + category[field] + "</td>";
					output[2].push(category[field]);
				}
				output[1] += "</tr>";
			}
    }
		response.send(output);
  });
});

router.get('/categories/:id', function CategoriesGetByIdHandler(request, response){
  categoryModel.findById(request.params.id, function DoneGettingById(err, result, fields){
		let output = ['Error',''];
		if (err) {
      console.log("Some error finding by id");
      console.log(err);
    } else {
			console.log("Successfully found category by ID");
			output[0] = [`
				<th scope="col">ID</th>
				<th scope="col">Name</th>
				<th scope="col">Last Updated</th>
				`];
			for (var i = 0; i < result.length; i++) {
				var category = result[i];
				output[1] += "<tr>";
				for (var field in category) {
					output[1] += "<td>" + category[field] + "</td>";
				}
				output[1] += "</tr>";
			}
    }
		response.send(output);
  });
});

module.exports = router;
