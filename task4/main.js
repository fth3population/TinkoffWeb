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
    for(const card of cards){

    }
}