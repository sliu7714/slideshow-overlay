# Overlay Slideshow

CSC309 Fall 2021 Individual Project

**link to the landing page:** https://csc309-overlay-slideshow.herokuapp.com/

**Link to documentation:** https://csc309-overlay-slideshow.herokuapp.com/examples/documentation.html

## Getting started

To use the library, include these scripts:

```
< link rel="stylesheet" href="'<...path to overlaySlideshowStyles.css>">
< script src="<...path to overlaySlideshow.js>"> 
```

### Creating Slides 

Before creating a slideshow, you must create slides first. 

There are 3 types of slides, 
* BackgroundSlides contain images and can be added to BackgroundSlideshows 
* ForegroundSlides contain images and can be added to ForegroundSlideshows 
* TextSlides contain text and can be added to ForegroundSlideshows 
  
Here is an example of creating a simple BackgroundSlide instance,

```
const backgroundSlide = new BackgroundSlide('<alt text="" for="" image="">', '<...path to image>', 'background-slide-element-id' )
```

### Creating Slideshows 

After creating the slide instances, you can create slideshows (BackgroundSlideshow or ForegroundSlideshow) 

Here is an example of creating a simple BackgroundSlideshow instance
```
const backgroundSlideshow = new BackgroundSlideshow('background-slideshow-element-id', [...list of BackgroundSlide instances], {...options})
```
 ***Note:*** each slideshow must contain at least one slide and slide instances cannot be used in more than one slideshow. 


### Adding to SlideshowContainers 

Finally, after creating Slideshow instances, you may create a SlideshowContainer to add the slideshows to the DOM 

```
const slideshowContainer = new SlideshowContainer(
                                'slideshow-container-element-id', 
                                '<id of element to append this SlideshowContainer element to>', 
                                <BackgroundSlideshow instance>, 
                                <ForegroundSlideshow instance>(optional)
                                )
```
SlideshowContainers can only contain one BackgroundSlideshow, but they may contain zero or more ForegroundSlideshows

## Description and Use Cases

This is a slideshow-like library that is intended to be used with transparent images, stacked in rows on top of each other, over other custom background images that can also be changed. The functionality this library will provide is the ability to multiple layers of slideshows on top of each other. The background is one layer and the foreground layers on top contain additional slideshows. Developers will be able to create custom sizes and arrangements of these slideshows and be able to easily add/remove/style elements in the slideshow.  End users will be able to navigate through the different options for each slideshow and click through different backgrounds as well. 

This library could be used in a web app that allows users to upload different items of clothing that they own into different slideshow elements to look through outfit options that may be good for specific weather or events. 

This library would also be useful in an online shop for shoppers to see different combinations of items to see how they would look paired with each other. Like the previous example, users could navigate through different clothing items to find a shirt that looks good with the pants that they are buying, as well as navigate through different models in the background to see if the clothing looks good with the user’s skin tone, but this feature could also be used for other types of items as well. For a custom gift box, users would be able to navigate through different items included inside the box and also navigate through the background to choose a box design. 

Another use case of this library could be for character/object customization in games.


## Additional Notes

The only external library used in the overlay slideshow library is `jquery`. 

In the example web pages, the library https://highlightjs.org/ is used for syntax highlighting in the code blocks.

icons (forward and backwards arrow) from iconmonstr.com

Sources for the photos used in the example page:
* https://unsplash.com/ 
* https://www.freeimages.com/ 
* https://www.pexels.com/creative-commons-images/ 
* https://purepng.com/
* (clothing example drawings created by me)


