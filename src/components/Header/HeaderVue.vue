
<template>
  <div id="header">
    <div id="logo_image">
      <img id="logo" src="../../assets/logoWhiet.svg" alt="КЦПТ" />
    </div>
    <div id="title">Составление изменений</div>
    <div id="edit-btn" v-on:click="tools"></div>
  </div>
</template>

<script>
 export default {
   name:"HeaderVue",
   methods: {
      tools (e) {
        e.stopPropagation()
        this.$emit("tools", true)
      }
   }
 };
</script>

<style scoped>
#header {
  grid-area: h;
  position: relative;
  background: #342853;
  color: #f2f3f4;
  font-size: 16px;
  height: 50px;
/* border-bottom:1px solid #f2f3f4;*/
  z-index: 1;
  display: flex;
  justify-content: space-between;
}
#edit-btn {
  height: 30px;
  width: 30px;
  margin: 10px;
  background-color: #f6f7f8;
  mask-image: url("./../../assets/edit.svg");
}

#logo_image {
  padding: 5px;
}

#logo {
  height: 40px;
}

#title {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  height: 50px;
}
</style>
