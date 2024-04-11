document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ingredients-input-form');
    const ingredientsList = document.getElementById('ingredients-list');
    const deleteRecipesButton = document.getElementById('delete-recipes-button');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const ingredientInput = document.getElementById('ingredients-form');
        const ingredient = ingredientInput.value;

        displayIngredient(ingredient);
        ingredientInput.value = '';
    });
    
    function displayIngredient(ingredient) {
        if (ingredient === ''){
            return;
        }
        const ingredientContainer = document.createElement('div');
        ingredientContainer.classList.add('ingredient-item');

        const listItem = document.createElement('li');
        listItem.textContent = ingredient;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', () => {
            ingredientContainer.remove();
        });

        ingredientContainer.appendChild(listItem);
        ingredientContainer.appendChild(deleteButton);
        ingredientsList.appendChild(ingredientContainer);
    }

    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        

        const ingredients = Array.from(document.querySelectorAll('.ingredient-item li')).map(item => item.textContent);    
       

        
            loadRecipes(ingredients)
        
    });

    function loadRecipes(ingredients) {
        const apiKey = "5ae23adc8bd544b285e95b3fd793ef52";
        const baseUrl = 'https://api.spoonacular.com/recipes/findByIngredients';

        fetch(`${baseUrl}?apiKey=${apiKey}&ingredients=${ingredients.join(',')}&number=5&instructionsRequired=true`)
        .then(res => {
            if(!res.ok) {
                throw new Error('failed to fetch recipes');
            }
            return res.json();
        })
        .then(recipes => {
            displayRecipes(recipes);
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            alert('Failed to fetch recipes. Try again later.');
        });        
    }
    function displayRecipes(recipes) {
        const recipesContainer = document.getElementById('recipes-cards');
        recipesContainer.innerHTML = '';

        deleteRecipesButton.addEventListener('click', () => {
            recipesContainer.innerHTML = ''; 
        });

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            const title = document.createElement('h2');
            title.textContent = recipe.title;
            recipeCard.appendChild(title);

            if (recipe.image) {
                const image = document.createElement('img');
                image.src = recipe.image;
                image.alt = `Image of ${recipe.title}`;
                recipeCard.appendChild(image);
            }

            if (recipe.instructions) {
                const instructions = document.createElement('p');
                instructions.textContent = recipe.instructions;
                recipeCard.appendChild(instructions);
            }

            recipesContainer.appendChild(recipeCard);
        })
    }
});

