<template>
  <div>
    <img
      src="http://localhost:5000/uploads/88bfeec5-1a03-5331-ac98-4b15fea64f2b.png"
      @click="userLogin"
    />
    <img
      src="https://port-backend.vercel.app/uploads/88bfeec5-1a03-5331-ac98-4b15fea64f2b.png"
      @click="userLogin"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: 'rAnT1989',
        password: '5921069',
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
