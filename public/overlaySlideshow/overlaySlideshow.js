// main library file
"use strict"

// these svgs are from iconmonstr.com
const forwardArrowHtml = `<svg class="forward-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>`
const backArrowHtml = `<svg class="back-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>`

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
        this.forwardArrow = $(forwardArrowHtml)
        this.backArrow = $(backArrowHtml)
        $(this.slideShowContainer).append(this.backArrow)
        $(this.slideShowContainer).append(this.slidesContainer)
        $(this.slideShowContainer).append(this.forwardArrow)

        $(this.slideShowContainer).css('pointer-events', 'none')

        // NOTE that this does not add element to DOM

        // add onClick events for the arrows
        $(this.forwardArrow).click(() => {this.nextSlide()})
        $(this.backArrow).click(() => {this.prevSlide()})
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
        // hide previous slide
        $(this.slidesList[this.currentSlideIndex].element).hide()
        // show current slide
        this.currentSlideIndex = index;
        $(this.slidesList[this.currentSlideIndex].element).show()

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

        // html id of the background image element
        // should check for uniqueness? or try catch? TODO
        this.id = id

        // note this element is not added to the DOM yet
        this.element = $(`<img class=${className} id=${this.id} src=${src} alt=${alt} >`)
    }

}

class TextSlide{
    constructor(text, fontSize, id) {
        this.id = id

        // note this element is not added to the DOM yet
        this.element = $(`<div class="text-slide" id=${this.id} >${text}</>`)

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

// class Draggable{
//     constructor(){
//         this.x = 0
//         this.y = 0 
        

//         this.slideshowContainer = $(`<button class=${"test-drag"} id="idk2"> test2 </button>`)
        
        
//         // $(`#${"drag-container"}`).append(this.slideshowContainer2)
//         $(`#${"drag-container"}`).append( this.slideshowContainer)
        
//         console.log("here in draggable")
    

//         // // $(this.slideShowContainer).click(() => {console.log("here!")})
//         // $( this.slideshowContainer).click(() => {console.log('fwd arrow')})
//         // $(this.slideshowContainer).on('click',this.moveSlideshow)
//         $(document).ready(function(){
//             $(this.slideshowContainer).on('mousedown', this.mouseDown.bind(this))
//             $(this.slideshowContainer).on('mouseup', this.mouseUp.bind(this))

//             // $(this.slideShowContainer).css('padding-top', '50px')
//             // $(this.slideshowContainer).css({"background-color": "green",'padding-top': '50px'})
          
//           }.bind(this));
        
        
//     }

//     mouseDown (e){

//         e.preventDefault();

//         const id  = $(this.slideshowContainer).attr('id')
//         const slideShow = document.getElementById(id)

//         // initial mouse position
//         this.x = e.clientX
//         this.y = e.clientY
//         console.log('down: this.y:',this.x)
//         console.log('down: this.x:',this.y)


//         console.log('mousedown')
//         // add eventListener for moving the slideshow when mouse is clicked down 
        
//         slideShow.style.backgroundColor  = "green"
//         // $(this.slideShowContainer).on('mousemove', this.moveSlideshow.bind(this)) //not sure why does this not work?
//         slideShow.onmousemove = this.moveSlideshow.bind(this)
//     }

//     mouseUp(e){
//         const id  = $(this.slideshowContainer).attr('id')
//         const slideShow = document.getElementById(id)

//         console.log('mouseup')
//         // remove eventListening when mouse is released to prevent further movement 
//         // $(this.slideShowContainer).off('mousemove', this.moveSlideshow.bind(this))
//         slideShow.style.backgroundColor  = "red"
//         slideShow.onmousemove = null
//         // window.removeEventListener('mousemove', this.moveSlideshow, true)
//     }

//     moveSlideshow(e){

//         // console.log($(this.slideshowContainer).css('background-color'))
//         const id  = $(this.slideshowContainer).attr('id')
//         const slideShow = document.getElementById(id)

//         // // move absolute positioning to where mouse is 
//         const mouseY = e.clientY
//         const mouseX = e.clientX

//         // console.log('this.y:',this.x)
//         // console.log('this.x:',this.y)

//         console.log('clientY:',mouseY, 'clientX:',mouseX)

//         // console.log('offset top (y):',slideShow.offsetTop, 'offset left (x):',slideShow.offsetLeft)

//         slideShow.style.top  =  e.clientY - this.y + "px"
//         slideShow.style.left  = e.clientX  - this.x + "px"

        
//         // const off1 = this.x - e.clientX
//         // const off2 = this.y - e.clientY
//         // // this.x = e.clientX
//         // // this.y = e.clientY

//         // slideShow.style.top  =  (slideShow.offsetParent.offsetTop - (off2)) + "px"
//         // slideShow.style.left  = (slideShow.offsetParent.offsetLeft -(off1)) + "px"

//         slideShow.style.backgroundColor  = "orange"

//     }
// }