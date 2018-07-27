<template lang="html">
  <div class="container">
    <p>检测项目明细</p>
    <!-- <el-table
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
          <el-input v-model="detailsForm.label"></el-input>
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
    </el-table> -->
    <div>
      <el-form ref="entryForm" :model="entryForm" label-width="120px" v-show="isEntryformShow">
        <el-form-item label="材料项目名称">
          <template slot-scope="scope">
            <el-select
              v-model="inspection"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="onSearchInspection"
              :loading="loading">
              <el-option
                v-for="item in inspections"
                :key="item.text"
                :label="item.text"
                :value="item">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
         <el-form-item label="检测类型">
          <el-input :value="inspection.type" readonly></el-input>
        </el-form-item>
        <el-form-item label="收费标准">
          <el-input type="number" :value="inspection.price" readonly></el-input>
        </el-form-item>
        <el-form-item label="计量单位">
          <el-input :value="inspection.unit" readonly></el-input>
        </el-form-item>
        <el-form-item label="送样/现场取样">
          <el-checkbox v-for="method in inspection.methods" :key="method.text" v-model="method.checked" disabled>{{method.text}}</el-checkbox>
        </el-form-item>
        <br>
        <el-form-item label="生产厂家">
          <el-input v-model="entryForm.manufacturer"></el-input>
        </el-form-item>
        <el-form-item label="购买件数">
          <el-input v-model.number="entryForm.number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>取 消</el-button>
          <el-button type="primary" @click="onSubmitEntry">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import InspectionVO from '@/service/model/InspectionVO'
export default {
  data() {
    return {
      dialogFormVisible: false,
      tableData6: [{}],
      isEntryformShow: true,
      entryForm: {
        orderId: '',
        inspection: new InspectionVO(),
        manufacturer: '',
        number: ''
      },
      manufacturerFrom: {
        name: ''
      },
      loading: false,
      inspections: [],
      inspection: new InspectionVO()
    }
  },
  methods: {
    onSearchInspection: function (text) {
      if (text !== '') {
        this.$store.dispatch('searchInspection', {
          text: text
        }).then(context => {
          this.inspections = context
        })
      }
    },
    onSubmitEntry: function () {
      this.entryForm.inspection = this.inspection
      this.$store.dispatch('addEntry', this.entryForm).then(context => {
        console.log(context)
      })
    }
  }
}
</script>

<style lang="css">
</style>
