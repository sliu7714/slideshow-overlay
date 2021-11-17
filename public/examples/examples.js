// js file that uses the library
"use strict"

const image1URL = 'https://images.unsplash.com/photo-1547103106-9a0e718bb2d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=686&q=80'
const image2URL = 'https://images.unsplash.com/photo-1548133650-7e2b96ebe5e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=681&q=80'
const image3URL = 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'

const bg1 = new Background(image1URL, 'image 1', 'bg_10')
const bg2 = new Background(image2URL, 'image 2', 'bg_11')
const bg3 = new Background(image3URL, 'image 3', 'bg_12')

const bgSlideshow = new BackgroundSlideshow('bgs_1', bg1, 'testDiv')
bgSlideshow.addBackground(bg2)
bgSlideshow.addBackground(bg3)

$('#testButton').click(()=>{
    console.log('test button clicked')
})