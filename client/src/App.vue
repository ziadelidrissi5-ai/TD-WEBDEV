<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="brand-mark">Expense Desk</div>

      <nav class="topnav">
        <RouterLink to="/add">Ajouter</RouterLink>
      </nav>
    </header>

    <main class="page-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
:global(html),
:global(body),
:global(#app) {
  margin: 0;
  min-height: 100%;
  background: #0f1012;
}

.app-shell {
  min-height: 100vh;
  color: #f5f5f5;
  font-family: "Segoe UI", sans-serif;
  background:
    radial-gradient(circle at 30% 18%, rgba(90, 88, 179, 0.18), transparent 24%),
    radial-gradient(circle at 72% 22%, rgba(240, 185, 11, 0.1), transparent 18%),
    linear-gradient(180deg, #131114 0%, #0f1012 100%);
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 22px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(14, 14, 16, 0.82);
  backdrop-filter: blur(10px);
}

.brand-mark {
  color: #f6c27a;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.topnav {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.topnav a {
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid rgba(246, 194, 122, 0.8);
  color: #d1d5db;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s ease, color 0.2s ease;
}

.topnav a.router-link-active {
  background: #f6c27a;
  color: #171717;
}

.page-content {
  width: 100%;
}

@media (max-width: 720px) {
  .topbar {
    padding: 18px 16px;
    flex-direction: column;
    align-items: stretch;
  }

  .topnav {
    justify-content: flex-start;
  }
}
</style>
