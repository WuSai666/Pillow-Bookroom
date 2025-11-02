<template>
  <div class="goods-card">
    <!-- 商品选择框 -->
    <div class="select-checkbox">
      <el-radio v-model="selectedValue" :label="good.id" size="large" />
    </div>

    <!-- 商品图片 -->
    <div class="goods-image-container">
      <img
        :src="good.imagePath || '@/assets/blank.png'"
        :alt="good.title"
        class="goods-image"
      />
    </div>

    <!-- 商品信息 -->
    <div class="goods-info">
      <h4 class="goods-title">{{ good.title || '商品名称' }}</h4>
      <p class="goods-author" v-if="good.author">{{ good.author }}</p>
      <div class="goods-price-container">
        <span class="goods-price">¥{{ good.price || '0.00' }}</span>
        <span class="goods-original-price" v-if="good.originalPrice"
          >¥{{ good.originalPrice }}</span
        >
      </div>
    </div>

    <!-- 数量控制 -->
    <div class="quantity-control">
      <el-button
        size="small"
        type="default"
        @click="decreaseQuantity"
        :disabled="good.quantity <= 1"
        class="quantity-btn"
      >-</el-button>
      <span class="quantity-display">{{ good.quantity || 1 }}</span>
      <el-button
        size="small"
        type="default"
        @click="increaseQuantity"
        class="quantity-btn"
      >+</el-button>
    </div>

    <!-- 小计和操作 -->
    <div class="goods-action">
      <div class="goods-subtotal">¥{{ calculateSubtotal }}</div>
      <el-button
        type="text"
        class="delete-button"
        icon="el-icon-delete"
        @click="handleDelete"
      >
        删除
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 定义组件的属性
const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: ''
  },
  good: {
    type: Object,
    default: () => ({
      id: '',
      title: '',
      author: '',
      price: '0.00',
      originalPrice: '',
      quantity: 1,
      imagePath: ''
    })
  }
})

// 定义事件
const emit = defineEmits(['update:modelValue', 'quantity-change', 'delete'])

// 使用计算属性处理双向绑定
const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// 计算商品小计
const calculateSubtotal = computed(() => {
  const price = parseFloat(props.good.price) || 0
  const quantity = props.good.quantity || 0
  return (price * quantity).toFixed(2)
})

// 增加商品数量
const increaseQuantity = () => {
  const newQuantity = (props.good.quantity || 1) + 1
  emit('quantity-change', props.good.id, newQuantity)
}

// 减少商品数量
const decreaseQuantity = () => {
  if ((props.good.quantity || 1) > 1) {
    const newQuantity = (props.good.quantity || 1) - 1
    emit('quantity-change', props.good.id, newQuantity)
  }
}

// 处理删除事件
const handleDelete = () => {
  emit('delete', props.good.id)
}
</script>

<style lang="scss" scoped>
.goods-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  // 选择框样式
  .select-checkbox {
    margin-right: 16px;
    display: flex;
    align-items: center;
  }

  // 商品图片样式
  .goods-image-container {
    margin-right: 20px;
    flex-shrink: 0;

    .goods-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 6px;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  // 商品信息样式
  .goods-info {
    flex: 1;
    min-width: 0; // 允许内容换行

    .goods-title {
      margin: 0 0 8px 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .goods-author {
      margin: 0 0 12px 0;
      font-size: 14px;
      color: #666;
    }

    .goods-price-container {
      display: flex;
      align-items: baseline;

      .goods-price {
        font-size: 18px;
        font-weight: 600;
        color: #ff4d4f;
        margin-right: 8px;
      }

      .goods-original-price {
        font-size: 14px;
        color: #999;
        text-decoration: line-through;
      }
    }
  }

  // 数量控制样式
  .quantity-control {
    display: flex;
    align-items: center;
    margin: 0 40px;

    .el-button {
      min-width: 36px;
      width: 36px;
      height: 36px;
      padding: 0;
      border-radius: 50%;
      transition: all 0.3s ease;
      border: 1px solid #e0e0e0;
      background-color: #ffffff;
      color: #333333;
      font-size: 16px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;

      &:not(:disabled):hover {
        background-color: #f0f9ff;
        border-color: #1890ff;
        color: #1890ff;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:disabled {
        background-color: #f5f5f5;
        border-color: #d9d9d9;
        color: #bfbfbf;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
    }

    // 数量按钮专用样式，确保符号居中
    .quantity-btn {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      line-height: 1;
      text-align: center;
      padding: 0 !important;
      margin: 0 !important;
    }

    .quantity-display {
      min-width: 50px;
      text-align: center;
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }
  }

  // 操作区域样式
  .goods-action {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    height: 100px;

    .goods-subtotal {
      font-size: 18px;
      font-weight: 600;
      color: #ff4d4f;
    }

    .delete-button {
      color: #999;

      &:hover {
        color: #ff4d4f;
      }
    }
  }

  // 响应式设计
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    .select-checkbox {
      position: absolute;
      top: 16px;
      left: 16px;
      z-index: 1;
    }

    .goods-image-container {
      margin-right: 0;
      margin-bottom: 16px;
      margin-left: 40px; // 为选择框留出空间
    }

    .quantity-control {
      margin: 16px 0;
    }

    .goods-action {
      align-items: flex-start;
      height: auto;

      .delete-button {
        margin-top: 12px;
      }
    }
  }
}
</style>
