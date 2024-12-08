const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');
const router = express.Router();

//ключ API Spoonacular
const spoonacularApiKey = process.env.SPOONACULAR_API_KEY;

// Маршрут для поиска рецептов
router.get('/recipes', async (req, res) => {
    try {
        const query = req.query.q; // Параметр поиска (название рецепта)
        
        const response = await axios.get(`https://api.spoonacular.com/recipes/716429/information?apiKey=9b52ba700f854408bd80787aefe15964&includeNutrition=true`);
        
        if (response.status === 200) {
            res.json(response.data);
        } else {
            throw new Error('API request failed.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Маршрут для получения детальной информации о рецепте
router.get('/recipes/:id/information', async (req, res) => {
    try {
        const id = req.params.id;
        
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${spoonacularApiKey}API&includeNutrition=true`);
        
        if (response.status === 200) {
            res.json(response.data);
        } else {
            throw new Error('API request failed.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
console.log(`spoonacular api ${spoonacularApiKey}`)