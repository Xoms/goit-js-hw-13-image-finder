import InfiniteScroll from 'infinite-scroll';
import cardTmpl from '../template/card.handlebars';
// import PIXABAY_API_KEY from '../../environment/env.js';

const PIXABAY_API_KEY = '18874263-8f02838ab97d9dd90f7110125';

const API_URL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}`; 

//const url = `${API_URL}&q=${encodeURIComponent(this.qStr)}&page=${this.pageIndex}&per_page=12&image_type=photo&orientation=horizontal`

const infScroll = new InfiniteScroll( '.gallery', {
    path: function() {
      return `${API_URL}&q=${encodeURIComponent('cat')}&page=${this.pageIndex}&per_page=12&image_type=photo&orientation=horizontal`
    },
    // load response as flat text
    responseType: 'text',
    status: '.scroll-status',
    history: false,
  });
  
  // use element to turn HTML string into elements
  const proxyElem = document.createElement('div');
  
  infScroll.on( 'load', function( response ) {
    // parse response into JSON data
    const data = JSON.parse( response );
    // compile data into HTML
    const itemsHTML = cardTmpl(data.hits);
    // convert HTML string into elements
    proxyElem.innerHTML = itemsHTML;
    // append item elements
    const items = proxyElem.querySelectorAll('.list-item');
    infScroll.appendItems( items );
  });
  
  // load initial page
  infScroll.loadNextPage();
  
  //------------------//
  