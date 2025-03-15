// main.js
import recipes from "./recipes.mjs";

// Hide / Show the recipe descriptions
function handleResize() {
    const descriptions = document.querySelectorAll(".recipe-description");
    descriptions.forEach(description => {
        description.classList.toggle('hide', window.innerWidth < 600);
    });
}
window.addEventListener("resize", handleResize);

// Template Functions
function recipeTemplate(recipe) {
    return `<figure class="recipe-card">
                <img class="recipe-image" src="${recipe.image}" alt="${recipe.description}">
                <figcaption class ="recipe-content">
                    <ul class="tags-container">
                        ${tagsTemplate(recipe.tags)}
                    </ul>
                    <h2 class="recipe-name">${recipe.name}</h2>
                    ${ratingTemplate(recipe.rating)}
                    <p class="recipe-description">${recipe.description}</p>
                </figcaption>
            </figure>`
}

function tagsTemplate(tags) {
    return tags.map(tag => `\t<li>${tag}</li>`).join('\n');
}

function ratingTemplate(rating) {
    let html = `\n<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">\n`;

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `\t<span aria-hidden="true" class="icon-star">⭐</span>\n`;
        } else {
            html += `\t<span aria-hidden="true" class="icon-star-empty">☆</span>\n`;
        }
    }

    html += `</span>\n`;
    return html;
}

function renderRecipes(recipeList) {
    const recipesContainer = document.getElementById("recipes-container");
    const recipesHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('\n');
    recipesContainer.innerHTML = recipesHTML;
}

// Helper functions for displaying a random recipe on page load
function random(number) {
    return Math.floor(Math.random() * number);
}

function getRandomListEntry(list) {
    return list[random(list.length)];
}

// Search Button Logic
const searchButton = document.querySelector('#search-bar button');
const searchInputElement = document.querySelector('#search-input');

searchButton.addEventListener("click", searchHandler)

function searchHandler(event) {
    event.preventDefault();
    if (searchInputElement.value != null) {
        renderRecipes(filterRecipes(searchInputElement.value.toLowerCase()));
    }
}

function filterRecipes(query) {
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.tags.find(tag => tag.toLowerCase().includes(query)) ||
        recipe.recipeIngredient.find(ingredient => ingredient.toLowerCase().includes(query))
    );

    return filteredRecipes.sort((a, b) => a.name.localeCompare(b.name));
}

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);

    // Call handleResize() after initial recipe is rendered
    handleResize();
}

// I spent over 3 hours trying to get my performace score to 100.
// The font being loaded too late kept causing a layout shift in the footer which was hurting the score.
// I tried different imports, links, even downloaded the font at one point and tried to reference it locally.
// I tried giving preset static sizes for the header and footer. I tried literally everything I could think.
// Nothing fixed it. Eventually I tried not rendering the footer until everything was loaded, and that fixed it.
// I am sure there is a better way to do this. But after 3 hours I just had to move on and use the only approach 
// that I had found that had any effect. Hence this weird EventListener below.
window.addEventListener('load', () => {
    document.querySelector('footer').style.visibility = 'visible';
});

init();