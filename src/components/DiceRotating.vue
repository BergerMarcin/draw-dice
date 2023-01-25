<template>
  <div class="scene">
    <div class="cube" ref="cube">
      <div
        v-for="wall in diceWalls"
        :key="wall.value"
        class="cube__face"
        :class="showBoxShadow && 'cube__face--box-shadow'"
        :style="`transform: rotateX(${wall.rotateX}deg) rotateY(${wall.rotateY}deg) translateZ(50px)`"
      >
        <img :src="getDiceUrl(wall.value)" :alt="`Dice-Wall_${wall.description}-Points${wall.value}`" />
      </div>
    </div>
  </div>
</template>

<script>
  import { API_PATH_IMG } from "@/helpers/constants";
  import { diceApiMixin } from "@/mixins/diceApiMixin";

  export default {
    name: "DiceRotating",

    mixins: [diceApiMixin],

    props: {
      showBoxShadow: { type: Boolean, default: true },
    },

    data: () => ({
      cubeElement: HTMLElement,
      rotationTimeout: Number,
      rotationX: 0,
      rotationY: 0,
      diceWalls: [
        { value: 1, description: "front", rotateX: 0, rotateY: 0 },
        { value: 2, description: "bottom", rotateX: -90, rotateY: 0 },
        { value: 3, description: "right", rotateX: 0, rotateY: 90 },
        { value: 4, description: "left", rotateX: 0, rotateY: -90 },
        { value: 5, description: "top", rotateX: 90, rotateY: 0 },
        { value: 6, description: "back", rotateX: 0, rotateY: 180 },
      ],
    }),

    mounted() {
      this.cubeElement = this.$refs.cube;
      this.rotationTimeout = setInterval(this.setRandomDiceRotation, 1000);
    },

    beforeDestroy() {
      clearInterval(this.rotationTimeout);
    },

    methods: {
      getDiceUrl(points) {
        const url = this.getDiceImgUrlPath(API_PATH_IMG);
        if (!url || !points) return "";
        return `${url}/${points}.png`;
      },

      setRandomDiceRotation() {
        this.cubeElement.style.transform = `translateZ(-50px) rotateX(${this.rotationX}deg) rotateY(${this.rotationY}deg)`;
        let deltaRotationX = 0;
        let deltaRotationY = 0;
        while (deltaRotationX === 0 && deltaRotationY === 0) {
          deltaRotationX = Math.round(Math.random() * 3 - 1.5) * 90;
          deltaRotationY = Math.round(Math.random() * 3 - 1.5) * 90;
        }
        this.rotationX += deltaRotationX;
        this.rotationY += deltaRotationY;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .scene {
    width: 100px;
    height: 100px;
    margin: 0 auto 50px;
    perspective: 600px;
  }

  .cube {
    position: relative;
    width: 100px;
    height: 100px;
    transform-style: preserve-3d;
    transform: translateZ(-50px);
    transition: transform 1s linear;

    &__face {
      position: absolute;
      width: 100px;
      height: 100px;
      border: 2px solid $dice-border;
      background: $dice-background;
      color: white;
      font-size: 12px;
      text-align: center;
      transition: 0.5s ease;
      &--box-shadow {
        @include box-shadow-dice-rotating;
      }
    }
  }
</style>
