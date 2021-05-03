<template>
  <div class="player-card card">
    <input @change="updatePlayer('name', $event.target.value)" :value="player.name">
    <div class="icon-selector">
      <i 
        v-for="icon of icons" 
        :key="icon._id"  
        :class="[{selected: icon.name == player.icon}, icon.name]"
        @click="updatePlayer('icon', icon.name)"
      >
      </i>
    </div>
    <p @click="$emit('delete-player')" class="delete-btn secondary"><i class="fas fa-trash"></i> Törlés</p>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      required: true
    },
    icons: {
      type: Array,
      defaul: []
    }
  },
  methods: {
    updatePlayer(property, value) {
      this.$emit('player-updated', {property: property, value: value, _id: this.player._id})
    },
  }
}
</script>

<style lang="scss" scoped>
  .player-card {
    text-align: center;
    input {
      margin-top: $space-s;
      margin-bottom: $space-m;
      display: block;
    }
    p {
      margin: 0;
    }
    .delete-btn {
        cursor: pointer;
        font-size: $font-xs;
        padding: $space-s $space-m;
        width: fit-content;
        margin: $space-m auto 0;
        transition: .3s
    }
  }

  .icon-selector {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: $space-s;
    i {
      margin: 0 $space-s;
      opacity: .5;
      transition: .3s;
    }
    .selected {
      opacity: 1;
      transform: scale(1.7)
    }
  }

</style>