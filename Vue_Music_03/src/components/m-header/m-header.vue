<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Nian糕音乐</h1>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine">&#xe64e;</i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 7px
      width: 30px
      height: 32px
      margin-right: 2px
      bg-image('logo')
      background-size: 30px 30px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 8px
        font-size: 24px
        color: $color-theme
</style>