<template>
  <section class="results">
    <h3>Round Results</h3>
    <div v-if="areResultsValid" class="results__table-container">
      <table>
        <tr class="header">
          <th scope="col">Round</th>
          <th scope="col">Previous Draw</th>
          <th scope="col">Choice</th>
          <th scope="col">Dice Draw</th>
          <th scope="col">Points</th>
        </tr>
        <tr v-for="(result, index) in currentGameResults" :key="`currentGameResults-result-${index + 1}`" class="data">
          <td>{{ index + 1 }}</td>
          <td>{{ result.previousDraw }}</td>
          <td>{{ result.choice !== null ? result.choice : "..." }}</td>
          <td>{{ result.draw !== null ? result.draw : "..." }}</td>
          <td>{{ result.points !== null ? result.points : "..." }}</td>
        </tr>
        <tr class="summary">
          <td colspan="4">Game Score:</td>
          <td>{{ currentGameScore }}</td>
        </tr>
      </table>
    </div>
    <h4 v-else>Start New Game first!</h4>
  </section>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "ResultTable",

    computed: {
      ...mapGetters(["areResultsValid", "currentGameResults", "currentGameScore"]),
    },
  };
</script>

<style lang="scss" scoped>
  .results {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__table-container {
      max-width: 100%;
      @include has-min-width("xs") {
        max-width: 80%;
      }

      table {
        margin-left: auto;
        margin-right: auto;
        border: 1px solid $border;
        border-radius: 15px;
        @include box-shadow;
      }

      table,
      th,
      td {
        border-spacing: 0;
        font-size: 12px;
        @include has-min-width("xs") {
          font-size: 14px;
        }
        @include has-min-width("sm") {
          font-size: inherit;
        }
      }

      th,
      td {
        padding: 2px 5px;
        @include has-min-width("xs") {
          padding: 5px 10px;
        }
        background: $table-col-odd-background;
        &:nth-child(2n) {
          background: $table-col-even-background;
        }
      }

      th {
        font-weight: 600;
      }

      .header {
        th {
          padding-top: 8px;
          //padding-bottom: 10px;
          &:first-child {
            border-radius: 15px 0 0 0;
          }
          &:last-child {
            border-radius: 0 15px 0 0;
          }
        }
      }

      .data {
        td {
          padding-top: 5px;
        }
      }

      .summary {
        color: $white;
        td {
          padding-top: 10px;
          padding-bottom: 10px;
          background: $table-score-background;
          &:first-child {
            border-radius: 0 0 0 15px;
          }
          &:last-child {
            border-radius: 0 0 15px 0;
          }
        }
      }
    }
  }
</style>
