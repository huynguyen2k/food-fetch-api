const foodsElement = document.getElementById('foods');

const foodURL = 'http://localhost:3000/foods';

function renderFoodsInHTML(foodsHTML) {
    foodsElement.innerHTML = foodsHTML;
}

function getFoodsData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Can not fetch foods data');
                }
                return response.json();
            })
            .then(foodsData => {
                let foodsHTML = foodsData.map(food => {
                    return `
                    <div class="foods__item" food-id="${food.id}">
                        <div class="food-img">
                            <img src="${food.image}" alt="food1">
                        </div>
                        <div class="food-info">
                            <h3 class="food-name">${food.name}</h3>
                            <span class="view-btn">Get recipe</span>
                        </div>
                    </div>
                    `;
                });

                resolve(foodsHTML.join(''));
            })
            .catch(error => {
                console.log(error);
            });
    })
    .then(renderFoodsInHTML);
}

function deleteFood(url) {
    const options = {
        method: 'delete',
        headers: {
            "Content-type": "application/json; char-set=UTF-8"
        }
    };

    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    return new Error('Delete failed');
                }
                return response.json();
            })
            .then(deletedFood => {
                resolve(deletedFood);
            })
            .catch(error => {
                console.log(error);
            })
    })
    .then(deletedFood => {
        console.log(deletedFood);
    });
}

function insertFood(url, foodObj) {
    var options = {
        method: 'post',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(foodObj)
    };

    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    return new Error('Insert food failed');
                }
                return response.json();
            })
            .then(newFood => {
                let foodHTML = `
                <div class="foods__item" food-id="${newFood.id}">
                    <div class="food-img">
                        <img src="${newFood.image}" alt="food1">
                    </div>
                    <div class="food-info">
                        <h3 class="food-name">${newFood.name}</h3>
                        <span class="view-btn">Get recipe</span>
                    </div>
                </div>
                `;
                resolve(foodHTML);
            })
            .catch(error => {
                console.log(error);
            });
    })
    .then((newFoodHTML) => {
        getFoodsData(url);
    });
}

function updateFood(url, foodObj) {
    const options = {
        method: 'put',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(foodObj)
    };

    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    return new Error('Update food failed');
                }
                return response.json();
            })
            .then(jsonResponse => resolve(jsonResponse))
            .catch(error => console.log(error));
    })
    .then(updatedFood => {
        getFoodsData(foodURL);
    });
}

getFoodsData(foodURL);

// insertFood(foodURL, {
//     id: 12,
//     name: 'Cơm chiên hải sản',
//     image: 'images/food3.jpg'
// });

// deleteFood(foodURL + '/12');

updateFood(foodURL + '/12', {
    name: "Cơm chiên muối ớt",
    image: "images/food6.jpg"
});