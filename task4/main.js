import 'normalize.css';
import './index.less';

let idCard = -1;

class Card{
    constructor(id, name, link, description, code, provider) {
        this.id = id;
        this.name = name;
        this.link = link;
        this.description = description;
        this.code = code;
        this.provider = provider;
    }

}

async function setupCards() {
    const loader = document.getElementById('absolute-loader');
    loader.classList.remove('loader__invisible');

    const orange = new Card(
        Math.random().toString(36).substring(2, length+2),
        'Апельсин',
        'https://foodcity.ru/storage/products/October2018/6XZSr6ddCl6cxfo0UchP.jpg',
        'Description',
        '3545346',
        'Provider'
    );
    const garnet = new Card(
        Math.random().toString(36).substring(2, length+2),
        'Гранат',
        'https://fruktovik-eco.ru/wp-content/uploads/2020/04/granat-indiya.jpg',
        'Description',
        '5423653',
        'Provider'
    );
    const apple = new Card(
        Math.random().toString(36).substring(2, length+2),
        'Яблоко',
        'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDIxMTEyNi8zODdwbnQuanBlZw.jpg',
        'Description',
        '1231354',
        'Provider'
    );
    const cherry = new Card(
        Math.random().toString(36).substring(2, length+2),
        'Вишня',
        'https://foodcity.ru/storage/products/October2018/NTqwdSD2SiXVflQqOfgi.jpg',
        'Description',
        '1234123',
        'Provider'
    );
    const melon = new Card(
        Math.random().toString(36).substring(2, length+2),
        'Дыня',
        'https://cdn.metro-cc.ru/ru/ru_pim_404971001001_01.png',
        'Description',
        '12534563',
        'Provider'
    );

    const skeletons = document.getElementsByClassName('skeleton');
    for(const skeleton of skeletons){
        skeleton.classList.add('form-card__invisible');
    }

    const cards = [orange, apple, cherry, garnet, melon];

    for(const card of cards){
        await fetch('http://localhost:3000/products',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(card)
            })
    }

    loader.classList.add('loader__invisible');
    location.reload();
}

async function getPage(){
    await getProfile();
    await getCards();
}

async function getProfile(){
    const userProfileInfo = await fetch('http://localhost:3000/user-profile').then(res => res.json());

    const header = document.createElement('p');
    header.setAttribute('class', 'header__text');
    header.textContent = `${userProfileInfo.name} ${userProfileInfo.group}`;

    const profile = document.getElementById('profile-header');
    profile.insertBefore(header, profile.firstChild);
}

async function getCards() {
    const loader = document.getElementById('absolute-loader');
    loader.classList.remove('loader__invisible');
    const cards = await fetch('http://localhost:3000/products').then(res => res.json())

    const skeletons = document.getElementsByClassName('skeleton');

    for(const skeleton of skeletons){
        skeleton.classList.add('form-card__invisible');
    }

    for(let i = 0; i < cards.length; ++i){
        const card = cards[i];

        getCard(card);
    }
    loader.classList.add('loader__invisible');
}

function getCard(card){
    const sCardItem = document.createElement('div');
    sCardItem.id = `item${card.id}`;
    sCardItem.setAttribute('class', 'form-card__item');
    document.getElementsByClassName('form-card__list_item')[0].appendChild(sCardItem);

    const sCardCode = document.createElement('div');
    sCardCode.id = `code${card.id}`
    sCardCode.setAttribute('class', 'form-card__code');
    sCardCode.textContent = `Код товара: ${card.code}`;
    document.getElementById(`item${card.id}`).appendChild(sCardCode);

    const sCardRow = document.createElement('div');
    sCardRow.id = `row${card.id}`;
    sCardRow.setAttribute('class', 'form-card__row');
    document.getElementById(`item${card.id}`).appendChild(sCardRow)

    const sCardImage = document.createElement('img');
    sCardImage.setAttribute('class', 'form-card__img');
    sCardImage.src = card.link;
    document.getElementById(`row${card.id}`).appendChild(sCardImage);

    const sCardName = document.createElement('div');
    sCardName.setAttribute('class', 'form-card__name')
    sCardName.textContent = `Название товара: ${card.name}`;
    document.getElementById(`row${card.id}`).appendChild(sCardName);

    const sCardProvider = document.createElement('div');
    sCardProvider.setAttribute('class', 'form-card__provider');
    sCardProvider.textContent = `Поставщик: ${card.provider}`;
    document.getElementById(`item${card.id}`).appendChild(sCardProvider);

    const sCardDescription = document.createElement('div');
    sCardDescription.setAttribute('class', 'form-card__description');
    sCardDescription.textContent = `Описание: ${card.description}`;
    document.getElementById(`item${card.id}`).appendChild(sCardDescription);

    const sCardButtonsRow = document.createElement('div');
    sCardButtonsRow.id = `buttons-row${card.id}`;
    sCardButtonsRow.setAttribute('class', 'form-card__row');
    document.getElementById(`item${card.id}`).appendChild(sCardButtonsRow);

    const sCardEditButton = document.createElement('button');
    sCardEditButton.id = `edit-card${card.id}`;
    sCardEditButton.setAttribute('class', 'form-card__edit-button');
    sCardEditButton.textContent = 'Редактировать';
    sCardEditButton.addEventListener('click', editCard);
    sCardEditButton.pos = card.id;
    document.getElementById(`buttons-row${card.id}`).appendChild(sCardEditButton);

    const sCardDeleteButton = document.createElement('button');
    sCardDeleteButton.id = `delete-card${card.id}`;
    sCardDeleteButton.setAttribute('class', 'form-card__delete-button');
    sCardDeleteButton.textContent = 'Удалить';
    sCardDeleteButton.addEventListener('click', deleteCard);
    sCardDeleteButton.pos = card.id;
    document.getElementById(`buttons-row${card.id}`).appendChild(sCardDeleteButton);
}

