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
router.get('/recipes', auth, ctrlRecipes.recipesReadAll);
router.post('/recipes', auth, ctrlRecipes.recipesCreate);
router.get('/recipes/:recipeid', ctrlRecipes.recipesReadOne);
router.put('/recipes/:recipeid', auth, ctrlRecipes.recipesUpdateOne);
router.delete('/recipes/:recipeid', ctrlRecipes.recipesDeleteOne);

/* Users */
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;





