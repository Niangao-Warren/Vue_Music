<template>
  <div class="recommend" ref="recommend">
    <div class="recommend-content">
      <div>
        <div v-if="slider.length" class="slider-wrapper">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, index) in slider" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" class="slider-img">
              </a>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in discList" :key="index" class="item">
              <div class="icon">
                <img width="60" height="60" :src="item.picUrl">
              </div>
              <div class="text">
                <h2 class="desc" v-html="item.songListDesc"></h2>
                <p class="name" v-html="item.songListAuthor"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getHomeData } from 'api/recommend'
  import { ERR_OK } from 'api/config'

  export default {
    data() {
      return {
        slider: [],
        discList: []
      }
    },
    created() {
      this._getHomeData()
    },
    methods: {
      _getHomeData() {
        getHomeData().then((res) => {
          if (res.code === ERR_OK) {
            this.slider = res.data.slider
            this.discList = res.data.songList
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .desc
              margin-bottom: 10px
              color: $color-text
            .name
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        margin-left: -25px
        transform: translateY(-50%)
</style>