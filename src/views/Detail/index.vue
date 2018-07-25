<template lang="html">
  <div class="container">
    <p>检测项目明细</p>
    <el-button type="text" @click="dialogFormVisible = true">创建单位</el-button>
    <el-table
    :data="tableData6"
    border
    style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="label"
        label="材料项目名称"
        width="120">
        <template slot-scope="scope">
          <el-select v-model="value8">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="needPlan"
        label="是否需要方案">
        <template slot-scope="scope">
              <el-input v-model="detailForm.label"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="needOnsite"
        label="是否现场检测">
      </el-table-column>
      <el-table-column
        prop="manufacturer"
        label="生产厂家">
      </el-table-column>
      <el-table-column
        prop="charges"
        label="收费标准">
      </el-table-column>
      <el-table-column
        prop="number"
        label="检测数量">
      </el-table-column>
      <el-table-column
        prop="type"
        label="检测类别">
      </el-table-column>
      <el-table-column
        prop="needOnsiteSimple"
        label="送样/现场取样">
      </el-table-column>
      <el-table-column
        prop="note"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="summary"
        label="金额小计">
      </el-table-column>
    </el-table>
    <!-- <el-dialog title="材料" :visible.sync="dialogFormVisible">
      <el-form ref="detailsform" :model="detailsform" label-width="120px" v-show="isDetailsformShow">
        <el-form-item label="材料项目名称">
          <el-input v-model="detailsform.label"></el-input>
        </el-form-item>
        <el-form-item label="是否需要方案">
          <el-input v-model="detailsform.needPlan"></el-input>
        </el-form-item>
        <el-form-item label="是否现场检测">
          <el-input v-model="detailsform.needOnsite"></el-input>
        </el-form-item>
        <el-form-item label="生产厂家">
          <el-input v-model="detailsform.label"></el-input><el-button type="text" @click="isDetailsformShow=false">创建厂家信息</el-button>
        </el-form-item>
        <el-form-item label="收费标准">
          <el-input v-model="detailsform.label"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="detailsSampleForm" :model="detailsSampleForm" label-width="120px" v-show="!isDetailsformShow">
        <el-form-item label="材料项目名称">
          <el-input v-model="detailsform.label"></el-input>
        </el-form-item>
        <el-form-item label="材料项目名称">
          <el-input v-model="detailsform.label"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="isDetailsformShow=true">创建单位</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      tableData6: [{}],
      isDetailsformShow: true,
      detailForm: {
        label: '',
        needOnsite: false,
        needPlan: false,
        manufacturer: '',
        charges: '',
        number: '',
        type: '',
        needOnsiteSimple: '',
        summary: ''
      },
      detailsSampleForm: {
        name: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value8: ''
    }
  }
}
</script>

<style lang="css">
</style>
