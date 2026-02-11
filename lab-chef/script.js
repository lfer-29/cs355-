const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";

async function getRecipe() {
    try {
        const apiKeyInput = await response.getElementById('api-key-input'); 
        const apiKey = apiKeyInput?.value.trim() || '';

        const ingredientsInput = await response.getElementById('ingredients-input');
        const ingredients = ingredientsInput?.value.trim() || '';
    
        if (!apiKey) {
            console.error('API key is required.')
            alert('Please enter an API key.')
            return;
        }
        if (!ingredients) {
            console.error('Ingredients are required.')
            alert('Please enter at least one ingredient.')
            return;
        }
    } catch (error) {
    console.error('Error in getRecipe():', error);
    alert('Error!');

    console.log("ingredients", ingredients)
    console.log("API", apiKey)
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
.then(data=> {
    if (
        data &&
        Array.isArray(data.candidates) &&
        data.candidates[0]?.content?.parts &&
        data.candidates[0].content.parts[0]?.text
        ) {
        document.getElementById('recipe-display').innerHTML =
            data.candidates[0].content.parts[0].text;
        } else {
          document.getElementById('recipe-display').innerHTML =
            'Unexpected data format.';
        }
});

