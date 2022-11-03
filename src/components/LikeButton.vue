<template>
  <div
      @mouseover="onHover"
      @mouseleave="onHoverLeave"
      class="like-button"
  >
    <font-awesome-icon
        v-show="showActiveButton"
        @click.stop="onClick"
        icon="fa-solid fa-heart"
    />
    <font-awesome-icon
        v-show="showInactiveButton"
        @click.stop="onClick"
        icon="fa-regular fa-heart" />
  </div>
</template>

<script>
export default {
  name: "LikeButton",
  props: ['activeState'],

  data() {
    return {
      hover: false,
      hoverOnActive: false,
      hoverOnInactive: false,
    }
  },

  computed: {
    showActiveButton() {
      if (this.hoverOnInactive) return true
      else if (this.hoverOnActive) return false
      return this.activeState
    },
    showInactiveButton() {
      if (this.hoverOnActive) return true
      else if (this.hoverOnInactive) return false
      return !this.activeState
    }
  },

  methods: {
    onHover() {
      if (this.activeState) this.hoverOnActive = true
      else if (!this.activeState) this.hoverOnInactive = true
    },
    onHoverLeave() {
      this.hoverOnActive = false
      this.hoverOnInactive = false
    },
    onClick() {
      const event = this.activeState ? 'remove' : 'add'
      this.$emit(event)
    }
  }
}
</script>

<style scoped>
.like-button {
  position: absolute;
  top: var(--sm);
  right: var(--sm);
  font-size: var(--lg);
}

/*.like-button svg {*/
/*  position: absolute;*/
/*}*/
</style>