<template>
  <div class="tile" :class="{filled: value}">
    <i :class="value"></i>
  </div>
  
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  }

}
</script>

<style lang="scss" scoped>
  .tile {
    padding: $space-s;
    margin: $space-xs;
    background-color: $background-color;
    border-radius: 3px;
    width: $space-xl;
    height: $space-xl;
    cursor: pointer;
    transition: .1s;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $border-color;
    &:hover {
      background-color: $accent-color
    }
    &:active {
      transform: scale(.85);
      transition: .1s;
    }
    i {
      font-size: $font-xl;
      font-weight: bold;
    }
  }

  .filled {
    cursor: not-allowed;
    &:hover {
      background-color: $background-color;
    }
  }

</style>