<template>
  <img
    src="http://localhost:5000/uploads/88bfeec5-1a03-5331-ac98-4b15fea64f2b.png"
    @click="userLogin"
  />
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: 'rant1989',
        password: '1234567890',
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.login,
        })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
