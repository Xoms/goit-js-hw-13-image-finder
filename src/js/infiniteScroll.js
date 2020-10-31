import $ from 'jquery';
import jQueryBridget  from 'jquery-bridget';
import InfiniteScroll from 'infinite-scroll';
import cardTmpl from '../template/card.handlebars';

// import PIXABAY_API_KEY from '../../environment/env.js';
jQueryBridget( 'infiniteScroll', InfiniteScroll, $ );
const PIXABAY_API_KEY = '18874263-8f02838ab97d9dd90f7110125';

const API_URL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}`; 

//const url = `${API_URL}&q=${encodeURIComponent(this.qStr)}&page=${this.pageIndex}&per_page=12&image_type=photo&orientation=horizontal`

const $gallery = $('.gallery').infiniteScroll({
    path: function() {
      return `${API_URL}&q=${encodeURIComponent('cat')}&page=${this.pageIndex}&per_page=12&image_type=photo&orientation=horizontal`
    },
    // load response as flat text
    responseType: 'text',
    status: '.scroll-status',
    history: false,
  });
  

  $gallery.on( 'load.infiniteScroll', function(event, response ) {
    console.log( response )
    // parse response into JSON data
    const data = JSON.parse( response );
    // compile data into HTML
    const itemsHTML = cardTmpl(data.hits);
    // convert HTML string into elements
    const $items = $( itemsHTML );
    // append item elements
    $items.imagesLoaded( function() {
      $gallery.infiniteScroll( 'appendItems', $items )
    })
  });
  
  // load initial page
  $gallery.infiniteScroll('loadNextPage');
  
  //------------------//
  