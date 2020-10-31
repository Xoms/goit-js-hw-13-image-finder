import PixabayService from './pixabayService.js';
import GalleryView from './galleryView';
//import './infiniteScroll';

export default class ImgFinderController {
    
    searchForm = document.getElementById('search-form');
    searchInput = this.searchForm.querySelector('input');
    loadMoreBtn = document.querySelector('.load-btn');
    
    images = [];

    constructor(){
        this.imgService = new PixabayService;
        this.galleryView = new GalleryView;
        

        this.searchForm.addEventListener('submit', this.onSubmit);
        this.loadMoreBtn.addEventListener('click', this.loadMore);
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.query === this.searchInput.value) {
            return;
        };

        this.galleryView.clear();

        this.imgService.query = this.searchInput.value;
        this.imgService.resetPages();
        this.loadMoreBtn.classList.remove('hidden');
        this.loadMoreBtn.disabled = false;

        this.imgService.getImages()
            .then(res => {
                console.log(res);
                this.galleryView.render(res);
                ///this.images = [...this.images, ...res]; //для модалки
        })
    }

    loadMore = () => {
        console.log('click');
        this.imgService.getImages()
            .then(res => this.galleryView.render(res))
    }

    // onScroll(e) {

    // }


}