<template>
  <div>
    <label>
      {{label}}
    </label><br>
    <div class="border-bottom" v-if="!readOnly">
      <span class="text-sm" v-if="fieldType === 'percent'">%</span>
      <input @input="$emit('update', $event)"
      :value="round(value)">
    </div>
    <div class="text-sm" v-else>
      <span v-if="fieldType === 'percent'">%</span>
      {{round(value)}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['read-only', 'label', 'value', 'field-type'],
  methods: {
    round(value) { return +value.toFixed(2) }
  }
}
</script>
