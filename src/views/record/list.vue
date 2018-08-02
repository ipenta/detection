<template lang="html">
  <div class="container">
    <Breadcrumb :items="breadcrumb"></Breadcrumb>
    <el-row type="flex" :gutter="24" style="margin-top:20px;margin-bottom:20px;">
      <el-col :span="3">
        <span class="textspan">方案</span>
      </el-col>
      <el-col :span="10">
        <el-input placeholder="请输入关键字过滤" v-model="searchInput" class="queryinput"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button @click="getRecords('record')">查询</el-button>
      </el-col>
      <el-col :span="1"><div class="single"></div></el-col>
      <el-col :span="4">
        <router-link :to="{ name: 'record/form', params:{ id: id } }" class="el-button">添加新方案</router-link>
      </el-col>
    </el-row>
    <div style="margin:0 12px;">
      <el-table :data="records" class="c-table">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="委托方案">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="所属工程">
                <span>{{ props.row.project.name }}</span>
              </el-form-item>
              <el-form-item label="委托单位">
                <span>{{ props.row.entity.name }}</span>
              </el-form-item>
              <el-form-item label="委托人">
                <span>{{ props.row.principal.name }}</span>
              </el-form-item>
              <el-form-item label="委托人电话">
                <span>{{ props.row.principal.phonenum }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="委托方案" prop="title" width="160"></el-table-column>
        <el-table-column label="所属工程" prop="project.name" width="160"></el-table-column>
        <el-table-column label="委托单位" prop="entity.name"></el-table-column>
        <el-table-column label="委托人" prop="principal.name"></el-table-column>
        <el-table-column label="创建人" prop="creater.name"></el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template slot-scope="scope">
            <el-button @click="formRecord(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="itemRecord(scope.row)" type="text" size="small">添加验证条目</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      breadcrumb: [
        { label: '方案' },
        { label: '方案管理' }
      ],
      searchInput: '',
      dialogFormVisible: false,
      form: {
        uid: '',
        title: '',
        project: '',
        entity: '',
        principal: ''
      },
      principals: [],
      principal: ''
    }
  },
  computed: {
    ...mapGetters(['records', 'record', 'id'])
  },
  mounted: function () {
    this.searchRecords()
  },
  methods: {
    ...mapActions(['searchRecords']),
    formRecord(row) {
      this.$router.push({name: 'record/form', params: row})
    }
  },
  components: {
    Breadcrumb: Breadcrumb
  }
}
</script>

<style lang="css">
.c-table{
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.single{
  position: relative;
  width: 1px;
  background-color: #aaa;
  height: 40px;
}
.table-expand .el-form-item{
  margin-right: 0;
  margin-bottom: 0;
  width: 40%;
}
</style>
