<template>
  <div class="play-area">
    <div class="board-header" v-if="currentPlayer">
       <div class="win-counter">
        <p v-for="player of players" :key="player._id"><b>{{player.name}}:</b> {{player.wins}}</p>
      </div>
      <i :class="currentPlayer.icon"></i>
      <h3 v-if="currentPlayer">{{currentPlayer.name}} köre</h3>
    </div>
    <div id="player-board">
      <div class="tile-row" v-for="(row, rowIndex) in tilesArray" :key="rowIndex">
        <Tile
         v-for="(tile, colIndex) in row" 
         :key="colIndex"
         @click.native="makeMove(rowIndex, colIndex)"
         :value="tilesArray[rowIndex][colIndex]"
        />
      </div>
    </div>
    <end-modal 
      v-if="!inProgress" 
      :winner="winner" 
      @new-game="resetGame"
      @exit-game="closeGame"
    />
  </div>
</template>

<script>
import Tile from '@/components/small/InputTile'
import EndModal from '@/components/EndModal'

export default {
  data() {
    return {
      currentPlayer: null,
      winner: null,
      isTie: false,
      inProgress: true,
      stepCount: 0,
      tilesArray: null
    }
  },
  computed: {
    totalSteps: function() {
      return this.gameSettings.rows * this.gameSettings.cols
    },
    players: function() {
      return this.$store.state.players
    },
    gameSettings: function() {
      return this.$store.state.gameSettings
    },
  },
  components: {
    Tile,
    EndModal
  },
  mounted() {
    this.currentPlayer = this.players[0]
    this.tilesArray =  Array.from(Array(this.gameSettings.rows), () => new Array(this.gameSettings.cols).fill(''))
  },
  methods: {
    resetGame: function() {
      if(this.winner) this.$store.commit('addWinToPlayer', this.winner._id)

      this.currentPlayer = this.winner ? this.winner : this.players[0]
      this.winner = null
      this.isTie = false
      this.inProgress = true
      this.stepCount = 0
      this.tilesArray = Array.from(Array(this.gameSettings.rows), () => new Array(this.gameSettings.cols).fill(''))
    },
    closeGame: function() {
      this.$store.commit('resetPlayerWins')
      this.$router.push('/')
    },
    makeMove: function(rowIndex, colIndex) {
      let selectedField = this.tilesArray[rowIndex][colIndex];
      
      //Ellenőrizzük, hogy nincs nyertes, még megy a játék és hogy üres a mező
      if(!this.winner && !this.isTie && this.inProgress && !selectedField) {
        this.tilesArray[rowIndex][colIndex] = this.currentPlayer.icon; //Mező értéke az aktuális játékos ikonja
        this.stepCount++;
        this.checkForWinner(rowIndex, colIndex);
        this.nextPlayer()
      }
    },
    nextPlayer: function() {
      let indexOfCurrentPlayer = this.players.indexOf(this.currentPlayer);
      this.currentPlayer = indexOfCurrentPlayer < this.players.length - 1 ? this.players[indexOfCurrentPlayer + 1] : this.players[0]
    },
    checkForWinner: function(rowIndex, colIndex) {

      let rowTotal = 0;
      let colTotal = 0;
      let diagTotal = 1; //a mezőt, ahova leraktuk az ikont nem számolja a loop
      let revDiagTotal = 1; //a mezőt, ahova leraktuk az ikont nem számolja a loop
      let neededToWin = this.gameSettings.neededToWin;
      let leftTopNotOwnIcon = false; //Átlós ellenőrzés rövidre zárására
      let rightTopNotOwnIcon = false;
      let leftBottomNotOwnIcon = false;
      let rightBottomNotOwnIcon = false;

      //Annyi lépést ellenőrzünk mindkét irányba, ahány szükséges a nyeréshez
      for(let i = 1; i <= neededToWin; i++) {

        //Mind a 4 átlós irányba ellenőírrzzük a tile-okat, ha valamelyik irányba már volt négyzet, 
        //ami nem az aktuális ikonnal van kitöltve, akkor azt az irányt tovább nem számoljuk

        //Jobbra lefele
        if(rowIndex + i <= this.tilesArray.length - 1 && this.tilesArray[rowIndex + i][colIndex + i] == this.currentPlayer.icon && !rightBottomNotOwnIcon) { //Ellenőrzés, hogy nem megy le a tábláról
          diagTotal++
        } else {rightBottomNotOwnIcon=true}

        //Balra felfele
        if(0 <= rowIndex - i && this.tilesArray[rowIndex - i][colIndex - i] == this.currentPlayer.icon && !leftTopNotOwnIcon) {
          diagTotal++
        } else {leftTopNotOwnIcon=true}

       //Jobbra felfele
        if(0 <= rowIndex - i  && this.tilesArray[rowIndex - i][colIndex + i] == this.currentPlayer.icon && !rightTopNotOwnIcon) {
          revDiagTotal++
        } else {rightTopNotOwnIcon=true}

        //Balra lefele
        if(rowIndex + i <= this.tilesArray.length - 1 && this.tilesArray[rowIndex + i][colIndex - i] == this.currentPlayer.icon && !leftBottomNotOwnIcon) {
          revDiagTotal++
        } else {leftBottomNotOwnIcon=true}
        
        //Ha minden irányba nem saját ikon van, megszakítjuk a loop-ot
        if((!leftTopNotOwnIcon && !rightBottomNotOwnIcon) && (!rightTopNotOwnIcon && !leftBottomNotOwnIcon)) break
      }
      
      //Sor ellenőrzése
      for ( let i = 0; i < this.tilesArray[rowIndex].length; i++ ) {
        if(this.tilesArray[rowIndex][i] == this.currentPlayer.icon) rowTotal++
        else if(rowTotal) break //ha nem saját ikon, akkor megszakítjuk
      }
      
      //Oszlop ellenőrzése
      for(let i = 0; i < this.tilesArray.length; i++) {
        if(this.tilesArray[i][colIndex] == this.currentPlayer.icon) colTotal++
        else if(colTotal) break //ha nem saját ikon és már volt saját ikon az oszlopban, akkor megszakítjuk
      }

      //nyerő szám ellenőrzése
      if (( rowTotal >= neededToWin ) || ( colTotal >= neededToWin ) || ( diagTotal >= neededToWin ) || ( revDiagTotal >= neededToWin )) {
        console.log('winner: ', this.currentPlayer.name);
        this.winner = this.currentPlayer;
        this.inProgress = false
      }

      this.checkForTie()
    },
    checkForTie: function() {
      if (this.stepCount == this.totalSteps && !this.winner) {
        this.isTie = true;
        this.inProgress = false
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .play-area {
    margin: 0 auto;
    padding: $space-m;
    //width: 100%;
    max-width: 100vw;
    min-height: 100vh;
    background-color: $background-color;
  }

  .board-header {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    background-color: $background-color;
    border-bottom: 1px solid $border-color;
    z-index: 1;
    padding: $space-m;
    margin-bottom: $space-m;
    span, h3 {
      text-align: center;
    }
    i {
      display: block;
      font-size: $font-l;
      text-align: center;
    }
    h3 {
      //margin: $space-s auto $space-l;
    }
  }

  .win-counter {
    display: flex;
    justify-content: center;
    margin-bottom: $space-m;
    p {
      margin: 0 $space-m;
    }
  }

  #player-board {
    width: auto;
    margin: 0 auto;
    .tile-row {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>