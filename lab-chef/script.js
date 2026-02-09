const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";

function getRecipe() {
    const apiKey = api-key-input.trim();
    const ingredients = ingredients-input.trim();
    if (apiKey = null) {
        
    }
}

const prompt = `I have these ingredients: ${ingredients}. Please provide a creative recipe name, a list of instructions, and estimated cooking time. Format the output in clean HTML (using <h2> and <li> tags). Return only the inner HTML content. Do not include markdown code blocks, and do not include <html>, <head>, or <body> tags. Start directly with an <h2> tag`;

fetch(API_URL, {
    method: "POST",
    headers: { 
       "Content-Type": "application/json",
       "X-goog-api-key": apiKey
    },
    body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})
})
.then(r=>r.json())
.then(getRecipe);