<template>
  <div id="app">
    <AppHeader msg="Guess Your Draw!" />

    <section>
      <button @click="startNewGame" type="button" :disabled="isFetchingData">Start New Game</button>
    </section>

    <DiceRotating :show-box-shadow="!isFetchingData" />

    <Round @nextDrawHigher="finalizeRound(choiceType.HIGHER)" @nextDrawLower="finalizeRound(choiceType.LOWER)" />

    <ResultTable />

    <RoundResultModal :show-modal="showResultModal" @close-result-modal="handleCloseResultModal" />

    <SpinnerModal :show-modal="isFetchingData" />
  </div>
</template>

<script>
import { diceApiMixin } from "@/mixins/diceApiMixin";
import AppHeader from "@/components/AppHeader.vue";
import DiceRotating from "@/components/DiceRotating.vue";
import SpinnerModal from "@/components/SpinnerModal.vue";
import Round from "@/components/Round.vue";
import RoundResultModal from "@/components/RoundResultModal.vue";
import ResultTable from "@/components/ResultTable.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { API_ERROR, API_PATH_DRAW, CHOICE, CHOICE_POINTS, MAX_ROUNDS } from "@/helpers/constants";
import { showWarning, showConfirmation, showError } from "@/services/message-service";
import { DEFAULT_START_DRAW } from "@/helpers/constants";

export default {
  name: "App",

  components: { AppHeader, DiceRotating, Round, RoundResultModal, ResultTable, SpinnerModal },

  mixins: [diceApiMixin],

  data: () => ({
    choiceType: CHOICE,
    showResultModal: false,
  }),

  computed: {
    ...mapGetters(["isFetchingData", "areResultsValid", "currentRoundNumber", "currentRoundResult"]),
  },

  async created() {
    this.loadResults();
    await this.autoStart();
    this.setIsFetchingData({ isFetchingData: false });
  },

  methods: {
    ...mapMutations({ setIsFetchingData: "SET_IS_FETCHING_DATA" }),
    ...mapActions(["loadResults", "resetResults", "setNewGame", "setNewRound", "updateCurrentRound", "setModalText"]),

    async autoStart() {
      if (!this.areResultsValid || (this.currentRoundNumber >= MAX_ROUNDS && this.currentRoundResult.draw !== null)) {
        await this.startFirstGame();
        return;
      }
      await showConfirmation("Would you like to continue saved game?").then(async (result) => {
        if (result.isDenied) await this.startFirstGame();
      });
    },

    async startFirstGame() {
      if (!this.areResultsValid) await this.resetResults();
      await this.startNewGame();
    },

    async startNewRoundOrNewGame() {
      if (this.currentRoundNumber < MAX_ROUNDS) {
        await this.startNewRound();
      } else {
        await showWarning("Let's Start New Game!");
        await this.startNewGame();
      }
    },

    async startNewGame() {
      const draw = await this.drawDice(0).catch(() => {
        // required to assign some start-draw-value to keep consistent in data.
        // If API-connection (of draw) is restored it would be possible to continue game (as data would be consistent)
        return DEFAULT_START_DRAW;
      });
      const newGame = [{ previousDraw: draw, choice: null, draw: null, points: null }];
      await this.setNewGame({ newGame: newGame });
    },

    async startNewRound() {
      const newRound = { previousDraw: this.currentRoundResult.draw, choice: null, draw: null, points: null };
      await this.setNewRound({ newRound: newRound });
    },

    async finalizeRound(choice) {
      await this.drawDice(this.currentRoundResult.previousDraw)
        .then(async (resolve) => {
          const draw = resolve;
          const points = this.calcPointsOfRound(choice, draw);
          const round = { ...this.currentRoundResult, draw, choice, points };
          await this.updateCurrentRound({ round });
          this.showResultModal = true;
        })
        .catch(() => {
          //fake error-catch to avoid showing in the browser's console `v-on`-Vue-error
        });
    },

    calcPointsOfRound(choice, draw) {
      let points = CHOICE_POINTS.WRONG;
      switch (choice) {
        case CHOICE.HIGHER:
          if (draw > this.currentRoundResult.previousDraw) points = CHOICE_POINTS.CORRECT;
          break;
        case CHOICE.LOWER:
          if (draw < this.currentRoundResult.previousDraw) points = CHOICE_POINTS.CORRECT;
          break;
      }
      return points;
    },

    async drawDice(prevDraw) {
      this.setIsFetchingData({ isFetchingData: true });
      let newDraw = prevDraw;
      while (newDraw === prevDraw) {
        newDraw = await this.getDiceValue(API_PATH_DRAW).catch(async (error) => {
          const errorMsg = error?.toString().slice(7) || API_ERROR.UNKNOWN.USER_MSG;
          this.setIsFetchingData({ isFetchingData: false });
          await showError(errorMsg);
          // For test-purpose (to fake API and see result modal) uncomment below line and comment throwing-error
          // return Math.trunc(Math.random() * 6 + 1);
          throw new Error(errorMsg);
        });
      }
      this.setIsFetchingData({ isFetchingData: false });
      return newDraw;
    },

    async handleCloseResultModal() {
      this.showResultModal = false;
      await this.startNewRoundOrNewGame();
    },
  },
};
</script>

<style lang="scss">
@import "scss/base/reset";
@import "scss/base/swal2";

body {
  min-height: 100vh;
  padding: 0;
  margin: 0;
  background: $app-background-basic;
  background: radial-gradient(
    circle,
    $app-background-center 0%,
    $app-background-basic 60%,
    $app-background-outside 100%
  );
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
  overflow-y: auto;
}

button {
  @include app-button;
  margin: 5px 20px;
  display: inline;
}
</style>
