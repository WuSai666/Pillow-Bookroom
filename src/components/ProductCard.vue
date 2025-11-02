<script setup>
// 定义组件接收的属性
const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      id: '',
      title: '书籍名称',
      imagePath: '@/assets/product1.png.avif'
    })
  }
})

console.log(props.product)
</script>

<template>
  <div class="product-card">
    <div class="book-image-container">
      <img
        :src="product.imagePath || '@/assets/product1.png.avif'"
        :alt="product.title || '书籍名称'"
        class="book-image"
      />
    </div>
    <div>{{ product.title || '书籍名称' }}</div>
  </div>
</template>

<style scoped lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #c1bcbc;
  border-radius: 8px;
  width: 80px;
  height: 110px;
  background-color: #f5f6fa;
  .book-image-container {
    width: 100%;
    height: 160px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
    .book-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      transition: transform 0.3s ease;
    }
  }
}
</style>
