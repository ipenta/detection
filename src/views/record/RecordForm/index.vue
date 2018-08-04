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
import { EntityMap } from '@/utils/map'
export default {
  props: ['content'],
  data() {
    return {
      form: {
        _id: this.content._id || '',
        uid: this.content.uid || '',
        title: this.content.title || '',
        project: this.content.project || '',
        entity: this.content.entity || {},
        principal: this.content.principal || ''
      },
      principals: [],
      principal: '',
      projects: [],
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
      let _data = this.content
      if (_project !== '' && Array.isArray(_project.entities)) {
        _project.entities.forEach(item => {
          entities.push({
            entity: item,
            key: item.name,
            label: EntityMap[item.type] + ' - ' + item.name
          })
        })
        if (this.content.entity) {
          let temp = entities[0]
          entities.map((v, i) => {
            if (v.key === _data.entity.name) {
              entities[0] = entities[i]
              entities[i] = temp
            }
          })
        }
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
              this.$emit('clean')
            }
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
