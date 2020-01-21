fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            const foodAsHTML = foodFactory(food)
            addFoodToDom(foodAsHTML)
        })
    })

const foodFactory = (food) => {
    return `<div class="box">
            <h3 class="name">${food.name}</h2>
            <h4 class="category">${food.category}</h4>
            <div class="ethnicity">${food.ethnicity}</div>
            </div>
    `
}

const foodList = document.querySelector(".foodList")

const addFoodToDom = (foodAsHTML) => {
    foodList.innerHTML += foodAsHTML
}