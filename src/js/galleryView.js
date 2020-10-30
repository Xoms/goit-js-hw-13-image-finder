import cardTmpl from '../template/card.handlebars';

export default class GalleryView {

    gallery = document.querySelector('.gallery');

    constructor(){
        
    }
    clear(){
        this.gallery.innerHTML = '';
    }
    render(data){
        this.gallery.insertAdjacentHTML ('beforeend', cardTmpl(data));
    }
}