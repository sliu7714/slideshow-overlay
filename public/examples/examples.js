// js file that uses the library
"use strict"

const blackShirtURL = 'https://purepng.com/public/uploads/large/purepng.com-black-t-shirtclothingt-shirtt-shirtdressfashionclothshirt-691522330439mcueb.png'
const blueShirtURL = 'https://purepng.com/public/uploads/large/purepng.com-sky-blue-t-shirtclothingt-shirtt-shirtdressfashionclothshirt-691522330544ifxvx.png'
const whiteShirtURL = 'https://purepng.com/public/uploads/large/purepng.com-white-t-shirtclothingt-shirtt-shirtdressfashionclothshirt-691522330552gz5xe.png'
const brownShirtURL = 'https://purepng.com/public/uploads/large/purepng.com-brown-t-shirtclothingt-shirtt-shirtdressfashionclothshirt-6915223304799xzls.png'
const greenShirtURL = 'https://purepng.com/public/uploads/large/purepng.com-green-t-shirtclothingt-shirtt-shirtdressfashionclothshirt-691522330493iyjsl.png'

const image1URL = 'https://images.unsplash.com/photo-1547103106-9a0e718bb2d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=686&q=80'
const image2URL = 'https://images.unsplash.com/photo-1548133650-7e2b96ebe5e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=681&q=80'
const image3URL = 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'

const bg1 = new BackgroundSlide(image1URL, 'image 1', 'bg_10')
const bg2 = new BackgroundSlide(image2URL, 'image 2', 'bg_11')
const bg3 = new BackgroundSlide(image3URL, 'image 3', 'bg_12')

const shirtBlack = new ForegroundSlide(blackShirtURL, 'black shirt', 'shirt_black_1')
const shirtBlue = new ForegroundSlide(blueShirtURL, 'blue shirt', 'shirt_blue_1')
const shirtWhite = new ForegroundSlide(whiteShirtURL, 'white shirt', 'shirt_white_1')
const shirtBrown = new ForegroundSlide(brownShirtURL, 'brown shirt', 'shirt_brown_1')
const shirtGreen = new ForegroundSlide(greenShirtURL, 'green shirt', 'shirt_green_1')


const bgSlideshow = new BackgroundSlideshow('bgs_1','500px', bg1)
bgSlideshow.addSlide(bg2)
bgSlideshow.addSlide(bg3)


const shirtSlideshow = new ForegroundSlideshow('shirt-slideshow','300px', shirtBlue)
shirtSlideshow.addSlide(shirtWhite)
shirtSlideshow.addSlide(shirtBrown)
shirtSlideshow.addSlide(shirtGreen)
shirtSlideshow.addSlide(shirtBlack)

const shirtBlack2 = new ForegroundSlide(blackShirtURL, 'black shirt', 'shirt_black_2')
const shirtBlue2 = new ForegroundSlide(blueShirtURL, 'blue shirt', 'shirt_blue_2')
const shirtWhite2 = new ForegroundSlide(whiteShirtURL, 'white shirt', 'shirt_white_2')
const shirtBrown2 = new ForegroundSlide(brownShirtURL, 'brown shirt', 'shirt_brown_2')
const shirtGreen2 = new ForegroundSlide(greenShirtURL, 'green shirt', 'shirt_green_2')
const shirtSlideshow2 = new ForegroundSlideshow('shirt-slideshow2', '100px', shirtBlue2)
shirtSlideshow2.addSlide(shirtWhite2)
shirtSlideshow2.addSlide(shirtBrown2)
shirtSlideshow2.addSlide(shirtGreen2)
shirtSlideshow2.addSlide(shirtBlack2)

const slideshowContainer = new SlideshowContainer('slide_cont', 'testDiv',  bgSlideshow, shirtSlideshow)
slideshowContainer.addForegroundSlideshow(shirtSlideshow2)

$('#testButton').click(()=>{
    console.log('test button clicked')
    // shirtSlideshow2.removeSlide(shirtBlue2)
})

// NOTES: can't use same slide in different slideshows,