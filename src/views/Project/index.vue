<template lang="html">
<div class="container">
<el-form ref="form" :model="form" label-width="160px">
  <p>所属工程</p>
  <a @click="onClick">查看</a>
  <el-form-item label="工程名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="建设单位">
    <el-select v-model="form.project" filterable placeholder="请选择">
      <el-option
        v-for="item in projects"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="text" @click="dialogFormVisible = true">创建单位</el-button>
  </el-form-item>
  <el-form-item label="监理单位">
    <el-select v-model="form.project" filterable placeholder="请选择">
      <el-option
        v-for="item in projects"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="施工单位">
    <el-select v-model="form.project" filterable placeholder="请选择">
      <el-option
        v-for="item in projects"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="设计单位">
    <el-select v-model="form.project" filterable placeholder="请选择">
      <el-option
        v-for="item in projects"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
</el-form>
<el-dialog title="单位设定" :visible.sync="dialogFormVisible" top="0">
  <el-form ref="entityForm" :model="entity" label-width="30%">
    <el-form-item label="单位类型">
      <el-select v-model="entity.type" filterable placeholder="请选择">
        <el-option
          v-for="item in entities"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="单位名称">
      <el-input v-model="entity.name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onEntitySubmit">确 定</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
</div>
</template>

<script>
import axios from '@/commons/axios'

export default {
  data() {
    return {
      form: {
        name: '',
        project: ''
      },
      projects: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      entity: {
        name: '',
        type: ''
      },
      entities: [{
        value: '1',
        label: '建设单位'
      }, {
        value: '2',
        label: '设计单位'
      }, {
        value: '3',
        label: '施工单位'
      }, {
        value: '4',
        label: '监理单位'
      }]
    }
  },
  methods: {
    onEntitySubmit() {
      this.dialogFormVisible = false
      axios.post('/api/entity', this.entity).then(res => {
        console.log(res.data)
      })
    },
    onClick() {
      // axios.get('/api/entity/sdssff').then(res => {
      //   console.log(res.data)
      // })
      let args = ['sjdfj', 'jdjfjf']
      this.$store.dispatch('addEntity', args)
    }
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
