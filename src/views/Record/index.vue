<template lang="html">
<div class="container">
  <p>委托信息</p>
  <el-form ref="form" :model="form" :rules="formRules" label-width="160px" class="simple-form">
    <el-form-item label="委托方案全称" prop="title">
        <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="所属工程" prop="project">
      <el-select
        v-model="project"
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词获取工程"
        :remote-method="onSearchProject"
        :loading="loading">
        <el-option
          v-for="item in projects"
          :key="item._id"
          :label="item.name"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="委托单位">
      <el-select v-model="form.entity" filterable placeholder="【所属工程】填写后可选">
        <el-option
          v-for="item in entities"
          :key="item.value"
          :label="item.label"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="委托人">
      <el-select
        v-model="principal"
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="onSearchPrincipal"
        :loading="loading">
        <el-option
          v-for="item in principals"
          :key="item._id"
          :label="item.name"
          :value="item">
        </el-option>
      </el-select>
      <router-link to="/principal" class="el-button el-button--primary">新增委托人</router-link>
    </el-form-item>
    <el-form-item label="委托人电话" prop="phonenum">
        <el-input v-model="principal.phonenum" placeholder="【委托人】获取" disabled></el-input>
    </el-form-item>
    <el-form-item>
      <el-button>取 消</el-button>
      <el-button type="primary" @click="onDetailSubmit">进一步完成委托明细</el-button>
    </el-form-item>
  </el-form>

</div>
</template>

<script>
import { EntityMap } from '@/utils/map'
export default {
  data() {
    return {
      form: {
        title: '',
        project: '',
        entity: '',
        principal: ''
      },
      principals: [],
      principal: '',
      isPrincipalFormShow: false,
      projects: '',
      project: '',
      loading: false,
      record: '',
      formRules: {
        title: [
          { required: true, message: '必须：请务必填写委托方案名', trigger: 'blur' },
          { min: 3, message: '长度不能少于 3 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    entities: function() {
      let entities = []
      if (this.project !== '') {
        this.project.entities.forEach(item => {
          entities.push({
            vaule: item.name,
            label: EntityMap[item.type] + ' - ' + item.name
          })
        })
      }
      return entities
    }
  },
  methods: {
    onSearchProject(name) {
      let that = this
      if (name !== '') {
        this.$store.dispatch('searchProject', {
          name: name
        }).then(context => {
          that.projects = context
        })
      }
    },
    onRecordSubmit() {
      this.form.project = this.project
    },
    onSearchPrincipal(name) {
      let that = this
      if (name !== '') {
        this.$store.dispatch('searchPrincipal', {
          name: name
        }).then(context => {
          that.principals = context
        })
      }
    },
    onDetailSubmit() {
      console.log('onDetailSubmit')
    },
    getSummaries() {
      // const {
      //   columns,
      //   data
      // } = param
      // const sums = []
      // columns.forEach((column, index) => {
      //   if (index === 0) {
      //     sums[index] = '总价'
      //     return
      //   }
      //   const values = data.map(item => Number(item[column.property]))
      //   if (!values.every(value => isNaN(value))) {
      //     sums[index] = values.reduce((prev, curr) => {
      //       const value = Number(curr)
      //       if (!isNaN(value)) {
      //         return prev + curr
      //       } else {
      //         return prev
      //       }
      //     }, 0)
      //     sums[index] += ' 元'
      //   } else {
      //     sums[index] = 'N/A'
      //   }
      // })
      //
      // return sums
    }
  }
}
</script>

<style lang="css">
.simple-form{
  max-width: 800px;
}
</style>
