<template>
  <transition name="fade">
    <div v-if="showModal" class="modal-mask" @click="onOutsideModalClick">
      <!-- use @click.stop (to stop bubbling to the top of the DOM and stop trigger @click="onOutsideModalClick")-->
      <div class="modal-container" @click.stop="onModalClick">
        <div v-if="shouldDisplayCloseIcon" class="modal-container__icon">
          <span @click="onCloseIconClick">
            <CloseIcon class="modal-icon" />
          </span>
        </div>
        <div v-if="getDiceUrl" class="modal-container__img">
          <img :src="getDiceUrl" alt="Dice" />
        </div>
        <div class="modal-container__text">
          <p>Previous draw: {{ currentRoundResult.previousDraw }}</p>
          <p>Your choice: {{ currentRoundResult.choice }}</p>
          <p>Draw: {{ currentRoundResult.draw }}</p>
          <p class="score">Round score: {{ currentRoundResult.points }}</p>
        </div>
        <button @click="onClose" type="button">OK</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import CloseIcon from "@/components/svgs/CloseIcon.vue";
import { API_PATH_IMG } from "@/helpers/constants";
import { diceApiMixin } from "@/mixins/diceApiMixin";

export default {
  name: "RoundResultModal",

  components: { CloseIcon },

  mixins: [diceApiMixin],

  props: {
    shouldCloseOnOutsideModalClick: { type: Boolean, default: true },
    shouldCloseOnModalClick: { type: Boolean, default: false },
    shouldDisplayCloseIcon: { type: Boolean, default: true },
    showModal: { type: Boolean, default: false },
  },

  computed: {
    ...mapGetters(["currentRoundResult"]),

    getDiceUrl() {
      const url = this.getDiceImgUrlPath(API_PATH_IMG);
      if (!url || this.currentRoundResult.draw === null) return "";
      return `${url}/${this.currentRoundResult.draw}.png`;
    },
  },

  methods: {
    onClose() {
      this.$emit("close-result-modal");
    },

    onOutsideModalClick() {
      if (this.shouldCloseOnOutsideModalClick) this.onClose();
    },

    onModalClick() {
      if (this.shouldCloseOnModalClick) this.onClose();
    },

    onCloseIconClick() {
      if (this.shouldDisplayCloseIcon) this.onClose();
    },
  },
};
</script>

<style lang="scss" scoped>
$animation-duration: 0.5s;
$mask-brightness: 0.5;

@include animation-fade($animation-duration) {
  opacity: 0;
}

.modal-mask {
  @include animation-backdrop($animation-duration, $mask-brightness);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: brightness($mask-brightness);
}

.modal-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70%;
  padding: 15px 15px 25px;
  border-radius: 15px;
  background: $modal-color;
  @include box-shadow;
  transform: translate(-50%, -50%);
  @include has-min-width("sm") {
    max-width: 750px;
    padding: 20px 20px 35px;
  }

  &__icon {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    @include has-min-width("sm") {
      margin-bottom: 20px;
    }
  }

  .modal-icon {
    filter: drop-shadow(1.5px 2.5px 1px rgb($black, 0.5));
    transition: width 0.2s ease, height 0.2s ease;
    transform: scale(1.5);
    cursor: pointer;

    @include can-hover() {
      &:not(&:active):hover {
        transform: scale(2);
      }
    }

    &:active {
      transform: scale(3);
    }
  }

  &__img {
    width: 125px;
    height: 125px;
    margin: auto;
    border: 2px solid $dice-border;
    background: $dice-background;
    @include box-shadow;
  }

  &__text {
    font-size: rem(16px);
    font-weight: 700;
    text-align: center;
    margin: 30px 0 25px;
    @include has-min-width("xs") {
      font-size: rem(22px);
      font-weight: 400;
      //margin-bottom: 25px;
    }

    .score {
      width: fit-content;
      margin: auto;
      padding: 5px 10px;
      border-radius: 5px;
      color: $white;
      font-weight: 400;
      background: $text-color;
    }

    & p {
      padding-bottom: 10px;
    }
  }
}
</style>
