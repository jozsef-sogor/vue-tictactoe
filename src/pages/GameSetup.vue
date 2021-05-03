<template>
  <article class="game-setup">
    <!-- Game board setup -->
    <section>
      <h2>Játék beállítások</h2>
      <game-options />
    </section>
    <!-- Player settings -->
    <section>
      <h2>Játékosok</h2>
      <player-options />
    </section>
    <button @click="startGame" :disabled="!canStart" class="primary">Játék indítása</button>
  </article>
  
</template>

<script>
import GameOptions from '@/components/GameOptions'
import PlayerOptions from '@/components/PlayerOptions'

export default {
  data() {
    return {
      
    }
  },
  computed: {
    players() {
      return this.$store.state.players
    },
    gameSettings() {
      return this.$store.state.gameSettings
    },
    canStart() {
      if(this.players.length < 2 || (this.gameSettings.neededToWin > this.gameSettings.rows && this.gameSettings.neededToWin > this.gameSettings.cols)) return false
      else return true
    }
  },
  methods: {
    startGame: function() {
      if(this.canStart) this.$router.push('/game')
    }
  },
  components: {
    GameOptions,
    PlayerOptions
  }

}
</script>

<style lang="scss" scoped>

.game-setup {
  padding: $space-m;
}

h2 {
  text-align: center;
  margin-bottom: $space-m;
}

section {
  margin-bottom: $space-xl;
}

button {
  margin: $space-l auto;
  display: block;
  font-size: $font-s;
}
</style>