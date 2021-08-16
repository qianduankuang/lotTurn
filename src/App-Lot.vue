<template>
  <router-view/>
</template>
<script>
import {Howl, Howler} from 'howler'

export default {
  data(){
    return {
      isOpenMusic: false
    }
  },
  mounted(){
    var sound = new Howl({
      src: [require('./assets/img/lot/lot-bg.mp3')],
      //autoplay: true,
      loop: true,
    })
    window.musicOpen = () => {
      if(this.isOpenMusic) return
      sound.play()
      this.isOpenMusic = true
    }
    window.musicStop = () => {
      sound.stop()
      this.isOpenMusic = false
    }
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
body,html{
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}
a{
  text-decoration: none;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
</style>
