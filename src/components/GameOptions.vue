<template>
  <div class="container">
    <div v-for="(input, index) in inputs" :key="index" class="container-item">
      <span class="dial-label">{{input.label}}</span>
      <number-dial 
        :value="settingsObj[input.valueStore]" 
        @substraction="substract(input)"
        @addition="add(input)"
      />
    </div>
  </div>
</template>

<script>
import NumberDial from '@/components/small/NumberDial'

export default {
  data() {
    return {
      inputs: [
        {
          label: 'Sorok száma',
          min: 3,
          max: 25,
          valueStore: 'rows',
        },
        {
          label: 'Oszlopok száma',
          min: 3,
          max: 25,
          valueStore: 'cols',
        },
        {
          label: 'Nyerő mennyiség',
          min: 3,
          max: 10,
          valueStore: 'neededToWin',
        }
      ]
    }
  },
  components: {
    NumberDial
  },
  computed: {
    settingsObj() {
      return this.$store.state.gameSettings
    },
    computedNeededToWin() {
      //Ellenőrzés, hogy ne lehessen túl nagyra állítani a szükséges nyerő számot
      return this.settingsObj.rows >= this.settingsObj.cols ? this.settingsObj.cols : this.settingsObj.rows
    }
  },
  methods: {
    substract: function(inputObj) {
      if(inputObj.min < this.settingsObj[inputObj.valueStore]) this.$store.commit('setGameSettingsParameter', {param: inputObj.valueStore, val: this.settingsObj[inputObj.valueStore]-1})
      else alert(`${inputObj.min} a legkisebb beállítható érték`)
    },
    add: function(inputObj) {
      if(inputObj.max > this.settingsObj[inputObj.valueStore]) this.$store.commit('setGameSettingsParameter', {param: inputObj.valueStore, val: this.settingsObj[inputObj.valueStore]+1})
      else alert(`${inputObj.max} a legmagasabb beállítható érték`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .dial-label {
    text-align: center;
    margin-bottom: $space-s;
  }

  .container-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

</style>