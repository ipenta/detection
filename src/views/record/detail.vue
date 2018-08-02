<template lang="html">
<div>
  <Breadcrumb :items="breadcrumb"></Breadcrumb>
  <div style="margin: 16px;">
    <el-form ref="form" :model="form" label-width="120px" class="simple-form">
      <el-form-item label="委托方案全称" prop="title" class="input">
        <span>{{ record.title }}</span>
        <i class="el-icon-caret-bottom edit_icon"></i>
        &nbsp;&nbsp;&nbsp;<el-button size="small" @click="onSubmit('form', 'addRecord')">修改</el-button>
      </el-form-item>
      <div>
        <el-form-item label="所属工程" prop="project">
          <span>{{ record.project.name }}</span>
        </el-form-item>
        <el-form-item label="委托单位" prop="entity">
          <span>{{ record.entity.name }}</span>
        </el-form-item>
        <el-form-item label="委托人" prop="principal">
          <span>{{ record.principal.name }}</span>
        </el-form-item>
        <el-form-item label="委托人电话">
          <span>{{ form.principal.phonenum }}</span>
        </el-form-item>
      </div>
    </el-form>
    <div style="margin-top:16px;">
      <el-table :data="data">
        <el-table-column prop="inspection.text" label="材料项目名称" width="120"></el-table-column>
        <el-table-column prop="inspection.type" label="检测类别"></el-table-column>
        <el-table-column prop="manufacturer" label="生产厂家"></el-table-column>
        <el-table-column prop="inspection.price" label="收费标准"></el-table-column>
        <el-table-column prop="number" label="检测数量"></el-table-column>
        <el-table-column prop="summary" label="金额小计">
          <template slot-scope="scope">
            {{scope.row.number * scope.row.inspection.price}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <!-- <el-form ref="form" :model="form" :rules="formRules" label-width="160px" class="simple-form">
    <el-form-item label="委托方案全称" prop="title" class="input">
        <el-input v-model="form.title" :value="record.title"></el-input>
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
        v-model="form.principal.name"
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
    </el-form-item> -->
    <!-- <el-form-item>
      <router-link to="/" class="el-button">取消</router-link>
      <el-button type="primary" @click="onSubmit('form', 'addRecord')">完成,继续委托明细</el-button>
    </el-form-item> -->

  {{record}}
</div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import { EntityMap } from '@/utils/map'
import record from './record'

export default {
  data() {
    return {
      breadcrumb: [{ label: '记录' }, { label: '记录表单' }],
      loading: false,
      form: {
        title: '',
        project: '',
        entity: '',
        entities: '',
        principal: {
          name: '',
          phonenum: ''
        }
      },
      data: [],
      principal: '',
      principals: [],
      projects: [],
      record: record,
      formRules: {
        title: [{
          required: true,
          message: '必须：请务必填写委托方案名',
          trigger: 'blur'
        },
        {
          min: 3,
          message: '长度不能少于 3 个字符',
          trigger: 'blur'
        }],
        entity: [{
          required: true,
          message: '必须：请务必选择',
          trigger: 'change'
        }],
        project: [{
          required: true,
          message: '必须：请务必选择',
          trigger: 'blur'
        }],
        principal: [{
          required: true,
          message: '必须：请务必选择',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    // ...mapGetters(['record']),
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
  mounted() {
    this.form.title = this.record.title
    this.form.project = this.record.project.name
    this.form.entity = this.record.entity
    this.form.entities = this.record.project.entities
    this.form.principal.name = this.record.principal.name
    this.form.principal.phonenum = this.record.principal.phonenum
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
.panel-header{
  border-top: 1px solid #eaeefb;
  border-left: 1px solid #eaeefb;
  border-right: 1px solid #eaeefb;
  height: 44px;
  line-height: 44px;
  box-sizing: border-box;
  background-color: #fff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding-left: 16px;
  cursor: pointer;
  position: relative;
}
.showEdit{
  height: 300px!important;
}
.add_category_row {
    height: 0;
    overflow: hidden;
    transition: all 400ms;
    background: #f9fafc;
}
.add_category_button {
  text-align: center;
  line-height: 40px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid #eaeefb;
  border-top: none;
  transition: all 400ms;
  cursor: pointer;
}
.el-form-item {
  margin: 0;
}
</style>
