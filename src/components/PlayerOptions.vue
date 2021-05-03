<template>
  <div class="container">
    <player-card
      v-for="(player, index) in players"
      :key="player._id"
      :player="player"
      :icons="allIcons.filter(icon => !takenIcons.includes(icon) || icon.name == player.icon)"
      @delete-player="removePlayer(index)"
      @player-updated="updatePlayer"
    />
    <div class="add-button card" @click="addPlayer" v-if="players.length <= 5">
      <i class="fas fa-plus"></i>
    </div>
  </div>
</template>

<script>
import PlayerCard from '@/components/PlayerSetupCard'

export default {
  computed: {
    players() {
      return this.$store.state.players
    },
    allIcons() {
      return this.$store.state.icons
    },
    takenIcons() {
      return this.allIcons.filter(icon => {
        return this.players.some(player => player.icon == icon.name)
      })
    }
  },
  methods: {
    addPlayer: function() {
      const player = {
        _id: Math.random() * Date.now(),
        name: `Játékos ${this.players.length + 1}`,
        icon: this.getIcon(),
        wins: 0
      };
      this.$store.commit('addPlayer', player)
    },
    removePlayer: function(index) {
      this.$store.commit('removePlayer', index)
    },
    updatePlayer(player) {
      this.$store.commit('updatePlayer', player)
    },
    getIcon: function() {
      let freeIcons = this.allIcons.filter(icon => !this.takenIcons.includes(icon))
      let icon = freeIcons[Math.floor(Math.random() * freeIcons.length)];
      
      return icon.name
    }
  },
  components: {
    PlayerCard
  }
}
</script>

<style lang="scss" scoped>
.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24ch;
  cursor: pointer;
  transition: .3s;
  h3 {
    font-size: $font-l;
  }
  &:hover {
    background-color: $accent-color
  }
}

</style>