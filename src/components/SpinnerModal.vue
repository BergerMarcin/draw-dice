<template>
  <transition name="fade">
    <div v-if="showModal" class="modal-mask">
      <div class="modal-container">
        <div class="modal-container__img">
          <img src="../assets/dice-6dots.png" alt="Fetching data" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "SpinnerModal",

  props: {
    showModal: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
$transition-fade-duration: 1.5s;
$animation-rotation-duration: 2s;
$mask-backdrop-filter: brightness(0.35); //mask style for all main-browsers except Firefox
$mask-background-color: rgba(50, 50, 50, 0.4); //mask style for Firefox
$image-filter: brightness(0.95);

@include transition-fade($transition-fade-duration) {
  opacity: 0;
}

.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: $mask-backdrop-filter;
  // For Firefox
  @supports not (backdrop-filter: $mask-backdrop-filter) {
    background-color: $mask-background-color;
  }
}

.modal-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &__img {
    @include box-shadow-fetching;
    @include animation-rotation($animation-rotation-duration);
    width: 50px;
    height: 50px;
    margin: auto;
    filter: $image-filter;
    img {
      border: 1px solid $dice-border;
      border-radius: 5px;
    }
  }
}
</style>
