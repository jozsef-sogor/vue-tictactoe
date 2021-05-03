<template>
  <div class="number-dial">
    <i class="dial-control fas fa-minus" @click="$emit('substraction')"></i>
    <p>{{value}}</p>
    <i class="dial-control fas fa-plus" @click="$emit('addition')"></i>
  </div>
  
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  }

}
</script>

<style lang="scss" scoped>
  .number-dial {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    p, .dial-control {
      font-size: $font-l;
      text-align: center;
      line-height: $font-l;
      margin: 0 $space-s;
      user-select: none;
    }
    .dial-control {
      cursor: pointer;
      font-size: $font-m;
    }
  }

</style>