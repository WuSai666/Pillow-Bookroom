<script setup>
// 定义组件props
const props = defineProps({
  book: {
    type: Object,
    default: () => ({
      id: '',
      title: '书籍标题',
      author: '作者',
      price: '99.00',
      originalPrice: '128.00',
      imagePath: '@/assets/image.png'
    })
  }
})
// 定义自定义事件
const emit = defineEmits(['add-to-cart', 'view-detail'])
// 定义方法
function addToCart() {
  // 添加到购物车的逻辑
  emit('add-to-cart', props.book)
}
function viewDetail() {
  // 查看详情的逻辑
  emit('view-detail', props.book)
}
</script>

<template>
  <div class="shop-card">
    <!-- 商品图片 -->
    <div class="book-image-container">
      <img
        :src="book.imagePath || '@/assets/image.png'"
        :alt="book.title || '书籍封面'"
        class="book-image"
      />
    </div>
    <!-- 商品信息 -->
    <div class="book-info">
      <!-- 书籍标题 -->
      <h3 class="book-title">{{ book.title || '书籍标题' }}</h3>
      <!-- 书籍作者 -->
      <p class="book-author">{{ book.author || '作者' }}</p>
      <!-- 价格信息 -->
      <div class="book-price-container">
        <span class="book-price">¥{{ book.price || '99.00' }}</span>
        <span v-if="book.originalPrice" class="original-price"
          >¥{{ book.originalPrice }}</span
        >
      </div>
      <!-- 操作按钮 -->
      <div class="book-actions">
        <el-button
          type="primary"
          class="add-to-cart-btn"
          size="small"
          @click="addToCart"
        >
          添加购物车
        </el-button>
        <el-button class="view-detail-btn" size="small" @click="viewDetail">
          查看详情
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.shop-card {
  display: flex;
  flex-direction: column;
  width: 240px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  margin: 8px;
  transition: all 0.3s ease;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

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

    &:hover .book-image {
      transform: scale(1.05);
    }
  }

  .book-info {
    display: flex;
    flex-direction: column;
    flex: 1;

    .book-title {
      font-size: 16px;
      font-weight: 500;
      margin: 0 0 8px 0;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .book-author {
      font-size: 14px;
      color: #666;
      margin: 0 0 12px 0;
    }

    .book-price-container {
      margin-bottom: 12px;

      .book-price {
        font-size: 18px;
        font-weight: 600;
        color: #f56c6c;
        margin-right: 8px;
      }

      .original-price {
        font-size: 14px;
        color: #999;
        text-decoration: line-through;
      }
    }

    .book-actions {
      display: flex;
      justify-content: space-between;

      .add-to-cart-btn,
      .view-detail-btn {
        flex: 1;
        margin: 0 4px;
      }
    }
  }
}
</style>
