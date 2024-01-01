import 'normalize.css';
import './index.less';

let idCard = -1;

class Card{
    constructor(name, link, description, code, provider) {
        this.name = name;
        this.link = link;
        this.description = description;
        this.code = code;
        this.provider = provider;
    }

}

function setupCards() {
    const orange = new Card(
        'Апельсин',
        'https://foodcity.ru/storage/products/October2018/6XZSr6ddCl6cxfo0UchP.jpg',
        'Description',
        '3545346',
        'Provider'
    );
    const garnet = new Card(
        'Гранат',
        'https://fruktovik-eco.ru/wp-content/uploads/2020/04/granat-indiya.jpg',
        'Description',
        '5423653',
        'Provider'
    );
    const apple = new Card(
        'Яблоко',
        'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDIxMTEyNi8zODdwbnQuanBlZw.jpg',
        'Description',
        '1231354',
        'Provider'
    );
    const cherry = new Card(
        'Вишня',
        'https://foodcity.ru/storage/products/October2018/NTqwdSD2SiXVflQqOfgi.jpg',
        'Description',
        '1234123',
        'Provider'
    );
    const melon = new Card(
        'Дыня',
        'https://cdn.metro-cc.ru/ru/ru_pim_404971001001_01.png',
        'Description',
        '12534563',
        'Provider'
    );

    const cards = [orange, apple, cherry, garnet, melon];

    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
    location.reload();

}

function getCards() {
    const cards = JSON.parse(window.localStorage.getItem('cards'));
    for(let i = 0; i < cards.length; ++i){
        const card = cards[i];

        const sCardItem = document.createElement('div');
        sCardItem.id = `item${i}`;
        sCardItem.setAttribute('class', 'form-card__item');
        document.getElementsByClassName('form-card__list_item')[0].appendChild(sCardItem);

        const sCardCode = document.createElement('div');
        sCardCode.id = `code${i}`
        sCardCode.setAttribute('class', 'form-card__code');
        sCardCode.textContent = `Код товара: ${card.code}`;
        document.getElementById(`item${i}`).appendChild(sCardCode);

        const sCardRow = document.createElement('div');
        sCardRow.id = `row${i}`;
        sCardRow.setAttribute('class', 'form-card__row');
        document.getElementById(`item${i}`).appendChild(sCardRow)

        const sCardImage = document.createElement('img');
        sCardImage.setAttribute('class', 'form-card__img');
        sCardImage.src = card.link;
        document.getElementById(`row${i}`).appendChild(sCardImage);

        const sCardName = document.createElement('div');
        sCardName.setAttribute('class', 'form-card__name')
        sCardName.textContent = `Название товара: ${card.name}`;
        document.getElementById(`row${i}`).appendChild(sCardName);

        const sCardProvider = document.createElement('div');
        sCardProvider.setAttribute('class', 'form-card__provider');
        sCardProvider.textContent = `Поставщик: ${card.provider}`;
        document.getElementById(`item${i}`).appendChild(sCardProvider);

        const sCardDescription = document.createElement('div');
        sCardDescription.setAttribute('class', 'form-card__description');
        sCardDescription.textContent = `Описание: ${card.description}`;
        document.getElementById(`item${i}`).appendChild(sCardDescription);

        const sCardButtonsRow = document.createElement('div');
        sCardButtonsRow.id = `buttons-row${i}`;
        sCardButtonsRow.setAttribute('class', 'form-card__row');
        document.getElementById(`item${i}`).appendChild(sCardButtonsRow);

        const sCardEditButton = document.createElement('button');
        sCardEditButton.id = `edit-card${i}`;
        sCardEditButton.setAttribute('class', 'form-card__edit-button');
        sCardEditButton.textContent = 'Редактировать';
        sCardEditButton.addEventListener('click', editCard);
        sCardEditButton.pos = i;
        document.getElementById(`buttons-row${i}`).appendChild(sCardEditButton);

        const sCardDeleteButton = document.createElement('button');
        sCardDeleteButton.id = `delete-card${i}`;
        sCardDeleteButton.setAttribute('class', 'form-card__delete-button');
        sCardDeleteButton.textContent = 'Удалить';
        sCardDeleteButton.addEventListener('click', deleteCard);
        sCardDeleteButton.pos = i;
        document.getElementById(`buttons-row${i}`).appendChild(sCardDeleteButton);
    }
}

function createCard() {
    const card = getFormData(form);

    if(card.name === '' || card.link === '' || card.description === '' || card.code === '' || card.provider === ''){
        alert('Не все поля были заполнены. Для того, чтобы продолжить необходимо заполнить все поля.');
        throw new Error();
    }

    let cards = JSON.parse(window.localStorage.getItem('cards'));
    const idCardForUpdate = cards.findIndex(el => el.code === card.code);

    if(idCard >= 0) {
        cards[idCard] = card;
    } else if(idCardForUpdate >= 0) {
        cards[idCardForUpdate] = card;
    } else {
        if(cards){
            cards.push(card);
        } else{
            cards = [card]
        }
    }

    const createButton = document.getElementById('create-card');
    createButton.textContent = 'Создать';

    idCard = -1;

    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
    location.reload();
}

function editCard(){
    const cards = JSON.parse(window.localStorage.getItem('cards'));
    idCard = event.target.pos;

    const card = cards[idCard];

    const formInputName = document.getElementById('input-name');
    formInputName.value = card.name;

    const formInputLink = document.getElementById('input-link');
    formInputLink.value = card.link;

    const formInputDescription = document.getElementById('input-desc');
    formInputDescription.value = card.description;

    const formInputCode = document.getElementById('input-code');
    formInputCode.value = card.code;

    const formInputProvider = document.getElementById('input-provider');
    formInputProvider.value = card.provider;

    const createButton = document.getElementById('create-card');
    createButton.textContent = 'Подтвердить';
}

function deleteCard(){
    const cards = JSON.parse(window.localStorage.getItem('cards'));
    cards.splice(event.target.pos, 1);
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
    location.reload();
}

function getFormData(form) {
    const data = Array.from((new FormData(form)).entries());
    const card = new Card();
    for(let i = 0; i < data.length; ++i){
        let [key, value] = data[i];
        card[`${key}`] = value;
    }
    return card;
}


const createButton = document.getElementById('create-card');
const setupButton = document.getElementById('setup-cards');
const form = document.getElementById('input-form')
createButton.addEventListener('click', createCard);
setupButton.addEventListener('click', setupCards);

window.onload = getCards