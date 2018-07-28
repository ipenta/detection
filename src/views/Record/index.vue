<template lang="html">
<div class="container">
  <p>委托信息</p>
  <el-form ref="form" :model="form" :rules="formRules" label-width="160px" class="simple-form">
    <el-form-item label="委托方案全称" prop="title">
        <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="所属工程" prop="project">
      <el-select
        v-model="form.project"
        filterable
        remote
        reserve-keyword
        value-key="_id"
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
      <router-link to="/project" class="el-button el-button--primary">新增工程</router-link>
    </el-form-item>
    <el-form-item label="委托单位" prop="entity">
      <el-select v-model="form.entity" value-key="label" filterable placeholder="【所属工程】填写后可选">
        <el-option
          v-for="item in entities"
          :key="item.value"
          :label="item.label"
          :value="item.vaule">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="委托人" prop="principal">
      <el-select
        v-model="form.principal"
        filterable
        remote
        reserve-keyword
        value-key="_id"
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
    <el-form-item label="委托人电话">
        <el-input :value="form.principal.phonenum" placeholder="【委托人】获取" disabled></el-input>
    </el-form-item>
    <el-form-item>
      <el-button>取 消</el-button>
      <el-button type="primary" @click="onSubmit('form')">完成,继续委托明细</el-button>
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
      projects: [],
      project: '',
      loading: false,
      record: '',
      formRules: {
        title: [
          { required: true, message: '必须：请务必填写委托方案名', trigger: 'blur' },
          { min: 3, message: '长度不能少于 3 个字符', trigger: 'blur' }
        ],
        entity: [
          { required: true, message: '必须：请务必选择', trigger: 'change' }
        ],
        project: [
          { required: true, message: '必须：请务必选择', trigger: 'blur' } // 这里需要用到全局变量
        ],
        principal: [
          { required: true, message: '必须：请务必选择', trigger: 'blur' } // 这里需要用到全局变量
        ]
      }
    }
  },
  computed: {
    entities: function() {
      let entities = []
      let _project = this.form.project
      if (_project !== '' && Array.isArray(_project.entities)) {
        _project.entities.forEach(item => {
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
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('addRecord', this.form).then(msg => {
            if (msg.status === 'success') {
              this.$refs[formName].resetFields()
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="css">
.simple-form{
  max-width: 800px;
}
</style>
