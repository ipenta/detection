<template lang="html">
  <header class="header">
    <el-menu mode="horizontal" class="menu" @click="handleSelect">
      <li class="el-menu-item">
        <h2>标题</h2>
      </li>
      <el-menu-item index="1"><router-link to="/record">记录</router-link></el-menu-item>
      <el-menu-item index="2"><router-link to="/record">记录</router-link></el-menu-item>
      <el-dropdown style="float: right;height: 60px;line-height: 60px;margin: 0 16px;">
        <span class="el-dropdown-link">
          {{ email }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人</el-dropdown-item>
          <el-dropdown-item><router-link to="/logout">登出</router-link></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </header>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  data() {
    return {
      logourl: './static/a.svg'
    }
  },
  computed: {
    ...mapGetters(['email'])
  },
  methods: {
    handleSelect: function() {

    }
  }
}
</script>

<style lang="css">
.el-menu-item h2{
  margin: 0;
}
.nav-gap{
  position: relative;
    width: 1px;
    height: 80px;
    padding: 0 20px;
}
</style>
