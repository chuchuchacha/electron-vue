<template>
  <mainpaged @ChangeTitle="InitialData"/>
</template>

<script>
import mainpaged from '@/components/mainpage.vue'

export default {
  name: 'scrapp1',
  components: {
    mainpaged
  },

  methods: {
    InitialData(TitleText) {
      this.$emit('ChangeTitle', TitleText);
    }
  }
}
</script>