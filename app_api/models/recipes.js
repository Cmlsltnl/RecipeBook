const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const recipeSchema = new mongoose.Schema({
	name: {type: String, required: true},
	user: String,
	sourceUrl: String,
	ingredients: {type: [String], required: true},
	directions: {type: [String], required: true},
	rating: {type: Number, min: 0, max: 5},
	photoUrl : String,
	notes: String,
	prepTime: Number,
	cookTime: Number,
	servings: Number,
	course: String,
	mainIngredient: String,
	tags: [String]
});

mongoose.model('Recipe', recipeSchema);

	