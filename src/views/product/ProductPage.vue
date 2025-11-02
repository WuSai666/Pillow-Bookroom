<script setup>
import product1 from '@/assets/product1.png.avif'
import { ref } from 'vue'
import book2 from '@/assets/book2.jpg.avif'
import book3 from '@/assets/book3.jpg.avif'
import book4 from '@/assets/book4.jpg.avif'
import book5 from '@/assets/book5.jpg.avif'
import book6 from '@/assets/book6.jpg.avif'
import { ElMessage } from 'element-plus'
const currentPage = ref(1)
const totalPages = ref(5)

// 处理添加到购物车
const handleAddToCart = (book) => {
  try {
    // 获取现有购物车数据
    const cartData = JSON.parse(localStorage.getItem('cartGoods') || '[]')

    // 检查商品是否已在购物车中
    const existingItemIndex = cartData.findIndex((item) => item.id === book.id)

    if (existingItemIndex !== -1) {
      // 如果商品已存在，增加数量
      cartData[existingItemIndex].quantity += 1
    } else {
      // 如果商品不存在，添加到购物车，数量设为1
      cartData.push({
        ...book,
        quantity: 1
      })
    }

    // 保存到localStorage
    localStorage.setItem('cartGoods', JSON.stringify(cartData))

    // 显示成功消息
    ElMessage.success('已成功添加到购物车！')
  } catch (error) {
    console.error('添加到购物车失败:', error)
    ElMessage.error('添加到购物车失败，请稍后重试')
  }
}
</script>

<template>
  <div class="product-page">
    <div class="search-box">
      <img src="@/assets/book.png" class="logo" />
      <el-input placeholder="请输入搜索内容" class="search-input"></el-input>
      <el-button type="primary" class="search-button">搜索</el-button>
    </div>
    <div class="product-cards-container">
      <div class="category-title">热门分类</div>
      <div class="product-cards">
        <ProductCard
          :product="{
            title: '文学',
            imagePath: product1
          }"
        />
        <ProductCard
          :product="{
            title: '历史',
            imagePath: product1
          }"
        />
        <ProductCard
          :product="{
            title: '社会',
            imagePath: product1
          }"
        />
        <ProductCard
          :product="{
            title: '政治',
            imagePath: product1
          }"
        />
        <ProductCard
          :product="{
            title: '地理',
            imagePath: product1
          }"
        />
        <ProductCard
          :product="{
            title: '法律',
            imagePath: product1
          }"
        />
        <ProductCard
          :product="{
            title: '自然',
            imagePath: product1
          }"
        />
        <ProductCard
          :product="{
            title: '法律',
            imagePath: product1
          }"
        />
        <ProductCard
          :product="{
            title: '法律',
            imagePath: product1
          }"
        />
        <ProductCard
          :product="{
            title: '法律',
            imagePath: product1
          }"
        />
        <ProductCard
          :product="{
            title: '法律',
            imagePath: product1
          }"
        />
        <ProductCard
          :product="{
            title: '法律',
            imagePath: product1
          }"
        />
      </div>
    </div>
    <div class="product-all">
      <div class="">全部商品</div>
      <hr class="line" />
      <div>分类</div>
      <div>
        <ShopCard
          :book="{
            id: 2,
            title: 'JavaScript高级编程',
            author: '李四',
            price: '129.00',
            originalPrice: '168.00',
            imagePath: book2
          }"
          @add-to-cart="handleAddToCart"
        />
        <ShopCard
          :book="{
            id: 2,
            title: 'JavaScript高级编程',
            author: '李四',
            price: '129.00',
            originalPrice: '168.00',
            imagePath: book3
          }"
          @add-to-cart="handleAddToCart"
        />
        <ShopCard
          :book="{
            id: 2,
            title: 'JavaScript高级编程',
            author: '李四',
            price: '129.00',
            originalPrice: '168.00',
            imagePath: book4
          }"
          @add-to-cart="handleAddToCart"
        />
        <ShopCard
          :book="{
            id: 2,
            title: 'JavaScript高级编程',
            author: '李四',
            price: '129.00',
            originalPrice: '168.00',
            imagePath: book5
          }"
          @add-to-cart="handleAddToCart"
        />
        <ShopCard
          :book="{
            id: 2,
            title: 'JavaScript高级编程',
            author: '李四',
            price: '129.00',
            originalPrice: '168.00',
            imagePath: book6
          }"
          @add-to-cart="handleAddToCart"
        />
        <ShopCard
          :book="{
            id: 2,
            title: 'JavaScript高级编程',
            author: '李四',
            price: '129.00',
            originalPrice: '168.00',
            imagePath: book2
          }"
          @add-to-cart="handleAddToCart"
        />
        <ShopCard
          :book="{
            id: 2,
            title: 'JavaScript高级编程',
            author: '李四',
            price: '129.00',
            originalPrice: '168.00',
            imagePath: book2
          }"
          @add-to-cart="handleAddToCart"
        />
        v
        <ShopCard
          :book="{
            id: 2,
            title: 'JavaScript高级编程',
            author: '李四',
            price: '129.00',
            originalPrice: '168.00',
            imagePath: book2
          }"
          @add-to-cart="handleAddToCart"
        />

        <ShopCard
          :book="{
            id: 2,
            title: 'JavaScript高级编程',
            author: '李四',
            price: '129.00',
            originalPrice: '168.00',
            imagePath: book2
          }"
          @add-to-cart="handleAddToCart"
        />
        <ShopCard
          :book="{
            id: 2,
            title: 'JavaScript高级编程',
            author: '李四',
            price: '129.00',
            originalPrice: '168.00',
            imagePath: book2
          }"
          @add-to-cart="handleAddToCart"
        />
        <ShopCard
          :book="{
            id: 2,
            title: 'JavaScript高级编程',
            author: '李四',
            price: '129.00',
            originalPrice: '168.00',
            imagePath: book2
          }"
          @add-to-cart="handleAddToCart"
        />
      </div>
      <div class="pagination-container">
        <div class="pagination">
          <button
            class="page-btn"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            上一页
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            class="page-btn"
            :class="{ active: currentPage === page }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
          <button
            class="page-btn"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
    <div class="footer">最底下</div>
  </div>
