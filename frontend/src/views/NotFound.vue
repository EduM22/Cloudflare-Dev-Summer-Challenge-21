<template>
  <div>
    <metainfo>
      <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>
    <div>404</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMeta } from 'vue-meta'
export default defineComponent({
  name: 'NotFound',
  components: {},
  setup () {
    useMeta({
      title: "Shopy - 404",
      meta: [
        { name: 'description', content: 'Shopy has all the products you need for your writing/thinking needs' },
        // TODO: remove on real site   
        { name: 'robots', content: 'noindex,nofollow' } 
      ]
    })
  },
})
</script>
