import PixabayService from './pixabayService.js';
import GalleryView from './galleryView.js';
import ModalController from './modal.js';
//import './infiniteScroll'; //матерится на CORS

export default class ImgFinderController {
    
    searchForm = document.getElementById('search-form');
    searchInput = this.searchForm.querySelector('input');
    loadMoreBtn = document.querySelector('.load-btn');
    
    options = {};
    

    constructor(){
        this.imgService = new PixabayService;
        this.galleryView = new GalleryView;
        this.modalController = new ModalController;
        

        this.searchForm.addEventListener('submit', this.onSubmit);
        this.loadMoreBtn.addEventListener('click', this.fetchArticles);

       
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.query === this.searchInput.value) {
            return;  //нафиг делать одинаковые запросы )
        };

        this.galleryView.clear();

        this.imgService.query = this.searchInput.value; //данные запроса с инпута
        this.imgService.resetPages(); //сброс пагинации

        
        
        this.fetchArticles();
    }

    fetchArticles = () => {

        this.loadMoreBtn.classList.remove('hidden');
        this.loadMoreBtn.innerHTML = ` <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...`

        this.imgService.getImages()
            .then(res => {
                console.log(res);

                this.galleryView.render(res);
                this.loadMoreBtn.innerHTML = 'More...';

                //Intersection Observer
                this.images = document.querySelectorAll('.gallery img');
                this.imageObserver = new IntersectionObserver(this.onScroll, this.options);
                this.imageObserver.observe(this.images[this.images.length - 1])
                
                // window.scrollTo({ //для кнопки
                //     top: document.documentElement.offsetHeight,
                //     behavior: 'smooth'
                //   });
            })

    }

    onScroll = (entries, observer) => {

        entries.forEach( entry => {
            if (entry.isIntersecting) {
                this.imgService.getImages()
                    .then( res => {
                        this.galleryView.render(res);
                        this.images = document.querySelectorAll('.gallery img');
                        this.imageObserver.observe(this.images[this.images.length - 1]);
                        this.imageObserver.unobserve(entry.target);
                    })
            }
        })

    }

}