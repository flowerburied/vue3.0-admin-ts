<template>
  <div class="account">
    <div class="from-wrap">
      <a-form
        name="custom-validation"
        ref="ruleForm"
        @finish="handleFinish"
        v-bind="layout"
        :model="account_from"
        :rules="rules_from"
      >
        <a-form-item name="username">
          <label>用户名</label>
          <a-input v-model:value="account_from.username" type="text" autocomplete="off" />
        </a-form-item>
        <a-form-item name="password">
          <label>密码</label>
          <a-input v-model:value="account_from.password" type="text" autocomplete="off" />
        </a-form-item>
        <a-form-item name="passwords">
          <label>确认密码</label>
          <a-input
            v-model:value="account_from.passwords"
            type="text"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item name="code">
          <label>验证码</label>
          <a-row :gutter="15">
            <a-col :span="14">
              <a-input
                maxlength="6"
                v-model:value="account_from.code"
                type="password"
                autocomplete="off"
            /></a-col>
            <a-col :span="10">
              <a-button
                type="primary"
                @click="getCode"
                block
                :disabled="botten_disabled"
                :loading="botten_loading"
                >{{ botten_text }}</a-button
              >
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block> 登录 </a-button>
        </a-form-item>
      </a-form>
      <div class="fs-12 text-center">
        <a href="" class="color-white">忘记密码 </a>|
        <!-- <a href="" class="color-white">注册</a> -->
        <router-link to="/register">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { message } from "ant-design-vue";
// 导入验证方法
import {
  checkPhone,
  checkPassword as password,
  checkCode as checkCodefun,
} from "@/utils/verification";
// import { checkPhone as phone } from "@/utils/verification";
// import * as veri from "@/utils/verification";
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  setup(props) {
    // 校验手机号
    const checkusername = async (
      rule: any,
      value: string,
      callback: any
    ): Promise<void> => {
      //   console.log("regPhong", regPhong.test(value));

      if (!value) {
        return Promise.reject("请输入用户名"); //不存在情况
      } else if (!checkPhone(value)) {
        return Promise.reject("请输入11位数字的手机号"); //手机号错误情况
      } else {
        return Promise.resolve();
      }
    };
    // 校验密码
    const checkPassword = async (
      rule: any,
      value: string,
      callback: any
    ): Promise<void> => {
      const passwords = fromConfig.account_from.passwords;
      //   console.log("regPhong", regPhong.test(value));
      console.log("pas", passwords, value);
      if (!value) {
        return Promise.reject("请输入密码"); //不存在情况
      } else if (!password(value)) {
        return Promise.reject("请输入6~20位的数字加英文"); //密码错误情况
      } else if (passwords && value) {
        //必须是俩个密码都存在的情况下，才会检测密码是否一致，否则不校验
        if (passwords != value) {
          return Promise.reject("两次密码不一致"); //手机号错误情况
        }
      } else {
        return Promise.resolve();
      }
    };
    // 再次校验密码
    const checkPasswords = async (
      rule: any,
      value: string,
      callback: any
    ): Promise<void> => {
      const pas = fromConfig.account_from.password;
      console.log("pas", pas, value);
      if (!value) {
        return Promise.reject("请再次输入密码"); //不存在情况
      } else if (!password(value)) {
        return Promise.reject("请输入6~20位的数字加英文"); //密码错误情况
      } else if (pas && value) {
        //必须是俩个密码都存在的情况下，才会检测密码是否一致，否则不校验
        if (pas != value) {
          return Promise.reject("两次密码不一致"); //手机号错误情况
        }
      } else {
        return Promise.resolve();
      }
    };
    // 校验验证码
    const checkCode = async (rule: any, value: string, callback: any): Promise<void> => {
      const pas = fromConfig.account_from.password;
      console.log("pas", pas, value);
      if (!value) {
        return Promise.reject("请输入验证码"); //不存在情况
      } else if (!checkCodefun(value)) {
        return Promise.reject("请输入6位的数字加英文"); //密码错误情况
      } else {
        return Promise.resolve();
      }
    };
    const dataItem = reactive({
      // 获取验证码按钮
      botten_text: "获取验证码",
      botten_loading: false,
      botten_disabled: false,
      sec: 60,
      timer: null,
    });
    const fromConfig = reactive({
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      account_from: {
        username: "",
        password: "",
        passwords: "",
        code: "",
      },
      rules_from: {
        username: [{ validator: checkusername, trigger: "change" }],
        password: [{ validator: checkPassword, trigger: "change" }],
        passwords: [{ validator: checkPasswords, trigger: "change" }],
        code: [{ validator: checkCode, trigger: "change" }],
      },
    });
    // 获取验证码
    const getCode = (): void => {
      // 用户不存在
      if (!fromConfig.account_from.username) {
        message.error("用户名不能为空");
        return;
      }

      dataItem.timer && clearInterval(Number(dataItem.timer));
      // if (dataItem.timer) {
      //   clearInterval(time);
      // }
      dataItem.timer = <any>setInterval(() => {
        const s = dataItem.sec--;
        console.log("11", s);
        dataItem.botten_text = s + "秒";
        if (s <= 0) {
          clearInterval(Number(dataItem.timer));
          dataItem.botten_text = `重新获取`;
        }
      }, 1000);
    };
    // 提交表单
    const handleFinish = (value: any): void => {
      console.log("value", value);
    };

    const from = toRefs(fromConfig);
    const data = toRefs(dataItem);
    return { ...from, ...data, handleFinish, getCode };
  },
});
</script>

<style lang="scss">
@import "./styles.scss";
</style>
