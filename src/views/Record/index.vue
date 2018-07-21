<template lang="html">
<div class="container">
  <el-form ref="form" :model="form" label-width="160px">
    <p>委托信息</p>
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
      <el-select v-model="form.project" filterable placeholder="请选择">
        <el-option
          v-for="item in projects"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <router-link tag="li" to="/project"><a>录入新工程</a></router-link>
    </el-form-item>
    <el-form-item label="委托单位">
      <el-select v-model="value8" filterable placeholder="请选择">
        <el-option
          v-for="item in projects"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="委托人">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="委托电话">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <p>检测项目明细</p>
    <el-table
    :data="tableData6"
    border
    height="200"
    :summary-method="getSummaries"
    show-summary
    style="width: 100%; margin-top: 20px">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="amount1"
      label="数值 1（元）">
    </el-table-column>
    <el-table-column
      prop="amount2"
      label="数值 2（元）">
    </el-table-column>
    <el-table-column
      prop="amount3"
      label="数值 3（元）">
    </el-table-column>
  </el-table>
  </el-form>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        id: '',
        code: '',
        title: '',
        project: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      projects: [{
        value: '00001',
        label: '工程111'
      }, {
        value: '00002',
        label: '工程222'
      }, {
        value: '00003',
        label: '工程333'
      }, {
        value: '00004',
        label: '工程444'
      }, {
        value: '00005',
        label: '工程555'
      }],
      value8: '',
      tableData6: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }]
    }
  },
  methods: {
    getSummaries(param) {
      const {
        columns,
        data
      } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }
  },
  mounted() {
    axios.get('http://test.cn')
      .then(res => {
        console.log(res.data)
        this.msg = res.data.name
        console.log(this.msg)
      })
  }
}
</script>

<style lang="css">
.frame{
  border: 1px solid #eee;
  padding: 16px;
}
</style>
