// js file that uses the library
"use strict"


// -----------------------------ONLY BACKGROUND SLIDE EXAMPLE------------------------------
const image1URL = 'https://images.unsplash.com/photo-1547103106-9a0e718bb2d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=686&q=80'
const image2URL = 'https://images.unsplash.com/photo-1548133650-7e2b96ebe5e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=681&q=80'
const image3URL = 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'

const bg1 = new BackgroundSlide(image1URL, 'image 1', 'bg_10')
const bg2 = new BackgroundSlide(image2URL, 'image 2', 'bg_11')
const bg3 = new BackgroundSlide(image3URL, 'image 3', 'bg_12')

const bgSlideshow = new BackgroundSlideshow('bg-slideshow', [bg1, bg2, bg3],  {height: "500px", width: "500px"})

const onlyBgSlideshowContainer = new SlideshowContainer('only-bg-slideshow-container', 'only-slideshow-div', bgSlideshow)


const textSlide1 = new TextSlide( "this is test1", 20, 'ts_1')
const textSlide2 = new TextSlide( "this is test2", 20, 'ts_2')

const textSlideshow = new ForegroundSlideshow('text-slide', [textSlide1, textSlide2], {height: "100px"} )

onlyBgSlideshowContainer.addForegroundSlideshow(textSlideshow)


let isAutoScroll = false
$('#autoscroll-btn').click(()=>{
    if (isAutoScroll){
        bgSlideshow.removeAutoScroll()
    }
    else{
        bgSlideshow.addAutoScroll(2000)
    }

    isAutoScroll = !isAutoScroll
    
})


// ---------------------------END ONLY BACKGROUND SLIDE EXAMPLE-----------------------------




// --------------------------------CLOTHES SLIDESHOW--------------------------------
// background:
const clothesBgSlides = []
const numClothesBgSlides = 7
// make background slide objects
for (let i = 1; i <= numClothesBgSlides; i++){
    clothesBgSlides.push(new BackgroundSlide(`../images/clothes/bg/bg${i}.png`, 'person outline', `clothing-bg${i}`))
}
const clothesBgSlideshow = new BackgroundSlideshow('clothes-bg-slideshow', clothesBgSlides, {height: "500px"})

// foreground:
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

$('#random-btn').click(()=>{
    console.log('random slides clothes')
    clothesSlideshowContainer.randomSlides()
})
// --------------------------------END CLOTHES SLIDESHOW--------------------------------

// --------------------------------GIFT SLIDESHOW--------------------------------
const giftBoxSlides = []
const numBoxes = 6
for (let i = 1; i <= numBoxes; i++){
    giftBoxSlides.push(new BackgroundSlide(`../images/gift/box/box${i}.png`, 'box', `gift-box${i}`))
}
const giftBoxSlideshow = new BackgroundSlideshow('gift-boxes-slideshow', giftBoxSlides, {height: "400px"})

const giftPaperSlides = []
const numPaper = 5
for (let i = 1; i <= numPaper; i++){
    giftPaperSlides.push(new ForegroundSlide(`../images/gift/paper/paper${i}.png`, 'crinkle packing paper', `gift-paper${i}`))
}
const giftPaperSlideshow = new ForegroundSlideshow('gift-paper-slideshow', giftPaperSlides, {height: "300px", marginLeft: "60px"})


const bearURLs = ['https://purepng.com/public/uploads/large/purepng.com-teddy-bearobjectstoybearteddy-beardoll-631521882725jykyi.png',
    'https://purepng.com/public/uploads/large/pink-teddy-bear-y1k.png',
    'https://purepng.com/public/uploads/large/purepng.com-teddy-bearobjectstoybearteddy-beardoll-631521882709zx0uu.png',
    'https://purepng.com/public/uploads/large/purepng.com-teddy-bearobjectstoybearobjectdoll-63152188394154png.png'
    ]
const giftBearSlides = []
const numBear = 4
for (let i = 0; i < numBear; i++){
    giftBearSlides.push(new ForegroundSlide(bearURLs[i], 'bear', `gift-bear${i}`))
}
const giftBearSlideshow = new ForegroundSlideshow('gift-bear-slideshow', giftBearSlides, {height: "160px", marginLeft: "115px", })


const cupURLs = ['https://purepng.com/public/uploads/large/purepng.com-cupcupopen-containertablewarecarrying-drinksceramic-cup-1701528266244lgzbl.png',
    'https://purepng.com/public/uploads/large/purepng.com-cupcupopen-containertablewarecarrying-drinksceramic-cup-1701528266193sfx1o.png',
    'https://purepng.com/public/uploads/large/purepng.com-cup-mug-coffeecupmufcoffeebean-1411527406382vrz4g.png'
    ]
const giftCupSlides = []
const numCup = 3
for (let i = 0; i < numCup; i++){
    giftCupSlides.push(new ForegroundSlide(cupURLs[i], 'cup', `gift-cup${i}`))
}
const giftCupSlideshow = new ForegroundSlideshow('gift-cup-slideshow', giftCupSlides, {height: "90px",marginTop: "145px", marginLeft: "150px" })

const scarfURLs = ['https://purepng.com/public/uploads/large/simple-square-handkerchief-flu.png',
    'https://purepng.com/public/uploads/large/gingham-revolution-handkerchief-wxp.png',
    'https://purepng.com/public/uploads/large/white-hand-rolled-men-handkerchief-2o0.png',
    'https://purepng.com/public/uploads/large/flowers-square-handkerchief-ksm.png',
]
const giftScarfSlides = []
const numScarf = 4
for (let i = 0; i < numScarf; i++){
    giftScarfSlides.push(new ForegroundSlide(scarfURLs[i], 'scarf', `gift-scarf${i}`))
}
const giftScarfSlideshow = new ForegroundSlideshow('gift-scarf-slideshow', giftScarfSlides, {height: "110px", marginTop: "90px", marginLeft: "265px"})


const giftSlideshowContainer = new SlideshowContainer('gift-slideshow-container', 'gift-slideshow-div', giftBoxSlideshow, giftPaperSlideshow)
giftSlideshowContainer.addForegroundSlideshow(giftBearSlideshow)
giftSlideshowContainer.addForegroundSlideshow(giftCupSlideshow)
giftSlideshowContainer.addForegroundSlideshow(giftScarfSlideshow)
//--------------------------------END GIFTS SLIDESHOW----------------------------------


