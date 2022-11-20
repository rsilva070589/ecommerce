<template>
  <input type="text" v-mask="currencyMask" v-model="form.salary" />
</template>

<script>
import createNumberMask from "text-mask-addons/dist/createNumberMask";

export default {
  data() {
    return {
      form: {
        salary: null,
      },
      currencyMask: createNumberMask({
        prefix: "",
        includeThousandsSeparator: true,
        allowNegative: false,
        thousandsSeparatorSymbol: ".",
      }),
    };
  },
};
</script>