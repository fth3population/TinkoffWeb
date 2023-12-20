import 'normalize.css';
import './index.less';

class Card{
    constructor(name, link, description, code, provider) {
        this.name = name;
        this.link = link;
        this.description = description;
        this.code = code;
        this.provider = provider;
    }

}

function getCards() {
    const cards = JSON.parse(window.localStorage.getItem('cards'));
    console.log(cards.length)
    for(let i = 0; i < cards.length; ++i){
        const card = cards[i];
        console.log(card)

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

    }
}

function createCard() {
    const card = getFormData(form);
    let cards = JSON.parse(window.localStorage.getItem('cards'));
    console.log(cards);
    if(cards){
        cards.push(card);
    } else{
        cards = [card]
    }
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
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
const form = document.getElementById('input-form')
console.log(form)
createButton.addEventListener('click', createCard);

window.onload = getCards