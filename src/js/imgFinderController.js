import PixabayService from './pixabayService.js';
import GalleryView from './galleryView';
import './infiniteScroll';

export default class ImgFinderController {
    
    searchForm = document.getElementById('search-form');
    searchInput = this.searchForm.querySelector('input');
    
    images = [];

    constructor(){
        this.imgService = new PixabayService;
        this.galleryView = new GalleryView;
        

        this.searchForm.addEventListener('submit', this.onSubmit);
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.query === this.searchInput.value) {
            return;
        };
        this.galleryView.clear();

        this.imgService.query = this.searchInput.value;
        this.imgService.resetPages();

        this.imgService.getImages()
            .then(res => {
                console.log(res);
                this.galleryView.render(res);
                this.images = [...this.images, ...res];

        })
    }



    onScroll(e) {

    }


}