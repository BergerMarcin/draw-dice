<template>
  <transition name="fade">
    <div v-if="showModal" class="modal__mask" @click="onOutsideModalClick">
      <!-- use @click.stop (to stop bubbling to the top of the DOM and stop trigger @click="onOutsideModalClick")-->
      <div class="modal__container" @click.stop="onModalClick">
        <div v-if="shouldDisplayCloseIcon" class="modal__container__icon">
          <span @click="onCloseIconClick">
            <CloseIcon class="modal-icon" />
          </span>
        </div>
        <div v-if="getDiceUrl" class="modal__container__img">
          <img :src="getDiceUrl" alt="Dice" />
        </div>
        <div class="modal__container__text">
          <p>Previous draw: {{ currentRoundResult.previousDraw }}</p>
          <p>Your choice: {{ currentRoundResult.choice }}</p>
          <p>Draw: {{ currentRoundResult.draw }}</p>
          <p class="modal__container__text--highlight">Your points: {{ currentRoundResult.points }}</p>
        </div>
        <button @click="onClose" type="button">OK</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import CloseIcon from "@/components/svgs/CloseIcon.vue";
import { API_HOST_IMG_SUFFIX_URIS } from "@/helpers/constants";
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
      const url = this.getDiceImgUrlPath(API_HOST_IMG_SUFFIX_URIS);
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

.modal {
  &__mask {
    @include animation-backdrop($animation-duration, $mask-brightness);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: brightness($mask-brightness);
  }

  &__container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $modal-color;
    padding: 15px 15px 25px;
    @include box-shadow;
    width: 85%;
    @include has-min-width("sm") {
      padding: 20px 20px 35px;
      max-width: 60%;
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
      transform: scale(1.3);
      cursor: pointer;
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
      margin: 30px 0 5px;
      @include has-min-width("sm") {
        font-size: rem(22px);
        font-weight: 400;
        margin-bottom: 5px;
      }

      &--highlight {
        text-decoration: underline;
      }

      & p {
        padding-bottom: 10px;
      }
    }
  }
}
</style>