</template>

<style scoped lang="scss">
.product-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f6fa;
  .search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      height: 40px; /* 与搜索框高度一致 */
      margin: 20px 20px 0 0;
      object-fit: contain;
    }
    .search-input {
      margin: 20px 0 0 0;
      padding: 0;
      width: 400px;
      height: 40px;
      box-sizing: border-box;
    }
    .search-button {
      margin: 20px 0 0 2px;
      height: 40px;
      box-sizing: border-box;
    }
  }
}
.line {
  border: none;
  height: 1px;
  background-color: #ddd;
  margin: 10px 0;
  width: 100%;
}
.product-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 10px 0 0 10%;
  background-color: #fff;
  border-radius: 20px;
  padding: 16px;
  margin: 16px auto;
  width: 80%;
  .category-title {
    position: relative;
    display: flex;
    width: 100%;
    padding-left: 0;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 8px;
    font-size: 25px;
    font-weight: bold;
  }
  .product-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    gap: 10px;
  }
}
.product-all {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 20px;
  padding: 16px;
  margin: 16px;
  width: 80%;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 8px;
}
.product-all > div {
  display: flex;
  flex-wrap: wrap;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 4px;
}
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.page-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.page-btn:hover:not(:disabled) {
  background-color: #f8f9fa;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn.active {
  background-color: #6aa8eb;
  color: white;
  border-color: #6aa8eb;
}

.footer {
  height: 100px;
  margin-top: 50px;
  background-color: #fff;
  color: #fff;
  width: 100%;
}
</style>
