var db = require('../db');

exports.insert = function InsertHandler(title, description, releaseYear,
																				length, rating, categoryID, done){
  db.get().query(`
    INSERT INTO films
			(title, description, release_year, length, rating, category_id)
    VALUES (?,?,?,?,?,?)`,
		[title, description, releaseYear, length, rating, categoryID],
		function InsertQueryHandler(err, result){
      if (err){
        return done(err);
			}
			console.log("Film "+title+" added to DB with ID = "+result.insertId);
      done(null, result.insertId);
    }
	);
}

exports.getAll = function GetAllHandler(done){
  db.get().query(`
    SELECT *
		FROM films`,
		function SelectQueryHandler(err, result, fields){
      if (err){
        return done(err);
			}
			console.log("All films found in DB");
      done(null, result, fields);
    }
	);
}

exports.getAllByCategory = function GetAllByCategoryHandler(done){
  db.get().query(`
    SELECT film_id,
					 title,
					 description,
					 release_year,
					 length,
					 rating,
					 name,
					 films.last_update
		FROM films
		JOIN categories
			ON categories.category_id = films.category_id`,
		function SelectQueryHandler(err, result, fields){
      if (err){
        return done(err);
			}
			console.log("All films by category found in DB");
      done(null, result, fields);
    }
	);
}

exports.findById = function FindByIdHandler(filmID, done){
  db.get().query(`
		SELECT film_id,
					 title,
					 description,
					 release_year,
					 length,
					 rating,
					 films.category_id,
					 name,
					 films.last_update
		FROM films
		JOIN categories
			ON categories.category_id = films.category_id
		WHERE film_id = ?`, filmID,
    function SelectQueryHandler(err, result, fields){
      if (err){
        return done(err);
			}
			if (result.length === 0){
				return done("Error: Film ID does not exist.");
			}
			console.log("Film "+filmID+" found in DB");
  		done(null, result, fields);
    }
	);
}

exports.updateById = function UpdateByIdHandler(title, description,
																								releaseYear, length,
																								rating, categoryID,
																								filmID, done){
	db.get().query(`
		UPDATE films
		SET title = ?,
				description = ?,
				release_year = ?,
				length = ?,
				rating = ?,
				category_id = ?
		WHERE film_id = ?`,
		[title, description, releaseYear, length, rating, categoryID, filmID],
		function UpdateQueryHandler(err, result){
			if (err){
				return done(err);
			}
			console.log("Film "+filmID+" updated in DB");
			done(null, result.affectedRows);
		}
	);
}

exports.deleteById = function DeleteByIdHandler(filmID, done){
	db.get().query(`
	  DELETE
		FROM films
		WHERE film_id = ?`, filmID,
	  function DeleteQueryHandler(err, result){
	    if (err){
	    	return done(err);
			}
			console.log("Film "+filmID+" deleted from DB");
	    done(null, result.affectedRows);
	  }
	);
}
