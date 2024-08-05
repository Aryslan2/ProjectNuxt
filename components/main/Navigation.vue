<template>
  <div class="menu">
    <div class="logo">
      <img class="logo_img" src="@/theme/img/logo.png" alt="" />
      <h1>InventoSync</h1>
    </div>
    <el-menu mode="horizontal"> </el-menu>
    <nuxt-link to="/admin">
      <el-button type="primary">Admin</el-button>
    </nuxt-link>
  </div>
</template>

<style scoped>
.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border-bottom: 1px solid #e6e6e6;
  padding-left: 6rem;
  padding-right: 6rem;
}

.info {
  display: flex;
  align-items: center;
}

.link {
  text-decoration: none;
}

.logo {
  display: flex;
  align-items: center;
  gap: 5px;
}

.logo_img {
  width: 50px;
  height: 50px;
}
</style>
