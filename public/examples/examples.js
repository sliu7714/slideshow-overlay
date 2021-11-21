// js file that uses the library
"use strict"


// ONLY BACKGROUND SLIDE EXAMPLE
const image1URL = 'https://images.unsplash.com/photo-1547103106-9a0e718bb2d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=686&q=80'
const image2URL = 'https://images.unsplash.com/photo-1548133650-7e2b96ebe5e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=681&q=80'
const image3URL = 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'

const bg1 = new BackgroundSlide(image1URL, 'image 1', 'bg_10')
const bg2 = new BackgroundSlide(image2URL, 'image 2', 'bg_11')
const bg3 = new BackgroundSlide(image3URL, 'image 3', 'bg_12')

const bgSlideshow = new BackgroundSlideshow('bg-slideshow','500px', bg1)
bgSlideshow.addSlide(bg2)
bgSlideshow.addSlide(bg3)

const onlyBgSlideshowContainer = new SlideshowContainer('only-bg-slideshow-container', 'only-slideshow-div', bgSlideshow)
// END ONLY BACKGROUND SLIDE EXAMPLE




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
const clothesTopsSlides = []
const numTops = 8
for (let i = 1; i <= numTops; i++){
    clothesTopsSlides.push(new ForegroundSlide(`../images/clothes/tops/top${i}.png`, 'shirt', `clothing-top${i}`))
}
const clothesTopsSlideshow = new ForegroundSlideshow('clothes-tops-slideshow', '145px', clothesTopsSlides[0])
clothesTopsSlideshow.addSlides(clothesTopsSlides.slice(1))

const clothesBottomsSlides = []
const numBottoms = 5
for (let i = 1; i <= numBottoms; i++){
    clothesBottomsSlides.push(new ForegroundSlide(`../images/clothes/bottoms/bottom${i}.png`, 'clothing bottom', `clothing-bottom${i}`))
}
const clothesBottomsSlideshow = new ForegroundSlideshow('clothes-bottoms-slideshow', '245px', clothesBottomsSlides[0])
clothesBottomsSlideshow.addSlides(clothesBottomsSlides.slice(1))

const clothesShoesSlides = []
const numShoes = 3
for (let i = 1; i <= numShoes; i++){
    clothesShoesSlides.push(new ForegroundSlide(`../images/clothes/shoes/shoe${i}.png`, 'shoe', `clothing-shoe${i}`))
}
const clothesShoesSlideshow = new ForegroundSlideshow('clothes-shoes-slideshow', '150px', clothesShoesSlides[0])
clothesShoesSlideshow.addSlides(clothesShoesSlides.slice(1))

// container for bg and foreground:
const clothesSlideshowContainer = new SlideshowContainer('clothes-slideshow-container', 'clothing-slideshow-div', clothesBgSlideshow, clothesTopsSlideshow)
clothesSlideshowContainer.addForegroundSlideshow(clothesBottomsSlideshow)
clothesSlideshowContainer.addForegroundSlideshow(clothesShoesSlideshow)

// buttons to show some additional functionality
$('#order-fwd-btn').click(()=>{
    console.log('bottoms order forward')
    clothesBottomsSlideshow.orderForward()
})
$('#order-back-btn').click(()=>{
    console.log('bottoms order backwards')
    clothesBottomsSlideshow.orderBackward()
})
$('#remove-shoe-btn').click(()=>{
    console.log('remove white shoes from shoe slideshow')
    clothesShoesSlideshow.removeSlide(clothesShoesSlides[2])
})
// END CLOTHES SLIDESHOW


// $('#testButton').click(()=>{
//     console.log('test button clicked')
// })