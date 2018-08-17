<template lang="html">
<div class="container">
<Breadcrumb :items="breadcrumb"></Breadcrumb>
<el-form ref="form" :model="form" :rules="formRules" label-width="160px">
  <el-form-item label="工程名称" prop="name" class="input">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="建设单位" prop="owner">
    {{form.owner}}
    <el-select
      v-model="form.owner"
      filterable
      remote
      reserve-keyword
      value-key="_id"
      placeholder="请输入关键词"
      :remote-method="onSearchEntity('owner')"
      :loading="loading">
      <el-option
        v-for="item in owners"
        :key="item._id"
        :label="item.name"
        :value="item">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="监理单位" prop="supervisor" :rules="{ required: true, message: '必须：请务必输入关键字获取单位', trigger: 'blur' }">
    {{form.supervisor}}
    <el-select
      v-model="form.supervisor"
      filterable
      remote
      reserve-keyword
      value-key="name"
      placeholder="请输入关键词"
      :remote-method="onSearchEntity('supervisor')"
      :loading="loading">
      <el-option
        v-for="item in supervisors"
        :key="item._id"
        :label="item.name"
        :value="item">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="施工单位"  prop="builder" :rules="{ required: true, message: '必须：请务必输入关键字获取单位', trigger: 'blur' }">
    <el-select
      v-model="form.builder"
      filterable
      remote
      reserve-keyword
      value-key="name"
      placeholder="请输入关键词"
      :remote-method="onSearchEntity('builder')"
      :loading="loading">
      <el-option
        v-for="item in builders"
        :key="item._id"
        :label="item.name"
        :value="item">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="设计单位" prop="designer" :rules="{ required: true, message: '必须：请务必输入关键字获取单位', trigger: 'blur' }">
    <el-select
      v-model="form.designer"
      filterable
      remote
      reserve-keyword
      value-key="name"
      placeholder="请输入关键词"
      :remote-method="onSearchEntity('designer')"
      :loading="loading">
      <el-option
        v-for="item in designers"
        :key="item._id"
        :label="item.name"
        :value="item">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <router-link to="/project" class="el-button">取消</router-link>
    <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
  </el-form-item>
  {{form}}
</el-form>
</div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { mapActions, mapGetters } from 'vuex'
import * as projectService from '@/service/project'
export default {
  data() {
    return {
      breadcrumb: [
        { label: '工程管理' },
        { label: '添加' }
      ],
      loading: false,
      form: {
        name: '',
        owner: {},
        builder: {},
        supervisor: {},
        designer: {}
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      formRules: {
        name: [
          { required: true, message: '必须：请务必填写工程名', trigger: 'blur' },
          { min: 3, message: '长度不能少于 3 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted: function () {
    const that = this
    projectService.initFormData({id: this.$route.query.id}).then(data => {
      that.form = data
      console.log(that.form)
    })
  },
  computed: {
    ...mapGetters({
      owners: 'project/owners',
      designers: 'project/designers',
      builders: 'project/builders',
      supervisors: 'project/supervisors'
    })
  },
  methods: {
    ...mapActions({
      searchEntity: 'project/searchEntity',
      createProject: 'project/createProject'
    }),
    onSearchEntity(type) {
      const that = this
      return function (entityName) {
        if (entityName !== '') {
          that.searchEntity({ type: type, name: entityName })
        }
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createProject(this.form).then(result => {
            this.$router.push('/project')
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
.el-dialog{
  position: absolute;
  top:16px;
  left: 16px;
  bottom: 16px;
  width: 60%;
  margin: 0;
}
</style>
