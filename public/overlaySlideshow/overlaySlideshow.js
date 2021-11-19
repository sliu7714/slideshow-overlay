// main library file
"use strict"

// these svgs are from iconmonstr.com
const forwardArrowHtml = `<svg class="forward-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>`
const backArrowHtml = `<svg class="back-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>`

// NOTES

class SlideshowContainer {
    constructor(id, containerID, backgroundSlideshow, foregroundSlideshow) {
        this.id = id
        this.element = $(`<div class="slideshows-container" id="${this.id}">`)
        $(this.element).css('height', `${backgroundSlideshow.slideShowContainer.css('height')}`)
        $(this.element).append(backgroundSlideshow.slideShowContainer)
        $(this.element).append(foregroundSlideshow.slideShowContainer)

        // add to DOM
        $(`#${containerID}`).append(this.element)
    }

    addForegroundSlideshow(foregroundSlideshow){
        $(this.element).append(foregroundSlideshow.slideShowContainer)
    }

}

class SlideShow{
    // later can add options for showing arrows(only one slide), size, etc?
    constructor(id,height, firstSlide, slideshowClassName, slideContainerClassName ) {
        // every slideshow must contain minimum one slide
        this.slidesList = [firstSlide]
        this.currentSlideIndex = 0  // index of the current slide being displayed
        this.numSlides = 1

        // not sure should autogenerate ids, but should at least check for uniqueness?
        this.id = id

        // create html elements
        this.slideShowContainer = $(`<div class=${slideshowClassName} id=${this.id}>`)
        $(this.slideShowContainer).css('height', `${height}`)
        this.slidesContainer = $(`<div className=${slideContainerClassName} > `)
        $(this.slidesContainer).append(firstSlide.element)
        const forwardArrow = $(forwardArrowHtml)
        const backArrow = $(backArrowHtml)
        $(this.slideShowContainer).append(backArrow)
        $(this.slideShowContainer).append(this.slidesContainer)
        $(this.slideShowContainer).append(forwardArrow)

        // NOTE that this does not add element to DOM

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

    removeSlide(slide){
        // TODO: NOT done yet:
        // if(this.numSlides > 1){
        //     const old_length = this.slidesList.length
        //     this.slidesList = this.slidesList.map(s => s.id !== slide.id)
        //     if (this.slidesList.length >= old_length){
        //         throw "Trying to remove a slide that is not part of this slideshow"
        //     }
        //     $(slide).remove()
        //     this.numSlides = this.slidesList.length
        // }
        // else{
        //     throw "Slideshow must have at least one slide element"
        // }


    }
}

class BackgroundSlideshow extends SlideShow{

    constructor(id, height, firstSlide) {
        super(id, height, firstSlide,
            "background-slideshow",
            "background-container")
    }

}

class ForegroundSlideshow extends SlideShow{

    constructor(id, height, firstSlide) {
        super(id, height, firstSlide,
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