<template>
  <div class="list-item">
      <div class="block title">{{title}}</div>
      <div class="block content">{{ content }}</div>
  </div>
</template>

<script>
export default {
   name: 'ListItem',
   props: {
       title: String,
       content: String
   }
}
</script>


<style lang="scss" scoped>
.list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .15rem;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: .1rem;
    padding-top: 0.09rem;
    padding-bottom: 0.09rem;
    .block {
      height: 100%;

      &.title {
        width: 1rem;
        font-size: .18rem;
        margin-right: .15rem;
        color: #ed4040;
        line-height: .44rem;
        text-align: center;
      }

      &.content {
        width: 80%;
        line-height: .2rem;
        display: flex;
        align-items: center;
        font-size: .14rem;
      }
    }
  }
</style>