// console.log('hello from mealbd')

//specific div hidden from  the beginning
document.getElementById('error-message').style.display = 'none';

//get input field text and clear all the previously data by cling Search button.
const inputField = () => {
    const inputFieldId = document.getElementById('input-field');
    const inputFieldText = inputFieldId.value;
    inputFieldId.value = '';
    
    //Clear All Old Results!
    const noFood = document.getElementById('no-food');
    noFood.textContent = '';
    const foodPlace = document.getElementById('food-section');
    foodPlace.classList.add('loader')
    foodPlace.innerHTML = ``;
    const foodDetailPlace = document.getElementById('food-detail');
    foodDetailPlace.textContent = '';
    const noFoods = document.getElementById('no-matched');
    noFoods.textContent = '';

    //if click without any input data
    if(inputFieldText == ''){
        //to remove class of spinner!
        const foodPlace = document.getElementById('food-section');
        foodPlace.classList.remove('loader');

        const myNoFoodDiv = document.createElement('div');
        myNoFoodDiv.innerHTML = `
            <p> Please Enter Food Name To Display Foods!</p>
        `;
        noFood.appendChild(myNoFoodDiv);
    }
    else{
        searchFood(inputFieldText);
    }
}

//foods api, getting them by fetch (or async await? need to set 'async' keyword before the parameter (here: food), and the await keyword before fetch and response).
const searchFood = food => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`;

    /* const res = await fetch(url);
    const data = await res.json();
    // console.log('Length IS:', data.meals)
    showFoodResult(data.meals); */

   
    fetch(url)
    .then(response => response.json())
    .then(data => showFoodResult(data.meals))
    .catch(error => showError(error))  //use of 'catch' & 'error' for normal fetch/.then.
    
}

//if catch got any error it will call this function. this function will show she html content div that was previously hidden!
const showError = error => {
    document.getElementById('error-message').style.display = 'block';
    console.log('Hello from show error')
};

        //LOAD DATA after fetching! and create div dynamically creating div and  putting data on them dynamically as well.
const showFoodResult = meals => {
    // console.log('Length is:', meals)

    const foodPlace = document.getElementById('food-section');
    foodPlace.classList.remove('loader');
    //checking if parameter is array or not. if no food was found but user searched for food by any keyword!
    if(!Array.isArray(meals) ){
        const noFoods = document.getElementById('no-matched');
        const myNoMatchFoodDiv = document.createElement('div');
        myNoMatchFoodDiv.innerHTML = `
            <p> No Food Matched!</p>
        `;
        noFoods.appendChild(myNoMatchFoodDiv);
    }
    // foodPlace.innerHTML = ``;  //''/`` any
    // foodPlace.textContent = '';

    //if everything is fine and found foods.
   else{
    meals.forEach( x => {
        const myDiv = document.createElement('div');
        myDiv.classList.add('card');
        myDiv.innerHTML = `
            <div onclick="loadMealDetail(${x.idMeal})">
                <img src="${x.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${x.strMeal}</h5>
                    <p class="card-text">${x.strInstructions.slice(0,200)}</p>
                <a href="#" class="btn btn-primary">${x.strArea}</a>
            </div>
        `;
        foodPlace.appendChild(myDiv);
    });
   }

};

//any specific data that was clicked for viewing details it will get that data 'ID' and doing fetch (here doing it by "asyinc" "await" system, not normal fetch .then system!)
const loadMealDetail = async mealId => {
    // console.log(mealId);
    const urlById = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    
    //trying to get error by "try" "catch" method
    try{
        const res = await fetch(urlById);
        const data = await res.json();
        displayMealDetail(data);
    }
    catch(error){
        showError(error);
    }
    
    
   /* fetch(urlById)
    .then(response => response.json())
    .then(data => displayMealDetail(data)) */
}

//creating new div dynamically for showing clink specific data
const displayMealDetail = data => {
    // console.log(data)
    const foodDetailPlace = document.getElementById('food-detail');
    foodDetailPlace.textContent = '';
    const myFoodDetailDiv = document.createElement('div');
    myFoodDetailDiv.classList.add('detail-card');
    myFoodDetailDiv.innerHTML = `
        <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.meals[0].strMeal}</h5>
            <p class="card-text">${data.meals[0].strInstructions.slice(0,150)}</p>
            <a href="${data.meals[0].strYoutube}" class="btn btn-primary youtube">Watch on YouTube!</a>
        </div>
    `;
    foodDetailPlace.appendChild(myFoodDetailDiv);
}