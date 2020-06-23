import Vue from 'vue'

Vue.prototype.toSlug = (string) => {
  return encodeURIComponent(string.replace(/\+/g, ' '))
}

export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  app.toSlug = (string) => unescape(encodeURIComponent(string))
}
