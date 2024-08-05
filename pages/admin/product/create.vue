<template>
  <el-form
    class="card-in-card"
    @submit.native.prevent="onSubmit"
    :model="controls"
    :rules="rules"
    ref="form"
    style="width: 500px"
  >
    <div class="thisT">
      <h1>Create Product</h1>
      <nuxt-link to="/admin/product">
        <i class="el-icon-back"></i>
      </nuxt-link>
    </div>
    <el-form-item class="input-text" prop="name">
      <p>Product name:</p>
      <el-input v-model="controls.name" />
    </el-form-item>

    <el-form-item prop="characteristic">
      <p>Characteristic:</p>
      <el-input
        type="textarea"
        resize="none"
        :rows="10"
        v-model="controls.characteristic"
      />
    </el-form-item>

    <div class="barcode">
      <el-form-item prop="barcode">
        <p>Barcode:</p>
        <el-input v-model="controls.barcode" />
      </el-form-item>
      <el-button
        class="refresh"
        icon="el-icon-refresh-left"
        type="primary"
        circle
        @click="generateRandomBarcode"
      />
    </div>

    <el-form-item>
      <el-button type="primary" round native-type="submit" :loading="loading"
        >Create</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],

  props: {},

  data() {
    return {
      loading: false,
      controls: {
        name: "",
        characteristic: "",
        barcode: "",
      },

      rules: {
        name: [
          {
            required: true,
            message: "Please input product name",
            trigger: "blur",
          },
        ],
        characteristic: [
          {
            required: true,
            message: "Please input product characteristic",
            trigger: "blur",
          },
        ],
        barcode: [
          {
            required: true,
            message: "Please input product barcode",
            trigger: "blur",
          },
          { validator: this.validateBarcode, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;

          const formData = {
            name: this.controls.name,
            characteristic: this.controls.characteristic,
            barcode: this.controls.barcode,
          };

          try {
            const newProduct = await this.$store.dispatch(
              "product/create",
              formData
            );
            this.$message.success("Product created");
            this.$emit("created", newProduct);
            this.$router.push("/admin/product");
          } catch (e) {
            this.loading = false;
          }
        }
      });
    },

    validateBarcode(rule, value, callback) {
      const valid = /^\d{13}$/.test(value);

      if (!valid) {
        callback(new Error("Barcode must be exactly 13 digits"));
      } else {
        callback();
      }
    },

    generateRandomBarcode() {
      let barcode = "";
      for (let i = 0; i < 13; i++) {
        barcode += Math.floor(Math.random() * 10);
      }
      this.controls.barcode = barcode;
    },
  },
  created() {
    this.generateRandomBarcode();
  },
};
</script>

<style scoped>
.thisT {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.barcode {
  display: flex;
  align-items: center;
  gap: 10px;
}

.refresh {
  margin-top: 18px;
}
</style>
