<template>
  <div class="flex flex-wrap w-full font-avenir max-w-xl mx-auto">
    <div v-for="category in categories" :key="category" class="w-1/4">
      <h1 class="mx-4">{{category}}</h1>
      <field v-for="(constant, key) in filterConstantsByCategory(category)" :key="key" class="mx-4"
      @update="ev => update(ev, key)" :value="calculate(key)" :fieldType="fields[key].type"
      :label="fields[key].label" :readOnly="fields[key].readOnly" />
    </div>
  </div>
</template>

<script>
import constants from './constants/constants.json'
import mapConstants from './utils/map-constants.js'
import Field from './components/Field.vue'

export default {
  name: 'App',
  components: {
    Field
  },
  data() {
    const { mappedConstants, categories } = mapConstants(constants)

    return {
      ...mappedConstants,
      constants: mappedConstants,
      fields: constants.fields,
      categories
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
    filterConstantsByCategory(category) {
      let result = {}, fields = this.fields
      Object.keys(this.constants).forEach((key) => {
        console.log({ cat: this.fields[key].cateogry, fields: this.fields, key })
        if (fields[key].category === category) { result[key] = this.constants[key] }
      })
      return result
    },
    update(ev, key) {
      this[key] = ev.target.value
      this.constants[key] = ev.target.value
    },
    calculate(key) {
      return this.fields[key].calculate ? eval(this.fields[key].calculate) : this[key]
    }
  }
}
</script>

<style>
input { border: none; }
h1 { font-size: 1rem; margin-bottom: 0; }
label { color: grey; font-size: 0.8rem; }
.border-bottom { border-bottom: 1px solid black; }
.text-sm { font-size: .875rem; }
.flex { display: flex; }
.flex-wrap { flex-wrap: wrap; }
.w-full { width: 100%; }
.h-16 { height: 4rem; }
.max-w-xl { max-width: 1000px; }
.mx-auto { margin-right: auto; margin-left: auto; }
.pb-1 { padding-bottom: 0.25rem; }
.mx-4 { padding-left: 1rem; padding-right: 1rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.font-avenir {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@media only screen and (max-width: 768px) {
  .w-1\/4 { width: 100%; }
}
@media (min-width: 768px) {
  .w-1\/4 { width: 25%; }
}
</style>
