<template>
  <div>
    
  </div>
</template>

<script>

export default {
  components: {
    
  },

  data() {
    return {
      
    }
  },

  methods: {
    GoBack() {
      this.$emit('BackToMain')
    },
  },

  mounted() {
    this.$root.$on('GoBack', () => {
      this.GoBack();
    });
  },
}
</script>

<style scoped src="@/assets/css/StatementView.css"></style>