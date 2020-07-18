<template>
  <div id="app">
    <div v-for="(constant, key) in constants" :key="key">
      {{fields[key].label}}<br>
      <input @input="update($event, key)"
      :value="calculate(key)"
      v-if="!fields[key].readOnly">
      <div v-else>{{calculate(key)}}</div>
    </div>
  </div>
</template>

<script>
import constants from './constants/constants.json'

export default {
  name: 'App',
  data() {
    let mappedConstants = {}
    for (const [key, value] of Object.entries(constants.fields)) {
      if (value.defaultValue >= 0) {
        mappedConstants[key] = value.defaultValue
      } else {
        mappedConstants[key] = value.calculate
      }
    }
    return {
      ...mappedConstants,
      constants: mappedConstants,
      fields: constants.fields
    }
  },
  mounted() {
    for (const [key, value] of Object.entries(constants.fields)) {
      if (value.calculate) {
        this[key] = eval(value.calculate)
        this.constants[key] = eval(value.calculate)
      }
    }
  },
  methods: {
    update(ev, key) {
      this[key] = ev.target.value
      this.constants[key] = ev.target.value
      this.$forceUpdate()
    },
    calculate(key) {
      return this.fields[key].calculate ? eval(this.fields[key].calculate) : this[key]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
