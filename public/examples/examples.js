// example page 
"use strict"

hljs.highlightAll(); // using the external library https://highlightjs.org/ for syntax highlighting in code blocks


// handle show code buttons
$(".code-btn").on('click', function () {
    // select the next "pre" element immediately following this button
    $(this).next("pre").toggle()

    if($(this).next("pre").is(':visible')){
        $(this).html("Hide Code")
    }
    else if($(this).next("pre").is(':hidden')){
        $(this).html("Show Code")
    }
})

// -----------------------------SIMPLE BACKGROUND SLIDE EXAMPLE------------------------------
const imageURLs = [
    'https://images.unsplash.com/photo-1639516510662-4c3a3e13feff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1635353679604-abc3f9f9d9d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1547103106-9a0e718bb2d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    'https://images.unsplash.com/photo-1568751302461-fc6f40fa9382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
]
const bgSlides = []
// create the background slides
for (let i = 0; i < imageURLs.length; i ++){
    bgSlides.push(new BackgroundSlide(imageURLs[i], 'nature photo', `bg_${i}`))
}

// add slides to background slideshow
const bgSlideshow = new BackgroundSlideshow('bg-slideshow', bgSlides, {height: "500px"})

// add only the background slideshow to DOM 
const simpleExampleSlideshowContainer = new SlideshowContainer('simple-ex-slideshow-container', 'simple-example-slideshow-div', bgSlideshow)

const greetingText = ["Hello", "Bonjour", "Ciao", "Hola"]
const textSlides = []
// create the foreground text slides
for (let i = 0; i < greetingText.length; i ++){
    textSlides.push(new TextSlide(greetingText[i], 30, `greeting${i}`))
}

// add slides to foreground slideshow
const textSlideshow = new ForegroundSlideshow('text-greeting-slideshow', textSlides, {height: "100px", width: "390px", marginTop: "120px"} )


let isTextSlideshowAdded = false
$('#toggle-text-slideshow').click(function(){
    if (!isTextSlideshowAdded){
        // add slideshow to the slideshow container
        simpleExampleSlideshowContainer.addForegroundSlideshow(textSlideshow)
        $(this).html('Remove foreground text slideshow')
    }
    else{
        // remove slideshow from the slideshow container
        simpleExampleSlideshowContainer.removeForegroundSlideshow(textSlideshow)
        $(this).html('Add foreground text slideshow')
    }
    isTextSlideshowAdded = !isTextSlideshowAdded
})





let isAutoScroll = false
$('#autoscroll-btn').click(function(){
    if (isAutoScroll){
        // turn auto scroll off
        bgSlideshow.removeAutoScroll()
        $(this).html('start auto-scroll')
    }
    else{
        // set auto scroll to change slide every 2 seconds
        bgSlideshow.addAutoScroll(2000)
        $(this).html('stop auto-scroll')
    }
    isAutoScroll = !isAutoScroll
})




// ---------------------------END -SIMPLE BACKGROUND SLIDE EXAMPLE-----------------------------




// --------------------------------CLOTHES SLIDESHOW--------------------------------
// BACKGROUND SLIDESHOW SETUP
const clothesBgSlides = []
const numClothesBgSlides = 7
// make background slide objects
for (let i = 1; i <= numClothesBgSlides; i++){
    clothesBgSlides.push(new BackgroundSlide(`../images/clothes/bg/bg${i}.png`, 'person outline', `clothing-bg${i}`))
}
// make backgroundSlideshow
const clothesBgSlideshow = new BackgroundSlideshow('clothes-bg-slideshow', clothesBgSlides, {height: "500px"})

// FOREGROUND SLIDESHOW SETUP
const clothesTopsSlides = []
const numTops = 8
for (let i = 1; i <= numTops; i++){
    clothesTopsSlides.push(new ForegroundSlide(`../images/clothes/tops/top${i}.png`, 'shirt', `clothing-top${i}`))
}
const clothesTopsSlideshow = new ForegroundSlideshow('clothes-tops-slideshow', clothesTopsSlides,{height: "145px", marginTop: "100px", marginLeft: "40px" })

const clothesBottomsSlides = []
const numBottoms = 5
for (let i = 1; i <= numBottoms; i++){
    clothesBottomsSlides.push(new ForegroundSlide(`../images/clothes/bottoms/bottom${i}.png`, 'clothing bottom', `clothing-bottom${i}`))
}
const clothesBottomsSlideshow = new ForegroundSlideshow('clothes-bottoms-slideshow', clothesBottomsSlides, {height: "245px", marginTop: "200px", marginLeft: "38px"})

const clothesShoesSlides = []
const numShoes = 3
for (let i = 1; i <= numShoes; i++){
    clothesShoesSlides.push(new ForegroundSlide(`../images/clothes/shoes/shoe${i}.png`, 'shoe', `clothing-shoe${i}`))
}
const clothesShoesSlideshow = new ForegroundSlideshow('clothes-shoes-slideshow', clothesShoesSlides, {height: "150px", marginTop: "350px", marginLeft: "40px"})

// Add foreground and background slideshows to DOM
const clothesSlideshowContainer = new SlideshowContainer('clothes-slideshow-container', 'clothing-slideshow-div', clothesBgSlideshow, clothesTopsSlideshow)
clothesSlideshowContainer.addForegroundSlideshow(clothesBottomsSlideshow)
clothesSlideshowContainer.addForegroundSlideshow(clothesShoesSlideshow)

