// main.js
import recipes from "./recipes.mjs";

// Hide / Show the recipe description
const description = document.querySelector('.recipe-description');
function handleResize() {
    description?.classList.toggle('hide', window.innerWidth < 600);
}
window.addEventListener("resize", handleResize);
window.addEventListener("load", handleResize);

function random(number) {
    return Math.floor(Math.random() * number);
}

function getRandomListEntry(list) {
    return list[random(list.length)];
}

function recipeTemplate(recipe) {
    return `<section class="recipe-card">
                <img class="recipe-image" src="${recipe.image}" alt="${recipe.description}">
                <div class="recipe-content">
                    <ul class="tags-container">
                        ${tagsTemplate(recipe.tags)}
                    </ul>
                    <h2 class="recipe-name">${recipe.name}</h2>
                    ${ratingTemplate(recipe.rating)}
                    <p class="recipe-description">${recipe.description}</p>
                </div>
             </section>`
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

    const mainElement = document.querySelector('main');
    const recipesHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('\n');
    mainElement.innerHTML = recipesHTML;
}

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
    
}

init();

