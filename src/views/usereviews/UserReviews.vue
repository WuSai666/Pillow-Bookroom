<script setup>
import { ref } from 'vue'

// 响应式数据
const activeFilter = ref('all')
const sortBy = ref('newest')
const currentPage = ref(1)
const totalPages = ref(5)
const newReview = ref({
  rating: 5,
  title: '',
  content: ''
})

// 筛选选项
const filterOptions = [
  { label: '全部评价', value: 'all' },
  { label: '5星', value: '5' },
  { label: '4星', value: '4' },
  { label: '3星', value: '3' },
  { label: '2星', value: '2' },
  { label: '1星', value: '1' },
  { label: '有图', value: 'withImage' }
]

// 模拟评价数据
const reviews = ref([
  {
    id: 1,
    userName: '李小明',
    userAvatar: '@/assets/image1.png',
    rating: 5,
    title: '非常满意的一次购书体验',
    content:
      '这本书的内容非常丰富，印刷质量也很好，纸质摸起来很舒服。客服的态度也很好，解答了我很多问题。物流速度也很快，两天就收到了。非常推荐给喜欢阅读的朋友们！',
    date: '2023-11-15',
    likes: 32,
    liked: false,
    verified: true,
    images: ['@/assets/book1.jpg', '@/assets/image3.jpg']
  },
  {
    id: 2,
    userName: '张华',
    userAvatar: '@/assets/image.png',
    rating: 4,
    title: '好书值得推荐',
    content:
      '作者的文笔很流畅，故事情节跌宕起伏，让人一口气读完。不过包装可以再改进一下，收到时有轻微的压痕。总体来说还是很满意的一次购物。',
    date: '2023-11-10',
    likes: 18,
    liked: false,
    verified: true
  },
  {
    id: 3,
    userName: '王小红',
    userAvatar: '@/assets/image1.png',
    rating: 5,
    title: '超出预期的好书',
    content:
      '原本只是抱着试试看的心态购买，没想到读完后收获满满。书中的观点很有启发性，对我的工作和生活都有很大帮助。强烈推荐大家阅读！',
    date: '2023-11-05',
    likes: 45,
    liked: false,
    verified: false,
    images: ['@/assets/book3.jpg.avif']
  },
  {
    id: 4,
    userName: '赵强',
    userAvatar: '@/assets/image.png',
    rating: 3,
    title: '内容还可以，但价格偏高',
    content:
      '书的内容还不错，但感觉性价比不是很高。同样的内容，在其他平台的价格要便宜一些。希望以后能有更多的优惠活动。',
    date: '2023-10-28',
    likes: 7,
    liked: false,
    verified: false
  },
  {
    id: 5,
    userName: '陈静',
    userAvatar: '@/assets/image1.png',
    rating: 5,
    title: '第二次购买了，品质始终如一',
    content:
      '这是我第二次在这家店购买书籍了，每次的体验都很好。书籍的质量有保证，而且经常有优惠活动。这次还送了一个精美的书签，很喜欢！',
    date: '2023-10-20',
    likes: 29,
    liked: false,
    verified: true,
    images: ['@/assets/book2.jpg.avif', '@/assets/book4.jpg.avif']
  }
])

// 方法
function toggleLike(index) {
  const review = reviews.value[index]
  if (review.liked) {
    review.likes--
    review.liked = false
  } else {
    review.likes++
    review.liked = true
  }
}

function setRating(event) {
  const clickedStar = event.target
  if (clickedStar.classList.contains('star')) {
    const starIndex = parseInt(clickedStar.textContent)
    newReview.value.rating = starIndex
  }
}

function handleImageUpload(event) {
  // 处理图片上传逻辑
  console.log('选择的文件:', event.target.files)
  // 实际项目中这里会有文件上传和预览逻辑
}

