var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});


var ctrlRecipes = require('../controllers/recipes');
var ctrlAuth = require('../controllers/authentication');

/* Recipes API */
router.get('/recipes', ctrlRecipes.recipesReadAll);
router.post('/recipes', ctrlRecipes.recipesCreate);
router.get('/recipes/:recipeid', ctrlRecipes.recipesReadOne);
router.put('/recipes/:recipeid', ctrlRecipes.recipesUpdateOne);
router.delete('/recipes/:recipeid', ctrlRecipes.recipesDeleteOne);

/* Users */

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;





