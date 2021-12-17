


const landingImageURLs = [
    'https://images.unsplash.com/photo-1639657742894-f77323974ed0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
    'https://images.unsplash.com/photo-1635758242813-8513cb5a06ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1852&q=80',
    'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
    'https://images.unsplash.com/photo-1636829092009-0d7f5723877a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80',
    'https://images.unsplash.com/photo-1637295660413-2eb42a394d08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    'https://images.unsplash.com/photo-1636850642710-6153d2e764e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    'https://images.unsplash.com/photo-1636455948165-15568156a647?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80',
]
// make slides
const landingSlides = []
for (let i = 0; i < landingImageURLs.length; i++ ){
    landingSlides.push(new BackgroundSlide(landingImageURLs[i], 'nature image', `landing-slide${i}`))
}
// add slides to slideshow
const landingSlideshow = new BackgroundSlideshow('landing-slideshow','150vh', landingSlides)


const subtitles = [
    'Create and style slideshows overlaid on top of one another',
    'Subtitle2',
    'Subtitle3',
]
const subtitleSlides = []
for (let i = 0; i < subtitles.length; i++ ){
    subtitleSlides.push(new TextSlide(subtitles[i], '26px', `subtitle-slide${i}`))
}
const subtitleSlideshow = new ForegroundSlideshow('subtitle-slideshow','50px', subtitleSlides)


const landingSlideshowContainer = new SlideshowContainer('landing-slideshow-container', 'landing-page-main', landingSlideshow, subtitleSlideshow)


// autoscroll
landingSlideshow.addAutoScroll(7000)
landingSlideshow.hideArrows()
subtitleSlideshow.addAutoScroll(7000)