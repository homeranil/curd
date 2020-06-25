<template>
  <div class="flex">
    <label
      v-for="answer in options"
      :key="randId + answer.value"
      class="admin-radio ltr:mr-1 rtl:ml-1"
    >
      <input
        :id="randId + answer.name"
        v-model="select"
        type="radio"
        :name="randId"
        :value="answer.value"
        class="hidden"
        @input="update(answer.value)"
      />
      <label
        :for="randId + answer.name"
        class="flex items-center cursor-pointer"
      >
        <span
          class="w-4 h-4 inline-block ltr:mr-1 rtl:ml-1 rounded-full border border-grey"
        ></span>
        {{ $t(answer.name) }}
      </label>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
    options: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {
      randId: null,
      select: this.value,
    }
  },
  created() {
    this.randId = this.value
  },
  methods: {
    update(value) {
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="scss" scoped>
input[type='radio'] + label span {
  transition: background 0.2s, transform 0.2s;
}

input[type='radio'] + label span:hover,
input[type='radio'] + label:hover span {
  transform: scale(1.2);
}

input[type='radio']:checked + label span {
  background-color: #3490dc; //bg-blue
  box-shadow: 0px 0px 0px 2px white inset;
}

input[type='radio']:checked + label {
  color: #3490dc; //text-blue
}
</style>
