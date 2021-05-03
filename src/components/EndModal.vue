<template>
  <div class="modal-background" @click="$emit('new-game')">
    <div class="modal">
      <h2>{{winner ? `${winner.name} nyert!` : 'Döntetlen'}}</h2>
      <div class="modal-footer">
        <button @click="$emit('exit-game')" class="secondary">Kilépés</button>
        <button @click="$emit('new-game')" class="primary">Új játék</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    winner: {
      default: null
    }
  }

}
</script>

<style lang="scss" scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  background-color: rgba(0,0,0,0.25);
  z-index: 2;
  .modal {
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: fit-content;
    background-color: $background-color;
    padding: $space-l $space-l $space-m;
    .modal-footer {
      border-top: 1px solid $border-color;
      margin-top: $space-xl;
      display: flex;
      padding-top: $space-m;
      justify-content: flex-end;
      button {
        margin: $space-xs $space-s;
      }
    }
  }
}

</style>