// buttons to show some additional functionality
$('#order-fwd-btn').click(()=>{
    console.log('bottoms order forward')
    // move skirt/pants slideshow forward one layer
    clothesBottomsSlideshow.orderForward()
})
$('#order-back-btn').click(()=>{
    console.log('bottoms order backwards')
    // move skirt/pants slideshow backwards one layer
    clothesBottomsSlideshow.orderBackward()
})
$('#remove-shoe-btn').click(()=>{
    console.log('remove white shoes from shoe slideshow')
    const whiteShoesSlide = clothesShoesSlides[2]
    // remove white shoes from shoe slideshow
    clothesShoesSlideshow.removeSlide(whiteShoesSlide)
})
// create new slide for brown pants
const brownPantsSlide = new ForegroundSlide(`../images/clothes/bottoms/bottom6.png`, 'brown pants', `clothing-bottom6`)
$('#add-pants-btn').click(()=>{
    console.log('add brown pants to bottoms slideshow')
    // add brown pants slide to bottoms slideshow
    clothesBottomsSlideshow.addSlide(brownPantsSlide)
})

$('#random-outfit-btn').click(()=>{
    console.log('random slides outfit')
    // change all the slideshows in a slideshow container to a random slide
    clothesSlideshowContainer.randomSlides()
})
$('#random-shirt-btn').click(()=>{
    console.log('random slides shirt')
    // change a single slideshow to a random slide
    clothesTopsSlideshow.randomSlide()
})
// --------------------------------END CLOTHES SLIDESHOW--------------------------------

// --------------------------------GIFT SLIDESHOW--------------------------------
const giftBoxSlides = []
const numBoxes = 6
for (let i = 1; i <= numBoxes; i++){
    giftBoxSlides.push(new BackgroundSlide(`../images/gift/box/box${i}.png`, 'box', `gift-box${i}`))
}
const giftBoxSlideshow = new BackgroundSlideshow('gift-boxes-slideshow', giftBoxSlides, {height: "500px"})

const giftPaperSlides = []
const numPaper = 5
for (let i = 1; i <= numPaper; i++){
    giftPaperSlides.push(new ForegroundSlide(`../images/gift/paper/paper${i}.png`, 'crinkle packing paper', `gift-paper${i}`))
}
const giftPaperSlideshow = new ForegroundSlideshow('gift-paper-slideshow', giftPaperSlides, {height: "373px", marginLeft: "76px", arrowVariant: 2, arrowColor: "#ff6347"})


const bearURLs = ['https://purepng.com/public/uploads/large/purepng.com-teddy-bearobjectstoybearteddy-beardoll-631521882725jykyi.png',
    'https://purepng.com/public/uploads/large/pink-teddy-bear-y1k.png',
    'https://purepng.com/public/uploads/large/purepng.com-teddy-bearobjectstoybearteddy-beardoll-631521882709zx0uu.png',
    'https://purepng.com/public/uploads/large/purepng.com-teddy-bearobjectstoybearobjectdoll-63152188394154png.png'
    ]
const giftBearSlides = []
for (let i = 0; i < bearURLs.length; i++){
    giftBearSlides.push(new ForegroundSlide(bearURLs[i], 'bear', `gift-bear${i}`))
}
const giftBearSlideshow = new ForegroundSlideshow('gift-bear-slideshow', giftBearSlides, {height: "180px", marginLeft: "190px", onlyShowArrowOnHover: true , arrowVariant: 3, arrowColor: "deepskyblue"})


const scarfURLs = ['https://purepng.com/public/uploads/large/simple-square-handkerchief-flu.png',
    'https://purepng.com/public/uploads/large/gingham-revolution-handkerchief-wxp.png',
    'https://purepng.com/public/uploads/large/white-hand-rolled-men-handkerchief-2o0.png',
    'https://purepng.com/public/uploads/large/flowers-square-handkerchief-ksm.png',
]
const giftScarfSlides = []
for (let i = 0; i < scarfURLs.length; i++){
    giftScarfSlides.push(new ForegroundSlide(scarfURLs[i], 'scarf', `gift-scarf${i}`))
}
const giftScarfSlideshow = new ForegroundSlideshow('gift-scarf-slideshow', giftScarfSlides, {height: "120px", marginTop: "110px", marginLeft: "380px", onlyShowArrowOnHover: true,  arrowVariant: 3, arrowColor: "hotpink"})


const cupURLs = ['https://purepng.com/public/uploads/large/purepng.com-cupcupopen-containertablewarecarrying-drinksceramic-cup-1701528266244lgzbl.png',
    'https://purepng.com/public/uploads/large/purepng.com-cupcupopen-containertablewarecarrying-drinksceramic-cup-1701528266193sfx1o.png',
    'https://purepng.com/public/uploads/large/purepng.com-cup-mug-coffeecupmufcoffeebean-1411527406382vrz4g.png'
    ]
const giftCupSlides = []
for (let i = 0; i < cupURLs.length; i++){
    giftCupSlides.push(new ForegroundSlide(cupURLs[i], 'cup', `gift-cup${i}`))
}
const giftCupSlideshow = new ForegroundSlideshow('gift-cup-slideshow', giftCupSlides, {height: "110px",marginTop: "190px", marginLeft: "240px" , onlyShowArrowOnHover: true, arrowVariant: 3, arrowColor: "greenyellow"})

const giftSlideshowContainer = new SlideshowContainer('gift-slideshow-container', 'gift-slideshow-div', giftBoxSlideshow, giftPaperSlideshow)
giftSlideshowContainer.addForegroundSlideshow(giftBearSlideshow)
giftSlideshowContainer.addForegroundSlideshow(giftCupSlideshow)
giftSlideshowContainer.addForegroundSlideshow(giftScarfSlideshow)
//--------------------------------END GIFTS SLIDESHOW----------------------------------


