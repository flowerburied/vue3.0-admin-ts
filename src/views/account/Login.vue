<template>
  <div class="account">
    <div class="from-wrap">
      <a-form
        name="custom-validation"
        ref="ruleForm"
        v-bind="fromConfig.layout"
      >
        <a-form-item>
          <label>用户名</label>
          <a-input type="text" autocomplete="off" />
        </a-form-item>
        <a-form-item>
          <label>密码</label>
          <a-input type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit"> 登录 </a-button>
        </a-form-item>
      </a-form>
      <div class="fs-12 text-center">
        <a href="" class="color-white">忘记密码 </a>|
        <a href="" class="color-white">注册</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive,defineComponent } from "vue";

export default defineComponent({
  components: {},
  setup(props) {
    const fromConfig = reactive({
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    });

    return { fromConfig };
  },
});
</script>

<style lang="scss">
@import "./style.scss";
</style>
