<template>
  <div class="home">
    <div>
      <input placeholder="请输入登录账号" v-model="dataForm.loginNo" type="text">
    </div>
    <div>
      <input placeholder="请输入密码" v-model="dataForm.password" type="text">
    </div>
    <button @click="login">登录</button>
  </div>
</template>

<script>
// @ is an alias to /src
import { login } from '@/api/base'
export default {
  name: 'Home',
  data() {
    return {
      dataForm: {
        loginNo: null,
        password: null,
      },
    }
  },
  methods: {
    login() {
      login(this.dataForm).then(res => {
        console.log(res);
      })
    }
  },
};
</script>
