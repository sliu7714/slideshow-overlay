// main library file

(function(global, document, $) { 

    // these arrow svgs are from iconmonstr.com
    const getForwardArrowHtml = (variant, color) =>{
        const colorToUse = color ? color: "black"
        switch(variant){
            case 1:
                return `<svg class="forward-arrow" fill=${colorToUse} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>`
                break;
            case 2:
                return `<svg class="forward-arrow" fill=${colorToUse} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z"/></svg>`
                break;
            case 3:
                return `<svg class="forward-arrow" fill=${colorToUse} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 12l-18 12v-24z"/></svg>`
                break;
            default:
                return `<svg class="forward-arrow" fill=${colorToUse} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>`

        }
    }
    const getBackArrowHtml = (variant, color) =>{
        const colorToUse = color ? color: "black"
        switch(variant){
            case 1:
                return `<svg class="back-arrow" fill=${colorToUse} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>`
                break;
            case 2:
                return `<svg class="back-arrow" fill=${colorToUse} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg>`
                break;
            case 3:
                return `<svg class="back-arrow" fill=${colorToUse} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 12l18-12v24z"/></svg>`
                break;
            default:
                return `<svg class="back-arrow" fill=${colorToUse} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>`
        }
    }

    class SlideshowContainer {
        constructor(id, containerID, backgroundSlideshow, foregroundSlideshow ) {
            this.id = id
            this.element = $(`<div class="slideshows-container" id="${this.id}">`)
            $(this.element).css('height', `${backgroundSlideshow.slideShowContainer.css('height')}`)
            
            this.backgroundSlideshow = backgroundSlideshow
            $(this.element).append(backgroundSlideshow.slideShowContainer)
            
            // list of foreground slideshow elements
            this.foregroundSlideshowList = []

            if( foregroundSlideshow !== undefined && foregroundSlideshow !== null){
                $(this.element).append(foregroundSlideshow.slideShowContainer)
                this.foregroundSlideshowList.push(foregroundSlideshow)
            }

            // add to DOM
            $(`#${containerID}`).append(this.element)
        }

        addForegroundSlideshow(foregroundSlideshow){
            $(this.element).append(foregroundSlideshow.slideShowContainer)
            this.foregroundSlideshowList.push(foregroundSlideshow)
        }

        removeForegroundSlideshow(foregroundSlideshow){
            if(!(foregroundSlideshow instanceof ForegroundSlideshow)){
                throw "Please put a valid ForegroundSlideShow object as a parameter"
            }

            const old_length = this.foregroundSlideshowList.length
        
            this.foregroundSlideshowList = this.foregroundSlideshowList.filter(s => s.id !== foregroundSlideshow.id)

            if (this.foregroundSlideshowList.length >= old_length){
                throw "Trying to remove a slideshow that is not part of this SlideshowContainer"
            }

            $(foregroundSlideshow.slideShowContainer).remove()
        }

        randomSlides(){
            // change background to random slide
            this.backgroundSlideshow.randomSlide()
            // change foreground slideshows to random slide
            this.foregroundSlideshowList.forEach((foregroundSlideshow) => {
                foregroundSlideshow.randomSlide()
            })
        }

    }

    class SlideShow{
        constructor(id, slides, options, slideshowClassName, slideContainerClassName ) {
            // every slideshow must contain minimum one slide
            if (slides.length < 1){
                throw "Every slideshow must contain at least one slide"
            }

            this.slidesList = [...slides]
            this.currentSlideIndex = 0  // index of the current slide being displayed
            this.numSlides = slides.length

            this.id = id

            // create html elements
            this.slideShowContainer = $(`<div class=${slideshowClassName} id=${this.id}>`)
            this.slidesContainer = $(`<div className=${slideContainerClassName} > `)
            this.slidesList.forEach(slide =>{ $(this.slidesContainer).append(slide.element)}) // add all slide elements
            $(this.slidesList[0].element).show() // show first slide
            this.forwardArrow = $(getForwardArrowHtml(options.arrowVariant, options.arrowColor))
            this.backArrow = $(getBackArrowHtml(options.arrowVariant, options.arrowColor))
            $(this.slideShowContainer).append(this.backArrow)
            $(this.slideShowContainer).append(this.slidesContainer)
            $(this.slideShowContainer).append(this.forwardArrow)

            $(this.slideShowContainer).css('pointer-events', 'none')

            // NOTE that this does not add element to DOM

            // add onClick events for the arrows
            $(this.forwardArrow).click(() => {this.nextSlide()})
            $(this.backArrow).click(() => {this.prevSlide()})


            // handle options
            if (options.height){
                $(this.slideShowContainer).css('height', `${options.height}`)
            }
            if (options.width){
                $(this.slideShowContainer).css('width', `${options.width}`)
            }
            if (options.hideArrows){
                this.hideArrows()
            }
            if(options.autoScroll){
                this.addAutoScroll(options.autoScroll)
            }
            if(options.animationVariant){
                this.animationVariant = options.animationVariant
            } 

        }

        addSlide(slide){
            $(this.slidesContainer).append(slide.element)
            $(slide.element).hide()
            this.slidesList.push(slide)
            this.numSlides ++
        }

        addSlides(slides){
            slides.forEach(slide =>{
                this.addSlide(slide)
            })
        }

        nextSlide(){
            let new_index = this.currentSlideIndex + 1
            if (new_index >= this.numSlides){
                // move back to first slide
                new_index = 0
            }
            this.changeSlide(new_index)
        }

        prevSlide(){
            let new_index = this.currentSlideIndex - 1
            if (new_index < 0){
                // move to last slide
                new_index = this.numSlides - 1
            }
            this.changeSlide(new_index)
        }

        randomSlide(){
            const rand_index = (Math.floor(Math.random()*this.numSlides))
            this.changeSlide(rand_index)
        }

        changeSlide(index){
            if (index < 0 || index > this.slidesList.length){
                console.log(`Slideshow.changeSlide: slideshow index out of bounds`)
                return
            }
            
            console.log(this.animationVariant)
            console.log('test',this.test)
            switch(this.animationVariant){
                case(1): // fade in animation
                    $(this.slidesList[this.currentSlideIndex].element).fadeOut(
                        500,
                        function(){
                            this.currentSlideIndex = index;
                            $(this.slidesList[this.currentSlideIndex].element).fadeIn(500)
                        }.bind(this)
                    )
                    break;

                case(2): // slide animation

                    // disable arrows during animation to prevent unwanted behavior of overlapping animations
                    $(this.forwardArrow).css('pointer-events', 'none')
                    $(this.backArrow).css('pointer-events', 'none')

                    $(this.slidesList[this.currentSlideIndex].element).animate({ width: "0%" }, 1000, function(){
                        $(this).hide()
                        $(this).css("width","100%")
                    } )

                    $(this.slidesList[index].element).css("width","0%")

                    this.currentSlideIndex = index;
                    $(this.slidesList[this.currentSlideIndex].element).animate({ width: "100%" }, 1000, function(){
                        // make arrows clickable again after animation is over
                        $(this.forwardArrow).css('pointer-events', 'visiblePainted')
                        $(this.backArrow).css('pointer-events', 'visiblePainted')
                    }.bind(this))
                
                    break;

                default:// no animation
                    // hide previous slide
                    $(this.slidesList[this.currentSlideIndex].element).hide()
                    // show current slide
                    this.currentSlideIndex = index;
                    $(this.slidesList[this.currentSlideIndex].element).show()
            }

        }

        removeSlide(slide){
            if(!(slide instanceof Slide)){
                throw "Please put a valid Slide object as a parameter"
            }
            if(this.numSlides > 1){
                this.changeSlide(0)
                const old_length = this.slidesList.length
                this.slidesList = this.slidesList.filter(s => s.id !== slide.id)

                if (this.slidesList.length >= old_length){
                    throw "Trying to remove a slide that is not part of this slideshow"
                }

                this.numSlides = this.slidesList.length
                $(slide.element).remove()
            }
            else{
                throw "You cannot remove the last slide in this slideshow. Slideshow must have at least one slide element"
            }
        }

        addAutoScroll(milliseconds){
            this.interval = setInterval(function () {
                this.nextSlide()
            }.bind(this), milliseconds)
        }

        removeAutoScroll(){
            // stop automatically changing
            clearInterval(this.interval)
        }

        hideArrows(){
            this.forwardArrow.hide()
            this.backArrow.hide()
        }
        showArrows(){
            this.forwardArrow.show()
            this.backArrow.show()
        }


    }

    class BackgroundSlideshow extends SlideShow{

        constructor(id, slides, options) {
            super(id, slides, options,
                "background-slideshow",
                "background-container")
        }

    }

    class ForegroundSlideshow extends SlideShow{

        constructor(id, slides, options) {
            super(id, slides, options,
                "foreground-slideshow",
                "foreground-container")

            // handle options
            if (options.marginTop){
                
                $(this.slideShowContainer).css('margin-top', options.marginTop)
            }
            if (options.marginLeft){
                $(this.slideShowContainer).css('margin-left', options.marginLeft)
            }
            if(options.onlyShowArrowOnHover){
                // only for foreground slideshows 
                $(this.slideShowContainer).css('pointer-events', 'all')
                $(this.forwardArrow).hide()
                $(this.backArrow).hide()
                // only show arrows on hover
                $(this.slideShowContainer).hover(function(){ 
                    $(this.forwardArrow).toggle();
                    $(this.backArrow).toggle();
                }.bind(this))
            }
        }

        // move order of this slideshow forward
        orderForward(){
            const zIndex = parseInt($(this.slideShowContainer).css('z-index'))
            $(this.slideShowContainer).css('z-index', zIndex + 1)
        }
        // move order of this slideshow forward
        orderBackward(){
            const zIndex = parseInt($(this.slideShowContainer).css('z-index'))
            $(this.slideShowContainer).css('z-index', zIndex - 1)
        }

    }

    class Slide{
        constructor(src, alt, id, className) {
            this.id = id

            // note this element is not added to the DOM yet at the time of creation
            this.element = $(`<img class=${className} id=${this.id} src=${src} alt=${alt} >`)

            // slide is default hidden 
            $(this.element).hide()
        }

    }

    class TextSlide{
        constructor(text, fontSize, id) {
            this.id = id

            // note this element is not added to the DOM yet at the time of creation
            this.element = $(`<div class="text-slide" id=${this.id} >${text}</>`)
            
            // slide is default hidden 
            $(this.element).hide()

            $(this.element).css('font-size', fontSize)
        }
    }

    class BackgroundSlide extends Slide{

        constructor(src, alt, id) {
            super(src,alt, id, "background-slide")
        }

    }

    class ForegroundSlide extends Slide{

        constructor(src, alt, id) {
            super(src,alt, id, "foreground-slide")
        }

    }


global.ForegroundSlide = global.ForegroundSlide || ForegroundSlide
global.BackgroundSlide = global.BackgroundSlide || BackgroundSlide
global.TextSlide = global.TextSlide || TextSlide
global.ForegroundSlideshow = global.ForegroundSlideshow || ForegroundSlideshow
global.BackgroundSlideshow = global.BackgroundSlideshow || BackgroundSlideshow
global.SlideshowContainer = global.SlideshowContainer || SlideshowContainer


})(window, window.document, $);