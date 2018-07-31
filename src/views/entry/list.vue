<template lang="html">
  <div class="container">
    <p>检测项目明细</p>
    <div>
      <el-form ref="entryForm" :model="entryForm" :rules="entryFormRules" label-width="120px">
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
                :key="item._id"
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
        <el-form-item label="生产厂家" prop="manufacturer">
          <el-input v-model="entryForm.manufacturer"></el-input>
        </el-form-item>
        <el-form-item label="购买件数" prop="number">
          <el-input v-model.number="entryForm.number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>取 消</el-button>
          <el-button type="primary" @click="onSubmit('entryForm')">确 定</el-button>
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
        orderId: this.$route.params.id,
        inspection: new InspectionVO(),
        manufacturer: '',
        number: 0
      },
      manufacturerFrom: {
        name: ''
      },
      loading: false,
      inspections: [],
      inspection: new InspectionVO(),
      entryFormRules: {
        manufacturer: [
          { required: true, message: '请输入厂家名称', trigger: 'blur' },
          { min: 3, message: '长度在 3 个字符以上', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入数据', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ]
      }
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
    onSubmit: function (formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.entryForm.inspection = this.inspection
          this.$store.dispatch('addEntry', this.entryForm).then(context => {
            if (context.status === 'success') {
              that.$refs[formName].resetFields()
              that.$router.push({path: '/order/' + that.$route.params.id})
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
