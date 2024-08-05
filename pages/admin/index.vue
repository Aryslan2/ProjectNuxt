<template>
  <div class="main">
    <h1 class="title">InventoSync</h1>
    <h2 class="under_title">Admin Page</h2>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth']
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%; 
  background-image: url("https://i.gifer.com/Xg9q.gif");
  background-position: center; 
  text-align: center; 
}

.title {
  font-size: 3rem;
	color: #1f2634;
}

.under_title {
  font-size: 2rem; 
	color: #1f2634;
}
</style>