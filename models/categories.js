var db = require('../db');

exports.insert = function InsertHandler(name, done){
  db.get().query(`
    INSERT INTO categories
			(name)
		VALUES (?)`,
		[name],
		function InsertQueryHandler(err, result){
      if (err){
        return done(err);
			}
			console.log("Category "+name+" added to DB with ID = "+result.insertId);
      done(null, result.insertId);
  	}
	);
}

exports.getAll = function GetAllHandler(done){
  db.get().query(`
    SELECT *
		FROM categories`,
		function SelectQueryHandler(err, result, fields){
      if (err){
        return done(err);
			}
			console.log("All categories found in DB");
      done(null, result, fields);
    }
	);
}

exports.findById = function FindByIdHandler(categoryID, done){
  db.get().query(`
    SELECT *
		FROM categories
		WHERE category_id = ?`, categoryID,
    function SelectQueryHandler(err, result, fields){
      if (err){
        return done(err);
			}
			if (result.length === 0){
				return done("Error: Category ID does not exist.");
			}
			console.log("Category "+categoryID+" found in DB");
  		done(null, result, fields);
    }
	);
}
