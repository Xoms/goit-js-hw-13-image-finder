import PIXABAY_API_KEY from '../../environment/env.js';

const API_URL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}`; 
//encodeURIComponent(str) - отформатирует строку для поискового запроса, напр "yellow flowers" => 'yellow+flowers'
//str = `https://pixabay.com/api/?key=18874263-8f02838ab97d9dd90f7110125&q=yellow+flowers&image_type=photo`;  //for test

export default class PixabayService {

    page = 1;
    qStr = '';

    constructor(){

    }

    getImages(qStr, page){
        const url = `${API_URL}&q=${encodeURIComponent(this.qStr)}&page=${this.page}&per_page=12&image_type=photo&orientation=horizontal`;
        return fetch(url)
            .then(res => res.json())
            .then( ({hits}) => {
                this.page++;
                return hits})
            .catch(err => console.log(err));
    }

    set query(val) {
        this.qStr = val; 
    }

    resetPages(){
        this.page = 1;
    }
}