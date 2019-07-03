<template>
  <section>
    <el-dialog
      :title="dialogConfig.title"
      :visible="visible"
      :width="width"
      center
      @close="dialogClose"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form :model="formData" ref="dialogForm">
        <el-form-item
          v-for="(item, index) in dialogConfig.formConfig"
          :rules="item.rules"
          :key="index"
          :label="item.text"
          label-width="80px"
          :prop="item.id"
        >
          <el-input
            v-if="item.type==='input'"
            :type="item.inputType"
            v-model="formData[item.id]"
            :rows="5"
            autocomplete="off"
            :placeholder="item.placeholder ? item.placeholder : ''"
          ></el-input>
          <el-select v-else-if="item.type==='select'" v-model="formData[item.id]" placeholer="请选择">
            <el-option v-for="cc in item.options" :key="cc.id" :label="cc.text" :value="cc.id"></el-option>
          </el-select>
          <el-date-picker
            v-else-if="item.type==='date'"
            v-model="formData[item.id]"
            :rules="item.rules"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">重 置</el-button>
        <el-button type="primary" @click="submitFormDate" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: "formDialog",
  props: {
    dialogConfig: {
      //表格弹框配置文件
      type: Object,
      default() {
        return {
          formConfig: []
        };
      }
    },
    originData: {
      type: Object,
      default() {
        return {};
      }
    },
    width: {
      type: [String, Number],
      default: "30%"
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {},
      visible: false,
      fileList: []
    };
  },
  watch: {
    dialogConfig: {
      deep: true,
      handler(val) {
        this.visible = val.visible;
        this.fileList = [];
      }
    },
    "dialogConfig.visible"() {
      this.formData = this.originData;
      setTimeout(() => {
        this.$refs.dialogForm.clearValidate();
      }, 20);
    }
  },
  methods: {
    resetForm() {
      this.$refs.dialogForm.resetFields();
      this.formData.content = "";
    },
    dialogClose() {
      //关闭模态框
      this.$emit("closeDialog");
    },
    submitFormDate() {
      //提交表单数据
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          let bean = {
            data: this.formData,
            action: this.dialogConfig.action
          };
          this.$emit("setLoading");
          this.$emit("getFormData", bean);
        } else {
          this.$message({
            message: "请检查输入内容，确保正确后再提交！",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