function submitReview() {
  if (!newReview.value.title || !newReview.value.content) {
    alert('请填写评价标题和内容')
    return
  }

  // 添加新评价到列表（实际项目中这里会调用API）
  const newReviewObj = {
    id: reviews.value.length + 1,
    userName: '当前用户',
    userAvatar: '@/assets/image1.png',
    rating: newReview.value.rating,
    title: newReview.value.title,
    content: newReview.value.content,
    date: new Date().toISOString().split('T')[0],
    likes: 0,
    liked: false,
    verified: false
  }

  reviews.value.unshift(newReviewObj)

  // 重置表单
  newReview.value = {
    rating: 5,
    title: '',
    content: ''
  }

  alert('评价提交成功！')
}
</script>

<template>
  <div class="user-reviews-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>用户评价</h1>
      <p>来自读者的真实反馈</p>
    </div>

    <!-- 评分统计 -->
    <div class="rating-stats">
      <div class="overall-rating">
        <div class="rating-score">4.8</div>
        <div class="rating-label">平均评分</div>
        <div class="star-rating">
          <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= 5 }"
            >★</span
          >
        </div>
        <div class="total-reviews">基于 128 条评价</div>
      </div>

      <div class="rating-breakdown">
        <div class="rating-item" v-for="i in 5" :key="i">
          <span class="rating-number">{{ 6 - i }}星</span>
          <div class="progress-bar">
            <div
              class="progress"
              :style="{ width: `${(6 - i) * 20 - Math.random() * 10}%` }"
            ></div>
          </div>
          <span class="rating-percentage"
            >{{ (6 - i) * 20 - Math.floor(Math.random() * 10) }}%</span
          >
        </div>
      </div>
    </div>

    <!-- 筛选和排序 -->
    <div class="filter-section">
      <div class="filter-options">
        <button
          v-for="filter in filterOptions"
          :key="filter.value"
          class="filter-btn"
          :class="{ active: activeFilter === filter.value }"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>
      <div class="sort-options">
        <select v-model="sortBy" class="sort-select">
          <option value="newest">最新优先</option>
          <option value="highest">评分从高到低</option>
          <option value="lowest">评分从低到高</option>
        </select>
      </div>
    </div>

    <!-- 评价列表 -->
    <div class="reviews-list">
      <div
        class="review-item"
        v-for="(review, index) in reviews"
        :key="review.id"
      >
        <div class="review-header">
          <div class="user-info">
            <img
              :src="review.userAvatar"
              :alt="review.userName"
              class="user-avatar"
            />
            <div class="user-details">
              <h3 class="user-name">{{ review.userName }}</h3>
              <p class="review-date">{{ review.date }}</p>
            </div>
          </div>
          <div class="review-rating">
            <span
              v-for="i in 5"
              :key="i"
              class="star"
              :class="{ active: i <= review.rating }"
              >★</span
            >
          </div>
        </div>
        <div class="review-content">
          <h4 class="review-title">{{ review.title }}</h4>
          <p class="review-text">{{ review.content }}</p>
          <div
            v-if="review.images && review.images.length > 0"
            class="review-images"
          >
            <img
              v-for="(img, idx) in review.images"
              :key="idx"
              :src="img"
              :alt="'评价图片 ' + (idx + 1)"
              class="review-img"
            />
          </div>
        </div>
        <div class="review-footer">
          <div class="review-actions">
            <button class="action-btn" @click="toggleLike(index)">
              <span class="icon">{{ review.liked ? '❤️' : '🤍' }}</span>
              <span>{{ review.likes }}</span>
            </button>
            <button class="action-btn">
              <span class="icon">💬</span>
              <span>回复</span>
            </button>
          </div>
          <div class="verified-badge" v-if="review.verified">官方认证</div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
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

    <!-- 发表评价 -->
    <div class="review-form-section">
      <h3>发表您的评价</h3>
      <form class="review-form">
        <div class="form-group">
          <label>您的评分：</label>
          <div class="star-rating" @click="setRating">
            <span
              v-for="i in 5"
              :key="i"
              class="star"
              :class="{ active: i <= newReview.rating }"
              @click.stop="newReview.rating = i"
              >★</span
            >
          </div>
        </div>
        <div class="form-group">
          <label>评价标题：</label>
          <input
            type="text"
            v-model="newReview.title"
            placeholder="请输入评价标题"
          />
        </div>
        <div class="form-group">
          <label>评价内容：</label>
          <textarea
            v-model="newReview.content"
            placeholder="请分享您对此商品的体验..."
            rows="5"
          ></textarea>
        </div>
        <div class="form-group">
          <label>上传图片（可选）：</label>
          <div class="image-upload">
            <label class="upload-btn">
              <input
                type="file"
                multiple
                accept="image/*"
                @change="handleImageUpload"
              />
              <span>+ 添加图片</span>
            </label>
          </div>
        </div>
        <button type="button" class="submit-btn" @click="submitReview">
          提交评价
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 全局样式
.user-reviews-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

