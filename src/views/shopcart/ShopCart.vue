<script setup>
import { ref, onMounted } from 'vue'
import book2 from '@/assets/book2.jpg.avif'
import book1 from '@/assets/book1.jpg'
import GoodsCard from '@/components/GoodsCard.vue'
import ShopCard from '@/components/ShopCard.vue'
import { ElMessage } from 'element-plus'

// 购物车选中项
const selectedGoodId = ref('')

// 购物车商品列表
const cartGoods = ref([])

// 从localStorage加载购物车数据
onMounted(() => {
  loadCartData()
})

// 加载购物车数据
const loadCartData = () => {
  try {
    const savedData = localStorage.getItem('cartGoods')
    if (savedData) {
      cartGoods.value = JSON.parse(savedData)
    } else {
      // 如果没有数据，使用默认模拟数据
      cartGoods.value = [
        {
          id: 1,
          title: 'Vue.js实战指南',
          author: '张三',
          price: '99.00',
          originalPrice: '128.00',
          quantity: 2,
          imagePath: book1
        },
        {
          id: 2,
          title: 'JavaScript高级编程',
          author: '李四',
          price: '129.00',
          originalPrice: '168.00',
          quantity: 1,
          imagePath: book2
        }
      ]
    }
  } catch (error) {
    console.error('加载购物车数据失败:', error)
    ElMessage.error('加载购物车数据失败')
  }
}

// 保存购物车数据到localStorage
const saveCartData = () => {
  try {
    localStorage.setItem('cartGoods', JSON.stringify(cartGoods.value))
  } catch (error) {
    console.error('保存购物车数据失败:', error)
    ElMessage.error('保存购物车数据失败')
  }
}

// 处理数量变更
const handleQuantityChange = (id, newQuantity) => {
  const good = cartGoods.value.find(item => item.id === id)
  if (good) {
    good.quantity = newQuantity
    // 保存更新后的数据
    saveCartData()
  }
}

// 处理删除商品
const handleDeleteGood = (id) => {
  cartGoods.value = cartGoods.value.filter(item => item.id !== id)
  // 保存更新后的数据
  saveCartData()
}
</script>

<template>
  <div class="product-page">
    <div class="search-box">
      <div class="box">
        <el-input placeholder="请输入搜索内容" class="search-input"></el-input>
        <el-button type="primary" class="search-button">搜索</el-button>
      </div>
    </div>
    <!-- 购物车商品列表 -->
    <div v-if="cartGoods.length > 0" class="goods-list">
      <h3 class="section-title">购物车商品</h3>
      <GoodsCard 
        v-for="good in cartGoods" 
        :key="good.id"
        v-model="selectedGoodId"
        :good="good"
        @quantity-change="handleQuantityChange"
        @delete="handleDeleteGood"
      />
    </div>
    <div v-else class="empty-cart">
      <div>
        <img src="@/assets/blank.png" class="blank-img" />
      </div>
      <div class="blank-text">
        <p>购物车空空的哦~，去看看心仪的商品吧~</p>
      </div>
    </div>
      
      <!-- 推荐商品 -->
      <div class="recommended-products">
        <h3 class="section-title">猜你喜欢</h3>
        <div class="recommended-list">
          <ShopCard
            :book="{
              id: 2,
              title: 'JavaScript高级编程',
              author: '李四',
              price: '129.00',
              originalPrice: '168.00',
              imagePath: book2
            }"
            @add-to-cart="(book) => {
              const existingItemIndex = cartGoods.value.findIndex(item => item.id === book.id)
              if (existingItemIndex !== -1) {
                cartGoods.value[existingItemIndex].quantity += 1
              } else {
                cartGoods.value.push({ ...book, quantity: 1 })
              }
              saveCartData()
              ElMessage.success('已成功添加到购物车！')
            }"
          />
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
  padding-bottom: 20px;
  
  .search-box {
    display: flex;
    justify-content: right;
    align-items: center;
    width: 80%;
    margin-bottom: 20px;
    
    .box {
      margin-right: 200px;
      
      .search-input {
        margin: 20px 10px 0 0;
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
  
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    background-color: #fff;
    border-radius: 20px;
    margin: 16px;
    width: 80%;
    
    .blank-img {
      width: 200px;
      height: 200px;
      margin-bottom: 20px;
    }
    
    .blank-text {
      font-size: 15px;
      font-weight: bold;
      color: #5c5b5b;
    }
  }
  
  .goods-list {
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;
    margin: 16px;
    width: 80%;
    
    .section-title {
      margin-bottom: 16px;
      color: #333;
      font-size: 18px;
      font-weight: 600;
    }
  }
  
  .recommended-products {
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;
    margin: 16px;
    width: 80%;
    margin-bottom: 20px;
    
    .section-title {
      margin-bottom: 16px;
      color: #333;
      font-size: 18px;
      font-weight: 600;
    }
    
    .recommended-list {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
  }
  
  .footer {
    margin-top: 20px;
    padding: 10px;
    text-align: center;
    color: #666;
  }
}
</style>
