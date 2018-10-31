const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

const sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.recipesReadAll = function(req, res) {
	Recipe
		.find({})
		.exec(function(err, recipes) {
			if(err) {
				sendJsonResponse(res, 404, err);
			} else {
				sendJsonResponse(res, 200, recipes);
			}
		});			
};

module.exports.recipesCreate = function(req, res) {
	Recipe.create({
		name: req.body.name,
		user: req.body.user,
		sourceUrl: req.body.sourceUrl,
		ingredients: req.body.ingredients.split("\n").filter(Boolean),
		directions: req.body.directions.split("\n").filter(Boolean),
		rating: req.body.rating,
		photoUrl: req.body.photoUrl,
		notes: req.body.notes,
		prepTime: req.body.prepTime,
		cookTime: req.body.cookTime,
		servings: req.body.servings,
		course: req.body.course,
		mainIngredient: req.body.mainIngredient,
		tags: req.body.tags.split(",")
	}, function(err, recipe) {
		if(err) {
			sendJsonResponse(res, 400, err);
		} else {
			sendJsonResponse(res, 201, recipe);
		}
	});
};

module.exports.recipesReadOne = function(req, res) {
	if(req.params && req.params.recipeid) {
		Recipe
			.findById(req.params.recipeid)
			.exec(function(err, recipe) {
				if(!recipe) {
					sendJsonResponse(res, 404, {
						"message": "recipeid not found"
					});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 200, recipe);
			});
	} else {
		sendJsonResponse(res, 404, {
			"message": "No recipeid in request"
		});
	}
};

module.exports.recipesUpdateOne = function(req, res) {
	if(!req.params.recipeid) {
		sendJsonResponse(res, 404, {
			"message": "recipeid is required"
		});
		return;
	}
	Recipe
		.findById(req.params.recipeid)
		.exec(
			function(err, recipe) {
				if(!recipe) {
					sendJsonResponse(res, 404, {
						"message": "recipeid not found"
					});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				recipe.name = req.body.name;
				recipe.user = req.body.user;
				recipe.sourceUrl = req.body.sourceUrl;
				recipe.ingredients = req.body.ingredients.split("\n").filter(Boolean);
				recipe.directions = req.body.directions.split("\n").filter(Boolean);
				recipe.rating = req.body.rating;
				recipe.photoUrl = req.body.photoUrl;
				recipe.notes = req.body.notes;
				recipe.prepTime = req.body.prepTime;
				recipe.cookTime = req.body.cookTime;
				recipe.servings = req.body.servings;
				recipe.course = req.body.course;
				recipe.mainIngredient = req.body.mainIngredient;
				recipe.tags = req.body.tags.split(",");
				recipe.save(function(err, recipe) {
					if(err) {
						sendJsonResponse(res, 404, err);
					} else {
						sendJsonResponse(res, 200, recipe);
					}
				});
			}
		);		
};

module.exports.recipesDeleteOne = function(req, res) {
	const recipeid = req.params.recipeid;
	if(recipeid) {
		Recipe
			.findByIdAndRemove(recipeid)
			.exec(
				function(err, recipe) {
					if(err) {
						sendJsonResponse(res, 404, err);
						return;
					}
					sendJsonResponse(res, 204, null);
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message": "No recipeid"
		});
	}
};