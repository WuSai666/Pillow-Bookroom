<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import default1 from '@/assets/default.png'

const activeIndex = ref('1')
const router = useRouter()

// 处理退出登录
const handleLogout = () => {
  // 清除用户登录状态（如果有）
  localStorage.removeItem('userInfo')
  // 跳转到登录页面
  router.push('/login')
}
</script>

<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header class="header">
          <el-menu
            :default-active="activeIndex"
            class="el-menu"
            mode="horizontal"
            router
          >
            <!-- 左侧菜单项 -->
            <div class="menu-left">
              <el-menu-item index="/home/homepage">首页</el-menu-item>
              <el-menu-item index="/product/productpage">商品</el-menu-item>
              <el-menu-item index="/usereviews/usereviews"
                >用户评价</el-menu-item
              >
              <el-menu-item index="/shopcart/shopcartpage">购物车</el-menu-item>
            </div>

            <!-- 右侧用户头像下拉菜单 -->
            <div class="menu-right">
              <el-dropdown>
                <span class="user-avatar">
                  <img :src="default1" alt="用户头像" class="avatar-img" />
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="handleLogout"
                      >退出登录</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </el-menu>
        </el-header>
      </el-container>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.header {
  background-color: #6aa8eb;
  border-radius: 10px;
  .el-menu {
    background-color: #6aa8eb;
    display: flex;
    justify-content: space-between;
    width: 100%;

    .menu-left {
      display: flex;
    }

    .menu-right {
      display: flex;
    }
    // 点击前：字体颜色为白色
    .el-menu-item {
      color: #fff;
      // 点击时（hover）：背景为白色不透明，字体颜色为黑色
      &:hover {
        background-color: #ffffff;
        color: #6aa8eb;
      }
      // 点击后（激活状态）：字体颜色为黑色，与白色背景形成对比，确保文字清晰可见
      &.is-active {
        color: #6aa8eb;
        background-color: #fff;
      }
    }
    // 用户头像样式
    .user-avatar {
      display: flex;
      align-items: center;
      padding: 0 20px;
      cursor: pointer;
      height: 60px;

      .avatar-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid white;
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>
