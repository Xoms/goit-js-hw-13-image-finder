import * as basicLightbox from 'basiclightbox';

export default class ModalController {

    gallery = document.querySelector('.gallery');

    constructor (){
        this.gallery.addEventListener('click', this.onImgClick)
    }

    onImgClick = (e) =>{
        console.log(e.target)
        if(!e.target.dataset.source) {
            return
        }
        
        const imgUrl = e.target.dataset.source
        this.openModal(imgUrl);
    }

    openModal = (imgUrl) =>{
        basicLightbox.create(`
		<img width="1400" height="900" src="${imgUrl}}">
	`).show()
    }
}
