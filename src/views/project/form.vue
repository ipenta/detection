<template lang="html">
<div class="container">
<Breadcrumb :items="breadcrumb"></Breadcrumb>
<el-form ref="form" :model="form" :rules="formRules" label-width="160px">
  <el-form-item label="工程名称" prop="name" class="input">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="建设单位" prop="entities[0]" :rules="{ required: true, message: '必须：请务必输入关键字获取单位', trigger: 'blur' }">
    <el-select
      v-model="form.entities[0]"
      filterable
      remote
      reserve-keyword
      value-key="name"
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
    <el-button type="el-button el-button--primary" @click="dialogFormVisible=true">如果搜索不到，请点击创建</el-button>
  </el-form-item>
  <el-form-item label="监理单位" prop="entities[1]" :rules="{ required: true, message: '必须：请务必输入关键字获取单位', trigger: 'blur' }">
    <el-select
      v-model="form.entities[1]"
      filterable
      remote
      reserve-keyword
      value-key="name"
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
  <el-form-item label="施工单位"  prop="entities[2]" :rules="{ required: true, message: '必须：请务必输入关键字获取单位', trigger: 'blur' }">
    <el-select
      v-model="form.entities[2]"
      filterable
      remote
      reserve-keyword
      value-key="name"
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
  <el-form-item label="设计单位" prop="entities[3]" :rules="{ required: true, message: '必须：请务必输入关键字获取单位', trigger: 'blur' }">
    <el-select
      v-model="form.entities[3]"
      filterable
      remote
      reserve-keyword
      value-key="name"
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
    <router-link to="/record" class="el-button">放弃</router-link>
    <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
  </el-form-item>
</el-form>
<el-dialog title="单位设定" :visible.sync="dialogFormVisible" top="0">
  <el-form ref="entityForm" :model="entity" :rules="entityFormRules" label-width="30%">
    <el-form-item label="单位类型" prop="type">
      <el-select v-model="entity.type" filterable placeholder="请点击下拉框选取">
        <el-option
          v-for="item in entities"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="单位名称" prop="name">
      <el-input v-model="entity.name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="dialogFormVisible = false">放弃</el-button>
      <el-button type="primary" @click="onEntitySubmit">确 定</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
</div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import EntityVO from '@/service/model/EntityVO'
export default {
  data() {
    return {
      breadcrumb: [
        { label: '工程管理' },
        { label: '添加' }
      ],
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
      }],
      formRules: {
        name: [
          { required: true, message: '必须：请务必填写工程名', trigger: 'blur' },
          { min: 3, message: '长度不能少于 3 个字符', trigger: 'blur' }
        ]
      },
      entityFormRules: {
        type: [
          { required: true, message: '必须：请务必选择单位类型', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '必须：请务必填写单位名称', trigger: 'blur' },
          { min: 3, message: '长度不能少于 3 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onEntitySubmit() {
      this.$refs['entityForm'].validate(valid => {
        if (valid) {
          this.$store.dispatch('addEntity', this.entity).then(context => {
            if (context.status === 'success') {
              this.$refs['entityForm'].resetFields()
              this.dialogFormVisible = false
            }
          })
        }
      })
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
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('addProject', this.form).then(context => {
            if (context.status === 'success') {
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
.el-dialog{
  position: absolute;
  top:16px;
  left: 16px;
  bottom: 16px;
  width: 60%;
  margin: 0;
}
</style>