async function createCard() {
    const loader = document.getElementById('absolute-loader');
    loader.classList.remove('loader__invisible');
    let card = getFormData(form);

    if(card.name === '' || card.link === '' || card.description === '' || card.code === '' || card.provider === ''){
        alert('Не все поля были заполнены. Для того, чтобы продолжить необходимо заполнить все поля.');
        throw new Error();
    }

    let cards = await fetch(`http://localhost:3000/products`,
        {
            method: 'GET'
        }).then(res => res.json())
    const idCardForUpdate = cards.findIndex(el => el.code === card.code);

    if(idCard >= 0) {
        card = await fetch(
            `http://localhost:3000/products/${idCard}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(card)
            }
        ).then(res => res.json());
        location.reload();
    } else if(idCardForUpdate >= 0) {
        card = await fetch(
            `http://localhost:3000/products/${idCardForUpdate}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(card)
            }
        ).then(res => res.json());
        location.reload();
    } else {
        card = await fetch(
            'http://localhost:3000/products',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(card)
            }
        ).then(res => res.json());
        getCard(card);
    }

    const createButton = document.getElementById('create-card');
    createButton.textContent = 'Создать';

    idCard = -1;
    loader.classList.add('loader__invisible');
}

async function editCard(){
    const loader = document.getElementById('absolute-loader');
    loader.classList.remove('loader__invisible');
    idCard = event.target.pos;

    const card = await fetch(`http://localhost:3000/products/${idCard}`,
        {
            method: 'GET'
        }).then(res => res.json())

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
    loader.classList.add('loader__invisible');
}

async function deleteCard(){
    const loader = document.getElementById('absolute-loader');
    loader.classList.remove('loader__invisible');
    await fetch(`http://localhost:3000/products/${event.target.pos}`,
        {
            method: 'DELETE',
        }).then(() => {
            location.reload();
    });
    loader.classList.add('loader__invisible');
}

function getFormData(form) {
    validateForm();
    const data = Array.from((new FormData(form)).entries());
    const card = new Card();
    for(let i = 0; i < data.length; ++i){
        let [key, value] = data[i];
        card[`${key}`] = value;
    }
    return card;
}

function validateForm(){

    function removeError(input){
        const parent = input.parentNode;
        if(parent.classList.contains('form__error')){
            parent.querySelector('.form__error-label').remove();
            parent.classList.remove('error');
        }
    }

    function createError(input, text){
        const parent = input.parentNode;
        const errorLabel = document.createElement('label');
        errorLabel.classList.add('form__error-label');
        errorLabel.textContent = text;
        parent.classList.add('form__error');

        input.classList.add('form__error-border')
        parent.append(errorLabel);
    }

    let result = true;
    const inputs = form.querySelectorAll('input');

    for(const input of inputs){

        removeError(input);

        if(input.dataset.maxLength){
            if(input.value.length > input.dataset.maxLength){
                createError(input, 'Поле не заполнено')
                result = false;
            }
        }

        if(input.dataset.required === "true"){
            if(input.value === ""){
                createError(input, 'Поле не заполнено')
                result = false;
            }
        }
    }

    const textAreas = form.querySelectorAll('textarea');

    for(const textArea of textAreas){

        removeError(textArea);

        if(textArea.dataset.maxLength){
            if(textArea.value.length > textArea.dataset.maxLength){
                createError(textArea, 'Поле не заполнено')
                result = false;
            }
        }

        if(textArea.dataset.required === "true"){
            if(textArea.value === ""){
                createError(textArea, 'Поле не заполнено')
                result = false;
            }
        }
    }

    return result;
}


const createButton = document.getElementById('create-card');
const setupButton = document.getElementById('setup-cards');
const form = document.getElementById('input-form')
createButton.addEventListener('click', createCard);
setupButton.addEventListener('click', setupCards);

await getPage();