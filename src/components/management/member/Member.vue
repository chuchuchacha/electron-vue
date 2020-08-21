<template>
  <component v-bind:is="Component" @ChangeFunction="ChangeFunction"></component>
</template>

<script>
import Createmember from '@/components/management/member/Createmember.vue'
import Mainmember from '@/components/management/member/Mainmember.vue'
import MemberView from '@/components/management/member/MemberView.vue'
import AdjustMember from '@/components/management/member/AdjustMember.vue'

export default {
  components: {
    'Createmember': Createmember,
    'Mainmember': Mainmember,
    'MemberView': MemberView,
    'AdjustMember': AdjustMember,
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
      if(this.Component == 'AdjustMember') {
        this.Component = 'MemberView'
      }
      else if(this.Component != 'Mainmember') {
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
