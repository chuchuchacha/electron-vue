<template>
  <component v-bind:is="Component" @ChangeFunction="ChangeFunction"></component>
</template>

<script>
import Createmember from '@/components/management/member/Createmember.vue'
import Mainmember from '@/components/management/member/Mainmember.vue'

export default {
  components: {
    'Createmember': Createmember,
    'Mainmember': Mainmember,
  },

  data() {
    return {
      Component: 'Mainmember',
    };
  },

  methods: {
    ChangeFunction(ProductFunction) {
      this.Component = ProductFunction
    },

    GoBack() {
      if(this.Component != 'Mainmember') {
        this.Component = 'Mainmember'
      }
      else if(this.Component == 'Mainmember') {
        this.$emit('BackToMain')
      }
    },
  },

  mounted() {
    this.$root.$on('GoBack', () => {
        this.GoBack();
    });
  },
};
</script>

<style scoped src="@/assets/css/main.css"></style>
