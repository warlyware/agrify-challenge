<template>
  <div id="app" class="flex w-full">
    <div class="w-1/4 px-4">
      <h1>Time</h1>
      <field v-for="(constant, key) in timeConstants" :key="key"
      @update="ev => update(ev, key)" :value="calculate(key)" :fieldType="fields[key].type"
      :label="fields[key].label" :readOnly="fields[key].readOnly" />
    </div>

    <div class="w-1/4 px-4">
      <h1>Heat/Cooling</h1>
      <field v-for="(constant, key) in heatCoolingConstants" :key="key"
      @update="ev => update(ev, key)" :value="calculate(key)" :fieldType="fields[key].type"
      :label="fields[key].label" :readOnly="fields[key].readOnly" />
    </div>

    <div class="w-1/4 px-4">
      <h1>Weights and Measures</h1>
      <field v-for="(constant, key) in weightsAndMeasuresConstants" :key="key"
      @update="ev => update(ev, key)" :value="calculate(key)" :fieldType="fields[key].type"
      :label="fields[key].label" :readOnly="fields[key].readOnly" />
    </div>

    <div class="w-1/4 px-4">
      <h1>Staff Expense</h1>
      <field v-for="(constant, key) in staffExpenseConstants" :key="key"
      @update="ev => update(ev, key)" :value="calculate(key)" :fieldType="fields[key].type"
      :label="fields[key].label" :readOnly="fields[key].readOnly" />
    </div>
  </div>
</template>

<script>
import constants from './constants/constants.json'
import Field from './components/Field.vue'

export default {
  name: 'App',
  components: {
    Field
  },
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
  computed: {
    timeConstants() {
      let constants = {}
      Object.keys(this.constants).forEach(key => {
        if (this.fields[key].category === 'Time')
        constants[key] = this.constants[key]
      })
      return constants
    },
    heatCoolingConstants() {
      let constants = {}
      Object.keys(this.constants).forEach(key => {
        if (this.fields[key].category === 'Heat/Cooling')
        constants[key] = this.constants[key]
      })
      return constants
    },
    weightsAndMeasuresConstants() {
      let constants = {}
      Object.keys(this.constants).forEach(key => {
        if (this.fields[key].category === 'Weights and Measures')
        constants[key] = this.constants[key]
      })
      return constants
    },
    staffExpenseConstants() {
      let constants = {}
      Object.keys(this.constants).forEach(key => {
        if (this.fields[key].category === 'Staff Expense')
        constants[key] = this.constants[key]
      })
      return constants
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
input {
  border: none;
}
.border-bottom {
  border-bottom: 1px solid black;
}
.text-sm { font-size: .875rem; }
.flex {
  display: flex;
}
.w-full {
  width: 100%;
}
.w-1\/4 {
  width: 25%;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.pb-1 {
  padding-bottom: 0.25rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
h1 {
  font-size: 1rem;
  margin-bottom: 0;
}
label {
  color: grey;
  font-size: 0.8rem;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
