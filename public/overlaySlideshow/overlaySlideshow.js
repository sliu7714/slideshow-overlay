// main library file
"use strict"

// these svgs are from iconmonstr.com
const forward_arrow_id = "forward_arrow"
const back_arrow_id = "back_arrow"
const forward_arrow = `<svg id=${forward_arrow_id} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>`
const back_arrow = `<svg id=${back_arrow_id} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>`

class BackgroundSlideshow{
    // later can add options for showing arrows(only one slide), size, etc?

    constructor(id, firstBackground, containerID) {
        // every slideshow must contain minimum one background
        this.backgroundList = [firstBackground]
        this.currentBackgroundIndex = 0  // index of the current background being displayed
        this.numBackgrounds = 1

        // not sure should autogenerate ids, but should at least check for uniqueness?
        this.id = id
        this.backgroundContainerID = `bg_container_${id}`

        // create background container
        const slideShowContainerHtml =
            `
            <div class="background-slideshow" id=${this.id}>
                ${back_arrow}
                <div class="background-container" id=${this.backgroundContainerID}>
                ${firstBackground.html}
                </div>
                ${forward_arrow}
            </div>
            `
        // add background to container
        $(`#${containerID}`).append(slideShowContainerHtml)
        // add onClick events for the arrows
        $(`#${forward_arrow_id}`).click(() => {this.nextSlide()})
        $(`#${back_arrow_id}`).click(() => {this.prevSlide()})
    }

    addBackground(background){
        $(`#${this.backgroundContainerID}`).append(background.html)
        background.hide()
        this.backgroundList.push(background)
        this.numBackgrounds ++
    }

    nextSlide(){
        let new_index = this.currentBackgroundIndex + 1
        if (new_index >= this.numBackgrounds){
            // move back to first slide
            new_index = 0
        }
        console.log('next slide index: ',new_index)
        this.changeSlide(new_index)
    }

    prevSlide(){
        let new_index = this.currentBackgroundIndex - 1
        if (new_index < 0){
            // move to last slide
            new_index = this.numBackgrounds - 1
        }
        console.log('next slide index: ',new_index)
        this.changeSlide(new_index)
    }

    changeSlide(index){
        if (index < 0 || index > this.backgroundList.length){
            console.log(`BackgroundSlideshow.changeSlide: background slideshow index out of bounds`)
            return
        }
        // hide previous slide
        this.backgroundList[this.currentBackgroundIndex].hide()
        // show current slide
        this.currentBackgroundIndex = index;
        this.backgroundList[this.currentBackgroundIndex].show()

    }

    removeBackground(){
        // TODO
        console.log('BackgroundSlideshow.removeBackground: not implemented yet')
    }

}

class Background{

    constructor(src, alt, id) {

        // html id of the background image element
        // should check for uniqueness TODO
        this.id = id

        // note this element is not created yet, this is just the html text
        this.html = `<img class="background" id=${this.id} class="background-img" src=${src} alt=${alt} >`
    }

    hide(){
        $(`#${this.id}`).hide()
    }

    show(){
        $(`#${this.id}`).show()
    }

}