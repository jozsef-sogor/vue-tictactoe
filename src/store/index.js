import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [
      { 
        _id: 'player-1',
        name: 'Játékos 1',
        icon: 'fas fa-circle',
        wins: 0
      },
      {
        _id: 'player-2',
        name: 'Játékos 2',
        icon: 'fas fa-times',
        wins: 0
      }
    ],
    gameSettings: {
      rows: 10,
      cols: 10,
      neededToWin: 5
    },
    icons: [
      {
        _id: 1,
        name: 'fas fa-times',
        unicode: 'f00d'
      },
      {
        _id: 2,
        name: 'fas fa-dot-circle',
        unicode: 'f192'
      },
      {
        _id: 3,
        name: 'fas fa-circle',
        unicode: 'f111'
      },
      {
        _id: 4,
        name: 'fas fa-apple-alt',
        unicode: 'f5d1'
      },
      {
        _id: 5,
        name: 'fas fa-square',
        unicode: 'f0c8'
      },
      {
        _id: 6,
        name: 'fas fa-code',
        unicode: 'f121'
      }
    ]
  },
  getters: {
    getIconById(state, id) {
      return state.icons.find(icon => icon._id == id)
    }
  },
  mutations: {
    setPlayer(state, { playerName, playerObject }) {
      state[playerName] = playerObject
    },
    addPlayer(state, player) {
      state.players.push(player)
    },
    removePlayer(state, playerId) {
      state.players.splice(playerId, 1)
    },
    updatePlayer(state, newPlayer) {
      let player = state.players.find(x => x._id == newPlayer._id);

      player[newPlayer.property] = newPlayer.value
    },
    addWinToPlayer(state, playerId) {
      const player = state.players.find(x => x._id == playerId)

      player.wins++
    },
    resetPlayerWins(state) {
      for (let player of state.players) {
        player.wins = 0
      }
    },
    setGameSettingsParameter(state, { param, val }) {
      state.gameSettings[param] = val
    }
  }
})