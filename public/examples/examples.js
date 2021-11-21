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

// const bg4 = new BackgroundSlide(image1URL, 'image 1', 'bg_13')
// const bg5 = new BackgroundSlide(image2URL, 'image 2', 'bg_14')
// const bg6 = new BackgroundSlide(image3URL, 'image 3', 'bg_15')
//
// const bgSlideshow2 = new BackgroundSlideshow('bgs_2','500px', bg6)
// bgSlideshow2.addSlide(bg4)
// bgSlideshow2.addSlide(bg5)


const bgSlideshow = new BackgroundSlideshow('bgs_1','500px', bg1)
bgSlideshow.addSlide(bg2)
bgSlideshow.addSlide(bg3)

const shirtBlack = new ForegroundSlide(blackShirtURL, 'black shirt', 'shirt_black_1')
const shirtBlue = new ForegroundSlide(blueShirtURL, 'blue shirt', 'shirt_blue_1')
const shirtWhite = new ForegroundSlide(whiteShirtURL, 'white shirt', 'shirt_white_1')
const shirtBrown = new ForegroundSlide(brownShirtURL, 'brown shirt', 'shirt_brown_1')
const shirtGreen = new ForegroundSlide(greenShirtURL, 'green shirt', 'shirt_green_1')
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




// CLOTHES SLIDESHOW

// background:
const clothesBgSlides = []
const numClothesBgSlides = 7
// make background slide objects
for (let i = 1; i <= numClothesBgSlides; i++){
    clothesBgSlides.push(new BackgroundSlide(`../images/clothes/bg/bg${i}.png`, 'person outline', `clothing-bg${i}`))
}
const clothesBgSlideshow = new BackgroundSlideshow('clothes-bg-slideshow', '500px', clothesBgSlides[0])
clothesBgSlideshow.addSlides(clothesBgSlides.slice(1))

// foreground:
// TODO - temp use shirtslideshow 2
const clothesTopsSlides = []
const numTops = 8
for (let i = 1; i <= numTops; i++){
    clothesTopsSlides.push(new ForegroundSlide(`../images/clothes/tops/top${i}.png`, 'shirt', `clothing-top${i}`))
}
const clothesTopsSlideshow = new BackgroundSlideshow('clothes-tops-slideshow', '145px', clothesTopsSlides[0])
clothesTopsSlideshow.addSlides(clothesTopsSlides.slice(1))

const clothesBottomsSlides = []
const numBottoms = 5
for (let i = 1; i <= numBottoms; i++){
    clothesBottomsSlides.push(new ForegroundSlide(`../images/clothes/bottoms/bottom${i}.png`, 'clothing bottom', `clothing-bottom${i}`))
}
const clothesBottomsSlideshow = new BackgroundSlideshow('clothes-bottoms-slideshow', '245px', clothesBottomsSlides[0])
clothesBottomsSlideshow.addSlides(clothesBottomsSlides.slice(1))

const clothesShoesSlides = []
const numShoes = 3
for (let i = 1; i <= numShoes; i++){
    clothesShoesSlides.push(new ForegroundSlide(`../images/clothes/shoes/shoe${i}.png`, 'clothing bottom', `clothing-bottom${i}`))
}
const clothesShoesSlideshow = new BackgroundSlideshow('clothes-shoes-slideshow', '150px', clothesShoesSlides[0])
clothesShoesSlideshow.addSlides(clothesShoesSlides.slice(1))

// container for bg and foreground:
const clothesSlideshowContainer = new SlideshowContainer('clothes-slideshow-container', 'testDiv', clothesBgSlideshow, clothesTopsSlideshow)
clothesSlideshowContainer.addForegroundSlideshow(clothesBottomsSlideshow)
clothesSlideshowContainer.addForegroundSlideshow(clothesShoesSlideshow)

$('#order-fwd-btn').click(()=>{
    console.log('bottoms forward')
    clothesBottomsSlideshow.orderForward()
})
$('#order-back-btn').click(()=>{
    console.log('bottoms backwards')
    clothesBottomsSlideshow.orderBackward()
})