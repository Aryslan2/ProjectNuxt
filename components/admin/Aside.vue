<template>
	<el-menu
		:default-active="$route.path"
		router
		:style="{height: '100%'}"
    
  >
    <el-menu-item index="/admin">
      <i class="el-icon-user"></i>
      <span></span>
    </el-menu-item>
    <el-submenu>
      <template slot="title">
        <i class="el-icon-s-order"></i>
        <span>Information</span>
      </template>
      <el-menu-item-group>
          <el-menu-item index="/admin/company">
            <i class="el-icon-caret-right"></i>
            Company
          </el-menu-item>
          <el-menu-item index="/admin/branch">
            <i class="el-icon-caret-right"></i>
            Branches
          </el-menu-item>
          <el-menu-item index="/admin/department">
            <i class="el-icon-caret-right"></i>
            Departments
          </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/admin/management">
      <i class="el-icon-connection"></i>
      <span>Management</span>
    </el-menu-item>
    <el-menu-item index="/admin/person">
      <i class="el-icon-user"></i>
      <span>Persons</span>
    </el-menu-item>
    <el-menu-item index="/admin/product">
      <i class="el-icon-box"></i>
      <span>Products</span>
    </el-menu-item>
		<el-menu-item index="/admin/create">
      <i class="el-icon-edit-outline"></i>
      <span>Create</span>
    </el-menu-item>
		<el-menu-item index="/admin/list">
      <i class="el-icon-tickets"></i>
      <span>Posts</span>
    </el-menu-item>
    <el-menu-item index="/admin/status">
      <i class="el-icon-notebook-1"></i>
      <span>Status</span>
    </el-menu-item>
		<el-menu-item index="/admin/user">
      <i class="el-icon-user-solid"></i>
      <span>Create admin user</span>
    </el-menu-item>
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span>Home</span>
    </el-menu-item>
		<el-menu-item index="/admin/logout">
      <i class="el-icon-caret-left"></i>
      <span>Logout</span>
    </el-menu-item>
  </el-menu>
</template>

<script>

</script>