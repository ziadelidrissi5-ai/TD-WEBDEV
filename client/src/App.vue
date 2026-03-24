<template>
  <div class="app-shell">
    <div class="glow glow-left"></div>
    <div class="glow glow-right"></div>

    <header class="masthead">
      <p class="kicker">Journal de depenses</p>

      <div class="masthead-grid">
        <div class="masthead-copy">
          <h1>Un carnet plus calme pour suivre ce qui sort.</h1>
          <p>
            L’idee ici n’est pas de faire un dashboard de startup, mais un
            espace lisible, presque papier, pour noter et revoir tes depenses.
          </p>
        </div>

        <aside class="masthead-note">
          <span class="note-label">Edition du mois</span>
          <p>Les lignes de depenses restent nettes, avec juste assez de relief.</p>
        </aside>
      </div>

      <nav class="nav">
        <RouterLink to="/">Registre</RouterLink>
        <RouterLink to="/add">Nouvelle entree</RouterLink>
      </nav>
    </header>

    <main class="page">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
  max-width: 980px;
  margin: 0 auto;
  padding: 24px 16px 40px;
  color: #1f2a1f;
  overflow: hidden;
  font-family: "Avenir Next", "Segoe UI", sans-serif;
}

.glow {
  position: fixed;
  z-index: -1;
  border-radius: 999px;
  filter: blur(22px);
  opacity: 0.5;
}

.glow-left {
  top: -40px;
  left: -100px;
  width: 240px;
  height: 240px;
  background: rgba(170, 191, 138, 0.45);
}

.glow-right {
  top: 160px;
  right: -80px;
  width: 280px;
  height: 280px;
  background: rgba(206, 177, 132, 0.3);
}

.masthead {
  padding: 26px;
  margin-bottom: 18px;
  border: 1px solid rgba(44, 54, 38, 0.14);
  border-radius: 32px;
  background:
    linear-gradient(180deg, rgba(255, 251, 243, 0.98), rgba(247, 240, 226, 0.98));
  box-shadow: 0 16px 28px rgba(69, 56, 33, 0.08);
}

.kicker {
  margin: 0 0 18px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #716a52;
}

.masthead-grid {
  display: grid;
  grid-template-columns: 1.8fr 0.9fr;
  gap: 18px;
  align-items: end;
}

.masthead-copy h1 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.5rem, 5vw, 4.25rem);
  line-height: 0.95;
  letter-spacing: -0.05em;
}

.masthead-copy p {
  max-width: 560px;
  margin: 16px 0 0;
  font-size: 1.02rem;
  line-height: 1.7;
  color: #5d6353;
}

.masthead-note {
  padding: 18px;
  border-radius: 24px;
  background: #263126;
  color: #f8f0dd;
}

.note-label {
  display: inline-block;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #d9c8a0;
}

.masthead-note p {
  margin: 10px 0 0;
  line-height: 1.6;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.nav a {
  padding: 11px 16px;
  border-radius: 999px;
  border: 1px solid rgba(44, 54, 38, 0.16);
  background: rgba(255, 248, 236, 0.92);
  color: #2c3626;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.nav a:hover {
  transform: translateY(-1px);
  background: #fffdf8;
}

.nav a.router-link-active {
  border-color: #263126;
  background: #263126;
  color: #fff7e8;
}

.page {
  animation: rise 0.45s ease;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .app-shell {
    padding: 14px 12px 28px;
  }

  .masthead {
    padding: 20px 18px;
    border-radius: 24px;
  }

  .masthead-grid {
    grid-template-columns: 1fr;
  }

  .masthead-copy h1 {
    font-size: 2.8rem;
  }
}
</style>
