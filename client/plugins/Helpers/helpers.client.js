import Vue from 'vue'

Vue.prototype.toSlug = (string) => {
  return decodeURIComponent(string.replace(/\+/g, ' '))
}

export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  app.toSlug = (string) => decodeURIComponent(string.replace(/\+/g, ' '))
}
