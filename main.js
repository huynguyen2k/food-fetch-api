const foodsElement = document.getElementById('foods');

const foodURL = 'http://localhost:3000/foods';

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
    });
}

function renderFoodsInHTML(foodsHTML) {
    foodsElement.innerHTML = foodsHTML;
}

getFoodsData(foodURL)
    .then(renderFoodsInHTML);