// 页面标题
.page-header {
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 8px;
  }

  p {
    font-size: 1rem;
    color: #666;
  }
}

// 评分统计
.rating-stats {
  display: flex;
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.overall-rating {
  flex: 1;
  text-align: center;
  padding-right: 25px;
}

.rating-score {
  font-size: 3.5rem;
  font-weight: bold;
  color: #6aa8eb;
  margin-bottom: 8px;
}

.rating-label {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 12px;
}

.star-rating .star {
  font-size: 1.3rem;
  color: #ddd;
}

.star-rating .star.active {
  color: #ffc107;
}

.total-reviews {
  color: #888;
  font-size: 0.85rem;
  margin-top: 8px;
}

.rating-breakdown {
  flex: 2;
}

.rating-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.rating-number {
  width: 40px;
  font-size: 0.9rem;
  color: #666;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin: 0 8px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #ffc107;
}

.rating-percentage {
  width: 40px;
  font-size: 0.9rem;
  color: #666;
  text-align: right;
}

// 筛选区域
.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-btn {
  padding: 6px 14px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 16px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background-color: #f8f9fa;
}

.filter-btn.active {
  background-color: #6aa8eb;
  color: white;
  border-color: #6aa8eb;
}

.sort-select {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
}

.sort-select:focus {
  outline: none;
  border-color: #6aa8eb;
}

// 评价列表
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.review-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.review-date {
  font-size: 0.85rem;
  color: #999;
  margin: 0;
}

.review-content {
  margin-bottom: 15px;
}

.review-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.review-text {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #666;
  margin: 0;
}

.review-images {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.review-img {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
}

.review-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.review-actions {
  display: flex;
  gap: 15px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #666;
}

.action-btn:hover {
  color: #ff6b6b;
}

.verified-badge {
  background-color: #4caf50;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.75rem;
}

// 分页
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;
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

// 评价表单
.review-form-section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 25px;
}

.review-form-section h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
  font-size: 0.95rem;
}

.form-group input[type='text'],
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
}

.form-group input[type='text']:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #6aa8eb;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.form-group .star-rating {
  display: inline-flex;
  gap: 4px;
}

.form-group .star {
  font-size: 1.8rem;
  color: #ddd;
  cursor: pointer;
}

.form-group .star:hover,
.form-group .star.active {
  color: #ffc107;
}

.upload-btn {
  display: inline-block;
  padding: 12px 24px;
  background-color: #fff;
  border: 2px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.upload-btn:hover {
  border-color: #6aa8eb;
}

.upload-btn input[type='file'] {
  display: none;
}

.upload-btn span {
  color: #666;
  font-weight: 500;
}

.submit-btn {
  padding: 10px 24px;
  background-color: #6aa8eb;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #6aa8eb;
}

// 响应式设计
@media (max-width: 768px) {
  .user-reviews-page {
    padding: 12px;
  }

  .page-header h1 {
    font-size: 1.8rem;
  }

  .rating-stats {
    flex-direction: column;
    padding: 20px;
  }

  .overall-rating {
    padding-right: 0;
    padding-bottom: 15px;
    border-bottom: 1px solid #e9ecef;
    margin-bottom: 15px;
  }

  .filter-section {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .review-item {
    padding: 15px;
  }

  .review-header {
    flex-direction: column;
    gap: 12px;
  }

  .review-images {
    flex-wrap: wrap;
  }
}
</style>
