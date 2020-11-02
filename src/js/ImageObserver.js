class ImageObserver {
    options = {};
    images = document.querySelectorAll('.gallery img')
    constructor(){
        this.imageObserver = new IntersectionObserver(this.onScroll, this.options);
        this.imageObserver.observe(this.images[this.images.length - 1])
    }

    onScroll = (entries, observer) => {

        entries.forEach( entry => {
            if (entry.isIntersecting) {
               
            }
        })

    }
}