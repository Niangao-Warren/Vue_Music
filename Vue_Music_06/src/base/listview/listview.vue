<template>
    <scroll class="listview" 
            :data="data" 
            ref="listview"
            :probe-type="probeType"
            :listenScroll="listenScroll"
            @scroll="scroll">
        <ul>
            <li v-for="(group, index) in data" :key="index" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <uL>
                    <li v-for="(item, index) in group.items" :key="index" class="list-group-item">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </uL>
            </li>
        </ul>
        <div class="list-shortcut" @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item, index) in shortcutList" 
                    :key="index" 
                    :class="{'current':currentIndex===index}"
                    @touchstart="onShortcutTouchStart($event, index)" 
                    class="item">{{item}}</li>
            </ul>
        </div>
        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
            <div class="fixed-title">{{fixedTitle}}</div>
        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'

    const TITLE_HEIGHT = 28
    const ANCHOR_HEIGHT = 18

    export default {
        created() {
            this.touch = {}
            this.listenScroll = true
            this.listHeight = []
            this.probeType = 3
        },
        data() {
            return {
                scrollY: -1,
                currentIndex: 0,
                diff: -1
            }
        },
        props: {
            data: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            shortcutList() {
                return this.data.map((group) => {
                    return group.title.substr(0, 1)
                })
            },
            fixedTitle() {
                if (this.scrollY > 0) {
                    return ''
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
            }
        },
        methods: {
            onShortcutTouchStart(e, index) {
                // console.log(e.target)
                // console.log(index)
                let firstTouch = e.touches[0]
                this.touch.y1 = firstTouch.pageY
                this.touch.anchorIndex = index
                this._scrollTo(index)
            },
            onShortcutTouchMove(e) {
                let firstTouch = e.touches[0]
                this.touch.y2 = firstTouch.pageY
                let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
                let anchorIndex = this.touch.anchorIndex + delta
                // console.log(anchorIndex)
                this._scrollTo(anchorIndex)
            },
            scroll(pos) {
                this.scrollY = pos.y
            },
            _scrollTo(index) {
                this.scrollY = -this.listHeight[index]
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
            },
            _calculateHeight() {
                this.listHeight = []
                const list = this.$refs.listGroup
                let height = 0
                this.listHeight.push(height)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            }
        },
        watch: {
            data() {
                this.$nextTick(() => {
                    this._calculateHeight()
                })
            },
            scrollY(newY) {
                const listHeight = this.listHeight
                // 当滚动到顶部，newY>0
                if (newY > 0) {
                    this.currentIndex = 0
                    return
                }
                // 在中间部分滚动
                for (let i = 0; i < listHeight.length - 1; i++) {
                    let height1 = listHeight[i]
                    let height2 = listHeight[i + 1]
                    if (-newY >= height1 && -newY < height2) {
                        this.currentIndex = i
                        // console.log(this.currentIndex)
                        this.diff = height2 + newY
                        return
                    }
                }
                // 当滚动到底部，且-newY大于最后一个元素的上限
                this.currentIndex = listHeight.length - 2
            },
            diff(newVal) {
                let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
                if (this.fixedTop === fixedTop) {
                    return
                }
                this.fixedTop = fixedTop
                this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
            }
        },
        components: {
            Scroll
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    .listview
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background
        .list-group
            padding-bottom: 30px
            .list-group-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
            .list-group-item
                display: flex
                align-items: center
                padding: 20px 0 0 30px
                .avatar
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .name
                    margin-left: 20px
                    color: $color-text-l
                    font-size: $font-size-medium
        .list-shortcut
            position: absolute
            z-index: 30
            right: 0
            top: 50%
            transform: translateY(-50%)
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background: $color-background-d
            font-family: Helvetica
            .item
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme
                    font-weight: bolder
        .list-fixed
            position: absolute
            top: -1px
            left: 0
            width: 100%
            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>