<template lang="html">
<div class="container">
<Breadcrumb :items="breadcrumb"></Breadcrumb>
<el-form ref="form" :model="form" :rules="formRules" label-width="160px">
  <el-form-item label="工程名称" prop="name" class="input">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="建设单位" prop="owner" :rules="{ required: true, message: '必须：请务必输入关键字获取单位', trigger: 'blur' }">
    <el-select
      v-model="form.owner"
      filterable
      remote
      reserve-keyword
      value-key="_id"
      :remote-method="onSearchEntity('owner')"
      :loading="loading">
      <el-option :value="form.owner" :label="form.owner.name" v-if="form.owner !== '' && owners.length === 0 "></el-option>
      <el-option
        v-for="item in owners"
        :key="item._id"
        :label="item.name"
        :value="item">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="监理单位" prop="supervisor" :rules="{ required: true, message: '必须：请务必输入关键字获取单位', trigger: 'blur' }">
    <el-select
      v-model="form.supervisor"
      filterable
      remote
      reserve-keyword
      value-key="name"
      :remote-method="onSearchEntity('supervisor')"
      :loading="loading">
      <el-option :value="form.supervisor" :label="form.supervisor.name" v-if="form.supervisor !== '' && supervisors.length === 0"></el-option>
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
      :remote-method="onSearchEntity('builder')"
      :loading="loading">
      <el-option :value="form.builder" :label="form.builder.name" v-if="form.builder !== '' && builders.length === 0"></el-option>
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
      :remote-method="onSearchEntity('designer')"
      :loading="loading">
      <el-option :value="form.designer" :label="form.designer.name" v-if="form.designer !== '' && designers.length === 0"></el-option>
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
  <!-- http://localhost:8080/#/project/form?id=5b75281dac36520091667355 -->
</el-form>
</div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { mapActions, mapGetters } from 'vuex'
import isEqual from 'lodash.isequal'
import cloneDeep from 'lodash.clonedeep'
import projectService from '@/service/project'
export default {
  data() {
    return {
      breadcrumb: [
        { label: '工程管理' },
        { label: '添加' }
      ],
      loading: false,
      form: {
        _id: '',
        name: '',
        owner: '',
        builder: '',
        supervisor: '',
        designer: ''
      },
      temp: {},
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
    if (this.$route.query.id) {
      const that = this
      projectService.initFormData({id: this.$route.query.id}).then(data => {
        that.form = data
        that.temp = cloneDeep(data)
      })
    }
  },
  computed: {
    ...mapGetters({
      owners: 'project/owners',
      designers: 'project/designers',
      builders: 'project/builders',
      supervisors: 'project/supervisors',
      project: 'project/project'
    })
  },
  methods: {
    ...mapActions({
      searchEntity: 'project/searchEntity',
      submit: 'project/submit',
      initFormData: 'project/initFormData'
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
      if (isEqual(this.form, this.temp)) {
        this.$message('表单未做修改')
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit(this.form).then(result => {
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
