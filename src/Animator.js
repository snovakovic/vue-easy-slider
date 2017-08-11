import Animator from 'animator.js'


const parseWidth = function(el) {
  const styles = getComputedStyle(el)
  const widthText = styles.width
  return parseFloat(widthText)
}

const negateIf = (val, condition) => condition ? -val : val

const animate = (speed, rule) => (new Animator(speed, rule)).animate()


export default {
  normal: {
    beforeEnter(vm, el) {
      let width = negateIf(parseWidth(el), !vm.direction)
      el.style.transform = `translateX(${width}px)`
    },
    enter(vm, el, callback) {
      const width = negateIf(parseWidth(el), !vm.direction)
      animate(vm.speed, (p) => {
        el.style.transform = `translateX(${ width - width * p }px)`
      }).then(callback)
    },
    leave(vm, el, callback) {
      const width = negateIf(parseWidth(el), vm.direction)
      animate(vm.speed, (p) => {
        el.style.transform = `translateX(${ width * p }px)`
      }).then(callback)
    },
  },
  fade: {
    beforeEnter(vm, el) {
      el.style.opacity = 0
      el.style.transform = `translateX(${vm.direction ? '10px' : '-10px'})`
    },
    enter(vm, el, callback) {
      const translate = vm.direction ? 10 : -10
      animate(vm.speed, (p) => {
        el.style.opacity = p
        el.style.transform = `translateX(${ translate - translate * p }px)`
      }).then(callback)
    },
    leave(vm, el, callback) {
      const translate = vm.direction ? -10 : 10
      animate(vm.speed, (p) => {
        el.style.opacity = 1 - p
        el.style.transform = `translateX(${ translate * p }px)`
      }).then(callback)
    },
  },
}
