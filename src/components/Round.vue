<template>
  <section class="round">
    <h3>Guess Next Draw!</h3>
    <div class="round__buttons">
      <button @click="$emit('nextDrawHigher')" :disabled="!areResultsValid">↑ HIGHER next draw ↑</button>
      <button @click="$emit('nextDrawLower')" :disabled="!areResultsValid">↓ LOWER next draw ↓</button>
    </div>
    <h4>Previous draw: {{ areResultsValid ? currentRoundResult.previousDraw : "Start currentGameResults first!" }}</h4>
    <h5>Remaining rounds: {{ remainingRoundNumber }}</h5>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Round",

  computed: {
    ...mapGetters(["areResultsValid", "currentRoundResult", "remainingRoundNumber"]),
  },
};
</script>

<style lang="scss" scoped>
.round {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding: 30px 10px;
  border: 1px solid $border;
  box-shadow: 0 10px 10px $shadow;
  @include has-min-width("xs") {
    padding: 30px;
  }

  &__buttons {
    padding: 10px 0 10px;
    @include has-min-width("xs") {
      padding: 20px 0 20px;
    }
  }
}
</style>
