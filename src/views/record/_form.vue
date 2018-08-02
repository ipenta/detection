<template lang="html">
<div class="container">
  <Breadcrumb :items="breadcrumb"></Breadcrumb>
  <el-form ref="form" :model="form" :rules="formRules" label-width="160px">
    <el-form-item label="委托方案全称" prop="title" class="input">
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
      &nbsp;&nbsp;&nbsp;<router-link to="/project" class="el-button el-button--primary">新增工程</router-link>
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
      &nbsp;&nbsp;&nbsp;<router-link to="/principal" class="el-button el-button--primary">新增委托人</router-link>
    </el-form-item>
    <el-form-item label="委托人电话">
      <span>{{ form.principal.phonenum || '' }}</span>
    </el-form-item>
    <el-form-item>
      <el-button @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" @click="onSubmit('form', 'addRecord')">完成</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { EntityMap } from '@/utils/map'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  data() {
    return {
      breadcrumb: [
        { label: '记录' },
        { label: '记录表单' }
      ],
      form: {
        uid: '',
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
  mounted: function () {
    this.form.uid = this.$route.params.id
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
    onSubmit(formName, action) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch(action, this.form).then(msg => {
            if (msg.status === 'success') {
              this.$refs[formName].resetFields()
              this.$router.go(-1)
            }
          })
        }
      })
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="css">
</style>
