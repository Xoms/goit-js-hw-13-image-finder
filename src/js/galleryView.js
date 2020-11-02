import cardTmpl from '../template/card.handlebars';

export default class GalleryView {

    gallery = document.querySelector('.gallery');
    loadMoreBtn = document.querySelector('.load-btn');


    constructor(){

    }

 
    enableLoadMoreBtn (){
        this.loadMoreBtn.classList.remove('hidden');
        this.loadMoreBtn.innerHTML = ` <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...`
    }

    disableLoadMoreBtn (){
        this.galleryView.render(res);
        this.loadMoreBtn.innerHTML = 'More...';
    }
    clear(){
        this.gallery.innerHTML = '';
    }
    render(data){
        if(!data.length){
            this.loadMoreBtn.disabled = true;
            console.log('больше нечего грузить')
            return
        }
        this.loadMoreBtn.disabled = false;
        this.gallery.insertAdjacentHTML ('beforeend', cardTmpl(data));
        
    }
}