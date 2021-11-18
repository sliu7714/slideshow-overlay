// main library file
"use strict"

// these svgs are from iconmonstr.com
const forwardArrowHtml = `<svg class="forward-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>`
const backArrowHtml = `<svg class="back-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>`

class SlideShow{
    // later can add options for showing arrows(only one slide), size, etc?
    constructor(id, firstSlide, containerID, slideshowClassName, slideContainerClassName ) {
        // every slideshow must contain minimum one slide
        this.slidesList = [firstSlide]
        this.currentSlideIndex = 0  // index of the current slide being displayed
        this.numSlides = 1

        // not sure should autogenerate ids, but should at least check for uniqueness?
        this.id = id

        // create html elements
        this.slideShowContainer = $(`<div class=${slideshowClassName} id=${this.id}>`)
        this.slidesContainer = $(`<div className=${slideContainerClassName} > `)
        $(this.slidesContainer).append(firstSlide.element)
        const forwardArrow = $(forwardArrowHtml)
        const backArrow = $(backArrowHtml)
        $(this.slideShowContainer).append(backArrow)
        $(this.slideShowContainer).append(this.slidesContainer)
        $(this.slideShowContainer).append(forwardArrow)

        // add element to DOM
        $(`#${containerID}`).append(this.slideShowContainer)

        // add onClick events for the arrows
        $(forwardArrow).click(() => {this.nextSlide()})
        $(backArrow).click(() => {this.prevSlide()})
    }

    addSlide(slide){
        $(this.slidesContainer).append(slide.element)
        slide.hide()
        this.slidesList.push(slide)
        this.numSlides ++
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

    changeSlide(index){
        if (index < 0 || index > this.slidesList.length){
            console.log(`Slideshow.changeSlide: slideshow index out of bounds`)
            return
        }
        // hide previous slide
        this.slidesList[this.currentSlideIndex].hide()
        // show current slide
        this.currentSlideIndex = index;
        this.slidesList[this.currentSlideIndex].show()

    }

    removeSlide(){
        // TODO
        console.log('Slideshow.removeSlide: not implemented yet')
    }
}

class BackgroundSlideshow extends SlideShow{

    constructor(id, firstSlide, containerID) {
        super(id, firstSlide, containerID,
            "background-slideshow",
            "background-container")
    }

}

class ForegroundSlideshow extends SlideShow{

    constructor(id, firstSlide, containerID) {
        super(id, firstSlide, containerID,
            "foreground-slideshow",
            "foreground-container")
    }

}

class Slide{
    constructor(src, alt, id, className) {

        // html id of the background image element
        // should check for uniqueness? or try catch? TODO
        this.id = id

        // note this element is not added to the DOM yet
        this.element = $(`<img class=${className} id=${this.id} src=${src} alt=${alt} >`)
    }

    hide(){
        $(this.element).hide()
    }

    show(){
        $(this.element).show()
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