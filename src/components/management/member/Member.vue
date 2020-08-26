<template>
  <component v-bind:is="Component" @ChangeFunction="ChangeFunction" :AdjustMember="AdjustMember"></component>
</template>

<script>
import Createmember from '@/components/management/member/Createmember.vue'
import Mainmember from '@/components/management/member/Mainmember.vue'
import MemberView from '@/components/management/member/MemberView.vue'
import AdjustMember from '@/components/management/member/AdjustMember.vue'
import CategoryMember from '@/components/management/member/CategoryMember.vue'
import AdjustCategory from '@/components/management/member/AdjustCategory.vue'

export default {
  components: {
    'Createmember': Createmember,
    'Mainmember': Mainmember,
    'MemberView': MemberView,
    'AdjustMember': AdjustMember,
    'CategoryMember': CategoryMember,
    'AdjustCategory': AdjustCategory,
  },

  data() {
    return {
      Component: 'Mainmember',
      AdjustMember: null,
    };
  },

  methods: {
    ChangeFunction(ProductFunction, AdjustM) {
      this.Component = ProductFunction
      this.AdjustMember = AdjustM
    },

    GoBack() {
      if(this.Component == 'AdjustMember') {
        this.Component = 'MemberView'
      }
      else if(this.Component == 'AdjustCategory') {
        this.Component = 'CategoryMember'
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
