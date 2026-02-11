const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";

document
  .getElementById('get-recipe-btn')
  .addEventListener('click', getRecipe);

async function getRecipe() {
  const apiKey = document
    .getElementById('api-key-input')
    .value
    .trim();

  const ingredients = document
    .getElementById('ingredients-input')
    .value
    .trim();

  if (!apiKey || !ingredients) {
    alert('Please enter both an API key and ingredients.');
    return;
  }

  const recipeDisplay = document.getElementById('recipe-display');
  recipeDisplay.textContent = 'Cooking up something special... 🍳✨';

  const prompt = `I have these ingredients: ${ingredients}. Please provide a creative recipe name, a list of instructions, and estimated cooking time. Format the output in clean HTML (using <h2> and <li> tags). Return only the inner HTML content. Do not include markdown code blocks, and do not include <html>, <head>, or <body> tags. Start directly with an <h2> tag`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    if (
      data &&
      Array.isArray(data.candidates) &&
      data.candidates[0]?.content?.parts &&
      data.candidates[0].content.parts[0]?.text
    ) {
      recipeDisplay.innerHTML =
        data.candidates[0].content.parts[0].text;
    } else {
      recipeDisplay.innerHTML = 'Unexpected data format.';
    }
  } catch (error) {
    console.error(error);
    recipeDisplay.textContent = 'Something went wrong.';
  }
}
