const requireComponents = import.meta.glob('./*/*.vue', { eager: true })
const components = Object.keys(requireComponents).reduce((total, path) => {
  console.log(path)
  const module = requireComponents[path]
  const component = module.default || module
  total[path.split('/')[1]] = component

  return total
}, {})

export default components
