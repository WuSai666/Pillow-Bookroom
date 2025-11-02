<script setup>
import { ref, onMounted } from 'vue'
import ShopCard from '@/components/ShopCard.vue'
import { ElMessage } from 'element-plus'

// 搜索相关数据
const searchInput = ref('')
const showHistory = ref(false)
const searchHistory = ref(['Vue.js', 'JavaScript', 'React', 'TypeScript'])

// 从 localStorage 加载搜索历史
onMounted(() => {
  const savedHistory = localStorage.getItem('searchHistory')
  if (savedHistory) {
    try {
      searchHistory.value = JSON.parse(savedHistory)
    } catch (e) {
      console.error('加载搜索历史失败:', e)
    }
  }
})
let blurTimeout = null
// 处理搜索框失焦事件
const handleBlur = () => {
  // 清除之前可能存在的定时器
  if (blurTimeout) {
    clearTimeout(blurTimeout)
  }
  // 设置新的定时器来隐藏下拉框
  blurTimeout = setTimeout(() => {
    showHistory.value = false
  }, 2000)
}

// 处理下拉框鼠标进入事件，取消隐藏
const handleDropdownMouseEnter = () => {
  if (blurTimeout) {
    clearTimeout(blurTimeout)
  }
}

// 处理下拉框鼠标离开事件，开始隐藏倒计时
const handleDropdownMouseLeave = () => {
  handleBlur()
}

//处理下拉项点击事件
const selectHistoryItem = (keyword) => {
  searchInput.value = keyword
  //立即隐藏下拉框
  showHistory.value = false
}

// 处理搜索逻辑
const doSearch = () => {
  const keyword = searchInput.value.trim()
  if (keyword) {
    console.log('搜索:', keyword)

    // 添加到搜索历史记录
    addToHistory(keyword)

    // 实际搜索逻辑可以在这里添加
    showHistory.value = false
  }
}

// 添加搜索关键词到历史记录
const addToHistory = (keyword) => {
  // 去重：如果已存在该关键词，先移除旧的
  const index = searchHistory.value.indexOf(keyword)
  if (index > -1) {
    searchHistory.value.splice(index, 1)
  }

  // 将新关键词添加到最前面
  searchHistory.value.unshift(keyword)

  // 限制历史记录数量（最多保存10条）
  if (searchHistory.value.length > 10) {
    searchHistory.value.pop()
  }

  // 保存到 localStorage 以便刷新页面后仍能看到
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
}

import book1 from '@/assets/book1.jpg'
import book2 from '@/assets/book2.jpg.avif'
import book3 from '@/assets/book3.jpg.avif'
import book4 from '@/assets/book4.jpg.avif'
import book5 from '@/assets/book5.jpg.avif'
import book6 from '@/assets/book6.jpg.avif'
import book7 from '@/assets/book7.jpg.avif'
import book8 from '@/assets/book8.jpg.avif'
import book9 from '@/assets/book9.jpg.avif'
import book10 from '@/assets/book10.jpg.avif'
import book11 from '@/assets/book11.jpg.avif'

const imageList = ref([
  {
    id: 1,
    idView: book1,
    alt: 'book1'
  },
  {
    id: 2,
    idView: book2,
    alt: 'book2'
  },
  {
    id: 3,
    idView: book3,
    alt: 'book3'
  },
  {
    id: 4,
    idView: book4,
    alt: 'book4'
  },
  {
    id: 5,
    idView: book5,
    alt: 'book5'
  },
  {
    id: 6,
    idView: book6,
    alt: 'book6'
  }
])

