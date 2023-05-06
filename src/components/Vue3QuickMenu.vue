<template>
  <div class="quick-menu" ref="quickMenu" :style="quickMenuStyle">
    <div v-for="(n, key) in menuCount" :key="key" class="menu-item" :style="getSubMenuStyle(n-1)"  :ref="'quickMenuItem_'+ key" :id="'quickMenuItem_'+ key">

      <router-link v-if="urlsData[n-1].type === 'routeLink'" :to="urlsData[n-1].type" :target="urlsData[n-1].target" :style="itemMenuStyle" @mouseover.stop="mouseEnterSubMenu" @mouseout.stop="mouseOutSubMenu" :class="linkIconClassList[n-1]" ref="link"  :title=$t(itemTitleList[n-1]) v-tooltip="tooltipData[n-1]">
        <svg-icon :name="iconNameList[n-1]" />
      </router-link>
      <a v-else-if="urlsData[n-1].type === 'external'" :target="urlsData[n-1].target" :href="urlsData[n-1].url" :style="itemMenuStyle" @mouseover.stop="mouseEnterSubMenu" @mouseout.stop="mouseOutSubMenu" :class="linkIconClassList[n-1]" ref="link"  :title=$t(itemTitleList[n-1]) v-tooltip="tooltipData[n-1]">
        <svg-icon :name="iconNameList[n-1]" />
      </a>
      <a v-else :target="urlsData[n-1].target" :style="itemMenuStyle"  @mouseover.stop="mouseEnterSubMenu" @mouseout.stop="mouseOutSubMenu" @click="processCallback(key)" :class="linkIconClassList[n-1]" ref="link" :title=$t(itemTitleList[n-1]) v-tooltip="tooltipData[n-1]">
        <svg-icon :name="iconNameList[n-1]" />
      </a>

    </div>

    <div class='menu' :style="buttonStyle">
      <div class='core-menu' @click="toggleMenu">
        <div class='bar'></div>
      </div>
    </div>
  </div>
</template>

<script>

import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    menuCount:{
      type: Number,
      required: true,
      default:4
    },
    linkIconClassList:{
      type:Array,
      required: true
    },
    itemTitleList:{
      type:Array,
      required: true
    },
    tooltipData:{
      type:Array,
      required: true
    },
    iconNameList:{
      type:Array,
      required: true
    },
    urlsData:{
      type:Array,
      required: true
    },
    backgroundColor:{
      type:String,
      default:'#20babb'
    },
    color:{
      type:String,
      default:'#fff'
    },
    position:{
      type:String,
      default:'top-left'
    }
  },
  setup(props) {

    const isTop = computed(() => {
      return props.position.includes('top');
    });

    const isLeft = computed(() => {
      return props.position.includes('left');
    });

    const quickMenuStyle = computed(() => {
      const topPosition = {top:'30px'},
          bottomPosition={bottom:'30px'},
          leftPosition = {left:'30px'},
          rightPosition = {right:'30px'}

      let style = isTop.value ? topPosition:bottomPosition
      Object.assign(style, isLeft.value ? leftPosition : rightPosition)
      Object.assign(style,{transform: isLeft.value ? "rotate(-180deg)" : "rotate(180deg)"})
      return style
    });

    const buttonStyle = computed(() => {
      return {
        backgroundColor: props.backgroundColor,
        color: props.color
      }
    });


    const itemMenuStyle = computed(() => {
      const style = {
        backgroundColor: props.backgroundColor,
        color: props.color
      }
      return style
    });

    const menuSize = 60;
    const subMenu4 = [[["0","-160"],["-80","-138.6"],["-138.6","-80"],["-160","0"]],[["0","-160"],["80", "-138.6"],["138.6","-80"],["160","0"]],[["0","160"],["138.6","80"],["80","138.6"],["160","0"]],[["-160","0"],["-138.6","80"],["-80","138.6"],["0","160"]]];
    const subMenu3 = [[["-160","0"],["-113","-113"],["0","-160"]],[["0","-160"],["113","-113"],["160","0"]],[["0","160"],["113","113"],["160","0"]],[["-160","0"],["-113","113"],["0","160"]]];
    const subMenu2 = [[["-160","0"],["0","-160"]],[["0","-160"],["160","0"]],[["0","160"],["160","0"]],[["-160","0"],["0","160"]]];


    return {
      isTop: isTop.value,
      isLeft: isLeft.value,
      quickMenuStyle: quickMenuStyle.value,
      buttonStyle: buttonStyle.value,
      itemMenuStyle: itemMenuStyle.value,
      menuCount: props.menuCount,
      linkIconClassList: props.linkIconClassList,
      itemTitleList: props.itemTitleList,
      tooltipData: props.tooltipData,
      iconNameList: props.iconNameList,
      urlsData: props.urlsData,
      backgroundColor: props.backgroundColor,
      color: props.color,
      menuSize: menuSize,
      subMenu4: subMenu4,
      subMenu3: subMenu3,
      subMenu2: subMenu2
    };
  },
  methods:{
    getSubMenuStyle(n){
      let menuPosition = this.menuCount===4 ? this.subMenu4 : this.menuCount===3 ? this.subMenu3 : this.subMenu2
      menuPosition = this.isTop && this.isLeft ? menuPosition[2] : this.isTop && !this.isLeft ? menuPosition[1]: !this.isTop && this.isLeft ? menuPosition[3] : menuPosition[0]
      return {top:menuPosition[n][0]+'px',left:menuPosition[n][1]+'px'}
    },
    toggleMenu(e){
      let menuEl = this.$refs.quickMenu;
      let menuIconEl = this.$refs.link
      if(!~menuEl.className.indexOf(' active')){
        menuEl.className += ' active';
        menuIconEl.forEach( function(element, index) {
          element.className += ' menu-animate';
        });
      } else {
        menuEl.className = menuEl.className.replace(' active','')
        menuIconEl.forEach( function(element, index) {
          element.className = element.className.replace(' menu-animate','')
        });
      }

    },
    processCallback(key){
      this.$emit('process',key)
    },
    mouseEnterSubMenu(e){
      if(e.target.tagName==='A'){
        e.target.style.backgroundColor = this.lightenColor(this.backgroundColor, 20)
        // e.target.firstElementChild.style.backgroundColor = this.lightenColor(this.backgroundColor, 20)
      } else if(e.target.tagName==='I'){
        e.target.parentElement.style.backgroundColor = this.lightenColor(this.backgroundColor, 20)
        // e.target.style.backgroundColor = this.lightenColor(this.backgroundColor, 20)
      }

    },
    mouseOutSubMenu(e){
      if(e.target.tagName==='A'){
        e.target.style.backgroundColor = this.backgroundColor
        // e.target.firstElementChild.style.backgroundColor = this.backgroundColor
      }else if(e.target.tagName==='I'){
        e.target.parentElement.style.backgroundColor = this.backgroundColor
        // e.target.style.backgroundColor = this.backgroundColor
      }

    },
    lightenColor (hex, amt) {

      var usePound = false

      if (hex[0] === '#') {
        hex = hex.slice(1)
        usePound = true
      }

      var num = parseInt(hex, 16)
      var r = (num >> 16) + amt

      if (r > 255) r = 255
      else if (r < 0) r = 0

      var b = ((num >> 8) & 0x00FF) + amt

      if (b > 255) b = 255
      else if (b < 0) b = 0

      var g = (num & 0x0000FF) + amt

      if (g > 255) g = 255
      else if (g < 0) g = 0
      return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
    }
  }
});
</script>

<style scoped>

</style>
