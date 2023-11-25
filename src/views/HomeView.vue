<script setup></script>

<template>
  <div class="body">
    <div class="aboutCompany">
      <div class="about">
        <h3 class="aboutTitle">世界級問卷服務</h3>
        <span class="aboutContent">輕鬆建立問卷，讓資料創造最大價值</span>
        <RouterLink to="/create" class="link">免費建立問卷</RouterLink>
      </div>

      <img src="../../public/homeImg.jpg" alt="company_img" />
    </div>
  </div>
</template>

<style scoped lang="scss">
body {
  .aboutCompany {
    height: 80vh;
    position: relative;
    overflow: hidden;

    .about {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 50%;
      left: 40%;
      transform: translate(-50%, -50%);

      .aboutTitle {
        font-size: 1.8rem;
        color: #1e5128;
        font-weight: bold;
        margin-bottom: 1rem;
      }
      .aboutContent {
        font-size: 1.4rem;
        color: #1e5128;
      }

      .link {
        align-self: center;
        background-color: #1e5128;
        text-decoration: none;
        font-size: 2rem;
        color: #bcead5;
        border: 2px solid #1e5128;
        border-radius: 8px;
        padding: 0.5rem;
        margin-top: 1rem;
        box-shadow: 0 10px 6px -6px #8ec3b0;
        transition: 0.3s ease;

        &:hover {
          cursor: pointer;
          background-color: #def5e5;
          color: #1e5128;
        }
      }
    }

    img {
      position: absolute;
      bottom: -20%;
      width: 100%;
      opacity: 0.6;
      z-index: -1;
    }
  }
}
</style>
