export default constants => {
  let mappedConstants = {}, categories = []
  for (const [key, value] of Object.entries(constants.fields)) {
    if (value.defaultValue >= 0) {
      mappedConstants[key] = value.defaultValue
    } else {
      mappedConstants[key] = value.calculate
    }
    if (!categories.includes(value.category)) {
      categories.push(value.category)
    }
  }
  return { mappedConstants, categories }
}
