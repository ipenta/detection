<template lang="html">
<div class="container">
<el-form ref="form" :model="form" label-width="160px">
  <p>所属工程</p>
  <el-form-item label="工程名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="建设单位">
    <el-select
      v-model="form.entities[0]"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="onSearchEntity('owner')"
      :loading="loading">
      <el-option
        v-for="item in projects.owner"
        :key="item.name"
        :label="item.name"
        :value="item">
      </el-option>
    </el-select>
    <el-button type="text" @click="dialogFormVisible = true">创建单位</el-button>
  </el-form-item>
  <el-form-item label="监理单位">
    <el-select
      v-model="form.entities[1]"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="onSearchEntity('supervisor')"
      :loading="loading">
      <el-option
        v-for="item in projects.supervisor"
        :key="item.name"
        :label="item.name"
        :value="item">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="施工单位">
    <el-select
      v-model="form.entities[2]"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="onSearchEntity('builder')"
      :loading="loading">
      <el-option
        v-for="item in projects.builder"
        :key="item.name"
        :label="item.name"
        :value="item">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="设计单位">
    <el-select
      v-model="form.entities[3]"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="onSearchEntity('designer')"
      :loading="loading">
      <el-option
        v-for="item in projects.designer"
        :key="item.name"
        :label="item.name"
        :value="item">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="onProjectSubmit">确 定</el-button>
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
import EntityVO from '@/service/model/EntityVO'
export default {
  data() {
    return {
      form: {
        name: '',
        entities: []
      },
      loading: false,
      projects: {
        owner: '',
        builder: '',
        supervisor: '',
        designer: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      entity: new EntityVO(),
      entities: [{
        value: 'owner',
        label: '建设单位'
      }, {
        value: 'designer',
        label: '设计单位'
      }, {
        value: 'builder',
        label: '施工单位'
      }, {
        value: 'supervisor',
        label: '监理单位'
      }]
    }
  },
  methods: {
    onEntitySubmit() {
      this.dialogFormVisible = false
      this.$store.dispatch('addEntity', this.entity)
    },
    onSearchEntity(type) {
      let that = this
      return function(owner) {
        if (type !== '') {
          this.$store.dispatch('searchEntity', {
            type: type,
            name: owner
          }).then(context => {
            that.projects[type] = context
          })
        }
      }
    },
    onProjectSubmit() {
      this.$store.dispatch('addProject', this.form)
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
