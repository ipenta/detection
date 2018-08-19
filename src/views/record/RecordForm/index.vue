<template lang="html">
  <el-form ref="form" :model="form" :rules="formRules" label-width="160px" style="padding-top:20px;border:1px solid #eee;">
    <el-form-item label="委托方案全称" prop="title" class="input">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="所属工程" prop="project">
      <el-select
        v-model="form.project"
        filterable
        remote
        reserve-keyword
        value-key="name"
        placeholder="请输入关键词获取工程"
        :remote-method="onSearchProject"
        :loading="loading">
        <el-option :value="form.project" :label="form.project.name" v-show="form.project !== '' && projects === ''"></el-option>
        <el-option
          v-for="item in projects"
          :key="item._id"
          :label="item.name"
          :value="item">
        </el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;<router-link to="/project" class="el-button" size="mini">新增工程</router-link>
    </el-form-item>
    <el-form-item label="委托单位" prop="entity">
      <el-select v-model="form.entity" value-key="name" filterable placeholder="【所属工程】填写后可选">
        <el-option
          v-for="item in entities"
          :key="item.key"
          :label="item.label"
          :value="item.entity">
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
        <el-option :value="form.principal" :label="form.principal.name" v-show="form.principal !== '' && principals === ''"></el-option>
        <el-option
          v-for="item in principals"
          :key="item._id"
          :label="item.name"
          :value="item">
        </el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;<router-link to="/principal" class="el-button" size="mini">新增委托人</router-link>
    </el-form-item>
    <el-form-item label="委托人电话">
      <span>{{ form.principal.phonenum || '' }}</span>
    </el-form-item>
    <el-form-item>
      <el-button size="middle" @click="onClose('form')">放弃</el-button>
      <el-button type="primary" size="middle" @click="onSubmit('form','addRecord')">
        <span v-if="content===''">添加</span>
        <span v-if="content!==''">修改</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { EntityMap } from '@/utils/map'
export default {
  props: ['content'],
  data() {
    return {
      form: {
        _id: this.content._id || '',
        uid: this.content.uid || '1',
        title: this.content.title || '',
        project: this.content.project || '',
        entity: this.content.entity || {},
        principal: this.content.principal || ''
      },
      principal: '',
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
    ...mapGetters({
      projects: 'project/projects',
      principals: 'principal/list'
    }),
    entities: function() {
      const entities = []
      const entitiesName = ['owner', 'builder', 'supervisor', 'designer']
      const _project = this.form.project
      if (_project !== '') {
        entitiesName.forEach(function (item) {
          const entity = _project[item]
          entities.push({
            entity: entity,
            key: item,
            label: EntityMap[item] + ' - ' + entity.name
          })
        })
      }
      return entities
    }
  },
  methods: {
    ...mapActions({
      searchProject: 'project/searchProject',
      searchPrincipal: 'principal/search',
      submit: 'record/submit'
    }),
    onSearchProject(name) {
      if (name !== '') {
        this.searchProject({name: name})
      }
    },
    onRecordSubmit() {
      this.form.project = this.project
    },
    onSearchPrincipal(name) {
      if (name !== '') {
        this.searchPrincipal({name: name})
      }
    },
    onSubmit(formName, action) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit(this.form).then(result => {
            this.$emit('clean')
          })
        }
      })
    },
    onClose(formName) {
      this.$refs[formName].resetFields()
      this.$emit('clean')
    }
  }
}
</script>

<style lang="css">
</style>
