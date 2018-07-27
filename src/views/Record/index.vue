<template lang="html">
<div class="container">
  <p>委托信息</p>
  <el-form ref="form" :model="form" :rules="formRules" label-width="160px" class="simple-form" v-show="!isPrincipalFormShow">
    <el-form-item label="委托方案全称" prop="title">
        <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="所属工程">
      <el-select
        v-model="project"
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
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
      <el-select v-model="form.entity" filterable placeholder="请选择">
        <el-option
          v-for="item in entities"
          :key="item.value"
          :label="item.label"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="委托人">
      <el-select v-model="form.entity" filterable placeholder="请选择">
        <el-option
          v-for="item in entities"
          :key="item.value"
          :label="item.label"
          :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" @click="isPrincipalFormShow=true">新增委托人</el-button>
    </el-form-item>
  </el-form>
  <el-form ref="principalForm" :model="principalForm" :rules="principalFormRules" label-width="160px" class="simple-form" v-show="isPrincipalFormShow">
    <el-form-item label="委托人" prop="name">
        <el-input v-model="principalForm.name"></el-input>
    </el-form-item>
    <el-form-item label="委托电话" prop="phonenum">
        <el-input v-model="principalForm.phonenum"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="text" @click="isPrincipalFormShow=false">取消</el-button>
      <el-button type="primary" @click="onPrincipalSubmit">确 定</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { EntityMap } from '@/utils/map'
import { isvalidPhone } from '@/utils/validate'
export default {
  data() {
    let validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      form: {
        title: '',
        project: '',
        entity: '',
        principal: ''
      },
      principalForm: {
        name: '',
        phonenum: ''
      },
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
      },
      principalFormRules: {
        name: [
          { required: true, message: '必须：请务必填写姓名', trigger: 'blur' },
          { min: 2, message: '长度不能少于 3 个字符', trigger: 'blur' }
        ],
        phonenum: [
          { required: true, trigger: 'blur', validator: validatePhone } // 这里需要用到全局变量
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
    onPrincipalSubmit() {
      console.log(this.principalForm)
      this.$store.dispatch('addPrincipal', this.principalForm)
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