const searchlist = ref([
  { id: 1, name: '文学' },
  { id: 2, name: '历史' },
  { id: 3, name: '社会' },
  { id: 4, name: '自然' },
  { id: 5, name: '技术' },
  { id: 6, name: '其他' }
])
console.log(searchlist.value)

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
  <div class="homepage">
    <div class="search-box">
      <img src="@/assets/book.png" class="logo" />
      <div class="search-container">
        <el-input
          v-model="searchInput"
          placeholder="请输入搜索内容"
          class="search-input"
          @focus="showHistory = true"
          @blur="handleBlur"
          @keyup.enter="doSearch"
        ></el-input>
        <!-- 搜索历史下拉框 -->
        <div
          v-if="showHistory"
          class="search-history-dropdown"
          @mouseenter="handleDropdownMouseEnter"
          @mouseleave="handleDropdownMouseLeave"
        >
          <div class="history-header">
            <span>搜索历史</span>
          </div>
          <ul class="history-list">
            <li
              v-for="(keyword, index) in searchHistory"
              :key="index"
              @mousedown.stop
              @click="selectHistoryItem(keyword)"
            >
              {{ keyword }}
            </li>
          </ul>
        </div>
      </div>
      <el-button type="primary" class="search-button" @click="doSearch"
        >搜索</el-button
      >
    </div>
    <div class="carousel-box">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in imageList" :key="item.id">
          <img :src="item.idView" :alt="item.alt" class="imagelist" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="shop-cards-container">
      <div class="title">热门图书</div>
      <ShopCard
        :book="{
          id: 1,
          title: 'Vue.js实战指南',
          author: '张三',
          price: '99.00',
          originalPrice: '128.00',
          imagePath: book1
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
          id: 3,
          title: 'React全栈开发',
          author: '王五',
          price: '119.00',
          originalPrice: '148.00',
          imagePath: book3
        }"
        @add-to-cart="handleAddToCart"
      />
      <ShopCard
        :book="{
          id: 4,
          title: 'React全栈开发',
          author: '王五',
          price: '119.00',
          originalPrice: '148.00',
          imagePath: book4
        }"
        @add-to-cart="handleAddToCart"
      />
      <ShopCard
        :book="{
          id: 5,
          title: 'React全栈开发',
          author: '王五',
          price: '119.00',
          originalPrice: '148.00',
          imagePath: book5
        }"
        @add-to-cart="handleAddToCart"
      />
      <ShopCard
        :book="{
          id: 6,
          title: 'React全栈开发',
          author: '王五',
          price: '119.00',
          originalPrice: '148.00',
          imagePath: book6
        }"
        @add-to-cart="handleAddToCart"
      />
      <ShopCard
        :book="{
          id: 7,
          title: 'React全栈开发',
          author: '王五',
          price: '119.00',
          originalPrice: '148.00',
          imagePath: book7
        }"
        @add-to-cart="handleAddToCart"
      />
      <ShopCard
        :book="{
          id: 8,
          title: 'React全栈开发',
          author: '王五',
          price: '119.00',
          originalPrice: '148.00',
          imagePath: book8
        }"
        @add-to-cart="handleAddToCart"
      />
      <ShopCard
        :book="{
          id: 9,
          title: 'React全栈开发',
          author: '王五',
          price: '119.00',
          originalPrice: '148.00',
          imagePath: book9
        }"
        @add-to-cart="handleAddToCart"
      />
      <ShopCard
        :book="{
          id: 10,
          title: 'React全栈开发',
          author: '王五',
          price: '119.00',
          originalPrice: '148.00',
          imagePath: book10
        }"
        @add-to-cart="handleAddToCart"
      />
      <ShopCard
        :book="{
          title: 'React全栈开发',
          author: '王五',
          price: '119.00',
          originalPrice: '148.00',
          imagePath: book11
        }"
      />
      <ShopCard
        :book="{
          title: 'React全栈开发',
          author: '王五',
          price: '119.00',
          originalPrice: '148.00',
          imagePath: book3
        }"
      />
      <ShopCard
        :book="{
          title: 'React全栈开发',
          author: '王五',
          price: '119.00',
          originalPrice: '148.00',
          imagePath: book3
        }"
      />
      <ShopCard
        :book="{
          title: 'React全栈开发',
          author: '王五',
          price: '119.00',
          originalPrice: '148.00',
          imagePath: book3
        }"
      />
      <ShopCard
        :book="{
          title: 'React全栈开发',
          author: '王五',
          price: '119.00',
          originalPrice: '148.00',
          imagePath: book3
        }"
      />
      <ShopCard
        :book="{
          title: 'React全栈开发',
          author: '王五',
          price: '119.00',
          originalPrice: '148.00',
          imagePath: book3
        }"
      />
    </div>
  </div>
  <hr class="line" />
  <br />
  <br />
  <div>
    <h3>购物指南</h3>
    <p>
      1. 选择您喜欢的图书，点击添加到购物车。<br />
      2. 在购物车中查看您选择的图书，调整数量或删除图书。<br />
      3. 点击“去结算”按钮，填写您的个人信息和支付方式。<br />
      4. 确认订单信息，完成支付。<br />
      5. 感谢您的购买，我们会尽快发货！<br />
    </p>
  </div>
</template>

<style scoped lang="scss">
.homepage {
  background-color: #f5f6fa;
}
.title {
  font-size: 24px;
  font-weight: bold;
  width: 80%;
  margin: 20px 0 20px 0;
  color: #6aa8eb;
}
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

.search-container {
  position: relative;
  display: inline-block;
}

.search-history-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
}

.history-header {
  padding: 8px 12px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #ebeef5;
  font-size: 12px;
  color: #909399;
}

.history-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 150px;
  overflow-y: auto;
}

.history-list li {
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-list li:hover {
  background-color: #f5f7fa;
  color: #409eff;
}
.carousel-box {
  margin: 20px 0 0 10%;
  background-color: #fff;
  border-radius: 20px;
  width: 80%;
  .imagelist {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
/* 修改轮播图箭头颜色 */
:deep(.el-carousel__arrow) {
  color: #f1eaea;
  background-color: rgba(57, 142, 222, 0.8);
}

:deep(.el-carousel__arrow:hover) {
  background-color: rgba(57, 142, 222, 0.8);
}
.shop-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 10px 0 0 10%;
  background-color: #fff;
  border-radius: 20px;
}
</style>
