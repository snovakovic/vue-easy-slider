<template>
  <div class="slider-item" v-if="show" @click="onClick">
    <transition :css="false"
      @beforeEnter="beforeEnter"
      @enter="enter"
      @leave="leave">
      <div class="wrap" v-if="animate">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>


<style scoped>
  .slider-item,
  .wrap {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
  }
</style>


<script>
  import animator from './Animator';

  export default {
    name: 'easy-slider-item',
    props: {
      onClick: {
        type: Function,
        default () {},
      },
    },
    data () {
      return {
        animate: false,
        show: false,
        direction: 0,
        speed: 0,
        animation: '',
      }
    },
    methods: {
      beforeEnter (el) {
        animator[this.animation].beforeEnter(this, el)
      },
      enter (el, done) {
        animator[this.animation].enter(this, el, done)
      },
      leave (el, done) {
        animator[this.animation].leave(this, el, () => {
          done()
          this.show = false
        })
      },
      showHandle (direction) {
        this.direction = direction
        this.show = true
        this.$nextTick(() => this.animate = true)
      },
      hideHandle (direction) {
        this.direction = direction
        this.animate = false
      },
      initItem () {
        this.animate = true
        this.show = true
      },
    },
    created () {
      this.$parent.handleItemChange()
      this.speed = this.$parent.speed
      this.animation = this.$parent.animation
    },
  }
</script>
