<template>
  <div>
    <label>
      {{label}}
    </label><br>
    <input @input="$emit('update', $event)"
    :value="value"
    v-if="!readOnly">
    <div v-else>{{value}}</div>
  </div>
</template>

<script>
export default {
  props: ['read-only', 'label', 'value']
}
</script>

<style lang="scss" scoped>

</style>
