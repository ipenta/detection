<template lang="html">
<div class="container">
  <p>委托信息</p>
  <el-form ref="form" :model="form" label-width="160px" class="simple-form">
    <el-form-item label="表码">
      <el-input v-model="form.code" ></el-input>
    </el-form-item>
    <el-form-item label="委托方案编号">
      <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="委托方案全称">
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
      <router-link tag="li" to="/project"><a>录入新工程</a></router-link>
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
        <el-input v-model="form.principal.name"></el-input>
    </el-form-item>
    <el-form-item label="委托电话">
        <el-input v-model="form.principal.member"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button>取 消</el-button>
      <el-button type="primary" @click="onRecordSubmit">确 定</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {
  EntityMap
} from '@/utils/map'
export default {
  data() {
    return {
      form: {
        id: '',
        code: '',
        title: '',
        project: '',
        entity: '',
        principal: {
          name: '',
          member: ''
        }
      },
      projects: '',
      project: '',
      loading: false,
      record: ''
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
