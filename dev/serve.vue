<script lang="ts">
import { defineComponent } from 'vue';
import Aj_select from '@/aj_select.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    Aj_select
  }
});
</script>

<template>
  <div id="app">
    <aj_select />
  </div>
</template>
