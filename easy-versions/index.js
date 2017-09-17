var musicList = [
    {
      src: 'http://ws.stream.qqmusic.qq.com/1913719.m4a?fromtag=46',
      title: '想你的夜',
      author: '关喆'
    },
    {
      src: 'http://ws.stream.qqmusic.qq.com/1803555.m4a?fromtag=46',
      title: '怒放的生命',
      author: '汪峰'
    } 
]

var backBtn = document.querySelector('.musicbox .back')
var playBtn = document.querySelector('.musicbox .play')
var forwardBtn = document.querySelector('.musicbox .forward')
var titleNode = document.querySelector('.musicbox .title')
var authorNode = document.querySelector('.musicbox .author')
var timeNode = document.querySelector('.musicbox .time')
var progressBarNode = document.querySelector('.musicbox .progress .bar')
var progressNowNode = document.querySelector('.musicbox .progress-now')
var timer

var music = new Audio()
music.autoplay = true
var musicIndex = 0

loadMusic(musicList[musicIndex])

//初始化音乐
function loadMusic(songObj){
    music.src = songObj.src
    titleNode.innerText = songObj.title
    authorNode.innerText = songObj.author
}

//开始暂停
playBtn.onclick = function(){
    var icon = this.querySelector('.fa')
    if(icon.classList.contains('fa-play')){
        music.play()
    }else{
        music.pause()
    }
    icon.classList.toggle('fa-play')
    icon.classList.toggle('fa-pause')
}

//下一首
forwardBtn.onclick = loadNextMusic

function loadNextMusic(){
    musicIndex++
    musicIndex = musicIndex%musicList.length
    loadMusic(musicList[musicIndex])
}

backBtn.onclick = loadLastMusic

//上一首
function loadLastMusic(){
    musicIndex--
    musicIndex = (musicIndex+musicList.length)%musicList.length
    loadMusic(musicList[musicIndex])
}

music.onended = loadNextMusic

//进度条一秒刷新一次
music.onplaying = function(){
    timer = setInterval(function(){
        updateProgress()
    },1000)
    console.log('play')
}
music.onpause = function(){
    console.log('pause')
    clearInterval(timer)
} 

//music.currentTime 是目前歌曲的进度
//music.duration 是总时长
function updateProgress(){
    var percent = (music.currentTime/music.duration)*100+'%'
    progressNowNode.style.width = percent

    var minutes = parseInt(music.currentTime/60)
    var seconds = parseInt(music.currentTime%60) + '' //为什么要加一个''？因为要转成字符串
    seconds = seconds.length == 2 ? seconds : '0' + seconds
    timeNode.innerText = minutes + ':' + seconds
}

//The offsetX read-only property of the MouseEvent interface provides the offset in the X coordinate of the mouse pointer between that event and the padding edge of the target node. 
progressBarNode.onclick = function(e){
    var percent = e.offsetX/parseInt(getComputedStyle(this).width)
    music.currentTime = percent * music.duration
    progressNowNode.style.width = percent * 100 + '%'
}
