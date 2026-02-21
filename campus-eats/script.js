const dishData = [
    { name: 'Spicy Tuna Roll', price: 9.99 },
    { name: 'Salmon Avocado Roll', price: 8.99 },
    { name: 'Chicken Teriyaki Bowl', price: 13.49 },
    { name: 'Pepperoni Slice', price: 3.99 },
    { name: 'Garlic Knots', price: 4.50 },
    { name: 'Cheese Calzone', price: 7.32 },
    { name: 'Fried Chicken Plate', price: 11.99 },
    { name: 'Crispy Chicken Sandwich', price: 6.79 },
    { name: 'Chicken Gizzards', price: 3.89 }
];

document.addEventListener('DOMContentLoaded', initializePage);

function initializePage() {
    setupDishCards();
    createFavoritesSummary();
}

function setupDishCards() {
    const dishCards = document.querySelectorAll('.dish-card');

    dishCards.forEach((card, index) => {
        const data = dishData[index];

        card.setAttribute('data-name', data.name);
        card.setAttribute('data-price', data.price);

        const priceDisplay = document.createElement('p');
        priceDisplay.className = 'dish-price';
        
        priceDisplay.textContent = '$' + data.price;
        card.appendChild(priceDisplay);

        const favoriteButton = document.createElement('button');
        favoriteButton.className = 'favorite-button';
        favoriteButton.textContent = 'Add to Favorites';
        card.appendChild(favoriteButton);

        favoriteButton.addEventListener('click', function () {
            toggleFavorite(card, favoriteButton);
        });
    });
}

function toggleFavorite(card, button) {
    
    if (card.classList.contains('favorited')) {
        card.classList.remove('favorited');
        button.textContent = 'Add to Favorites';
    } else {
        card.classList.add('favorited');
        button.textContent = 'Remove from Favorites';
    }

    updateFavoritesSummary();
}

function createFavoritesSummary() {
    const main = document.querySelector('main');
    const footer = document.querySelector('.site-footer');

    const favoritesSection = document.createElement('section');
    favoritesSection.id = 'favorites-summary';
    favoritesSection.className = 'favorites-summary';

    const heading = document.createElement('h2');
    heading.textContent = 'Your Favorites';
    favoritesSection.appendChild(heading);

    const listContainer = document.createElement('div');
    listContainer.id = 'favorites-list';
    listContainer.className = 'favorites-list';
    favoritesSection.appendChild(listContainer);

    const totalDisplay = document.createElement('p');
    totalDisplay.id = 'favorites-total';
    totalDisplay.className = 'favorites-total';
    totalDisplay.textContent = 'Total: $0.00';
    favoritesSection.appendChild(totalDisplay);

    main.parentNode.insertBefore(favoritesSection, footer);
    updateFavoritesSummary();
}

function updateFavoritesSummary() {
    const listContainer = document.getElementById('favorites-list');
    const totalDisplay = document.getElementById('favorites-total');
    const selectedCards = document.querySelectorAll('.dish-card.favorited');

    listContainer.textContent = '';

    if (selectedCards.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'favorites-empty';
        emptyMessage.textContent = 'No favorites yet.';
        listContainer.appendChild(emptyMessage);
        totalDisplay.textContent = 'Total: $0.00';
        return;
    }

    const favoritesList = document.createElement('ul');
    favoritesList.className = 'favorites-items';
    let total = 0;

    selectedCards.forEach((card) => {
        const dishName = card.getAttribute('data-name');
        
        const dishPrice = card.getAttribute('data-price') * 1;
        total += dishPrice;

        const listItem = document.createElement('li');
        listItem.className = 'favorite-item';

        const nameSpan = document.createElement('span');
        nameSpan.textContent = dishName;

        const priceSpan = document.createElement('span');
        priceSpan.textContent = '$' + dishPrice;

        listItem.appendChild(nameSpan);
        listItem.appendChild(priceSpan);
        favoritesList.appendChild(listItem);
    });

    listContainer.appendChild(favoritesList);
    totalDisplay.textContent = 'Total: $' + total;
}