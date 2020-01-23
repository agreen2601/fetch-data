const foodFactory = (food) => {
    return `<div class="box">
                <h3 class="name">${food.name}</h2>
                <h4 class="category">Category: ${food.category}</h4>
                <div class="ethnicity">Ethnicity: ${food.ethnicity}</div>
                <br>
                <div class="calories">Calories: ${food.calories}</div>
                <br>
                <div class="fat">Fat: ${food.fat}</div>
                <br>
                <div class="sugar">Sugar: ${food.sugar}</div>
                <br>
                <div class="country">Country of origin: ${food.country}</div>
                <br>
                <div class="ingredients">Ingredients: ${food.ingredients}</div>
            </div>
    `
}

const foodList = document.querySelector(".foodList")

const addFoodToDom = (foodAsHTML) => {
    foodList.innerHTML += foodAsHTML
}


fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text, productInfo.product.countries, productInfo.product.nutriments.fat_serving, productInfo.product.nutriments.sugars_serving, productInfo.product.nutriments.energy_serving) {
                        food.ingredients = productInfo.product.ingredients_text
                        food.country = productInfo.product.countries
                        food.fat = productInfo.product.nutriments.fat_serving + "g"
                        food.sugar = productInfo.product.nutriments.sugars_serving + "g"
                        food.calories = productInfo.product.nutriments.energy_serving
                    } else {
                        food.ingredients = "no ingredients listed",
                        food.country = "no country listed",
                        food.fat = "none listed",
                        food.sugar = "none listed"
                        food.calories = "none listed"
                    }


                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })


    