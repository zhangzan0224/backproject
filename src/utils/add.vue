<template>
  <div>
    <el-dialog
        v-bind="$attrs"
        title="Dialog Titile"
        v-on="$listeners"
        @open="onOpen"
        @close="onClose">
      <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="100px" />
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  components: {},
  props: [],
  data () {
    return {
      formData: {},
      rules: {}
    };
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onOpen () {},
    onClose () {
      this.$refs.elForm.resetFields();
    },
    close () {
      this.$emit('update:visible', false);
    },
    handelConfirm () {
      this.$refs.elForm.validate((valid) => {
        if (!valid) return;
        this.close();
      });
    }
  }
};
</script>
<style></style>
