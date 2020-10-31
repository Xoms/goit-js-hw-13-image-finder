import cardTmpl from '../template/card.handlebars';

export default class GalleryView {

    gallery = document.querySelector('.gallery');
    loadMoreBtn = document.querySelector('.load-btn');

    constructor(){
        
    }
    clear(){
        this.gallery.innerHTML = '';
    }
    render(data){
        if(!data.length){
            this.loadMoreBtn.disabled = true;
            return
        }
        this.gallery.insertAdjacentHTML ('beforeend', cardTmpl(data));
    }
}