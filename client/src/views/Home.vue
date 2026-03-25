<template>
  <section class="landing">
    <div class="hero-grid">
      <section class="hero-copy">
        <p class="eyebrow">Suivi budgetaire premium</p>
        <h1>
          Suivre.
          <br />
          Optimiser.
          <br />
          <span>Depenser mieux.</span>
        </h1>
        <p class="lead">
          Suis tes depenses en temps reel, organise-les par categorie et pilote
          ton budget avec une interface claire et moderne.
        </p>


        <div class="hero-actions">
          <RouterLink class="primary-link" to="/add">Ajouter une depense</RouterLink>
          <div class="hero-total">
            <span>Total actuel</span>
            <strong>{{ total }} €</strong>
          </div>
        </div>

        <div class="stats-row">
          <article class="stat-box">
            <span>{{ expenses.length }}</span>
            <p>depenses enregistrees</p>
          </article>
          <article class="stat-box">
            <span>{{ categoryStats.length }}</span>
            <p>categories actives</p>
          </article>
          <article class="stat-box">
            <span>{{ topCategoryLabel }}</span>
            <p>categorie dominante</p>
          </article>
        </div>
      </section>

      <section class="hero-visual">
        <div class="visual-card main-visual">
          <div class="visual-head">
            <span>Repartition</span>
            <strong>{{ total }} €</strong>
          </div>

          <div
            class="donut"
            :style="{
              background: `conic-gradient(${chartGradient})`
            }"
          >
            <div class="donut-center">
              <strong>{{ total }} €</strong>
              <span>Total</span>
            </div>
          </div>

          <ul class="legend">
            <li v-for="item in categoryStats" :key="item.name">
              <span class="legend-dot" :style="{ background: item.color }"></span>
              <span>{{ item.label }}</span>
              <strong>{{ item.amount }} €</strong>
            </li>
          </ul>
        </div>

        <div class="visual-card floating-visual">
          <div class="visual-head">
            <span>Comparatif</span>
            <strong>Postes</strong>
          </div>

          <ul class="bars">
            <li v-for="item in categoryStats" :key="item.name">
              <div class="bar-label">
                <span>{{ item.label }}</span>
                <strong>{{ item.amount }} €</strong>
              </div>
              <div class="bar-track">
                <div
                  class="bar-fill"
                  :style="{
                    width: `${item.percentage}%`,
                    background: item.color
                  }"
                ></div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>

    <section class="ledger-shell">
      <div class="ledger-head">
        <div>
          <p class="eyebrow">Registre des depenses</p>
          <h2>Liste des depenses</h2>
        </div>
        <span>{{ expenses.length }} entree(s)</span>
      </div>

      <p v-if="!expenses.length" class="empty">
        Aucune depense pour le moment.
      </p>

      <ul v-else class="ledger-list">
        <li v-for="d in expenses" :key="d._id" class="ledger-item">
          <div class="item-copy">
            <p class="title">{{ d.title }}</p>
            <p class="amount">{{ d.amount }} €</p>
          </div>

          <div class="item-actions">
            <select
              class="category-select"
              :value="d.category || 'nourriture'"
              @change="updateCategory(d._id, $event.target.value)"
            >
              <option
                v-for="option in categories"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>

            <button class="delete-button" @click="remove(d._id)">Supprimer</button>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const expenses = ref([])
const categories = [
  { value: 'transport', label: 'Transport' },
  { value: 'nourriture', label: 'Nourriture' },
  { value: 'loisirs', label: 'Loisirs' },
  { value: 'logement', label: 'Logement' },
  { value: 'sante', label: 'Sante' }
]
const categoryLabels = {
  transport: 'Transport',
  nourriture: 'Nourriture',
  loisirs: 'Loisirs',
  logement: 'Logement',
  sante: 'Sante'
}
const categoryColors = {
  transport: '#7f8cff',
  nourriture: '#f0b90b',
  loisirs: '#f6c27a',
  logement: '#5d5fef',
  sante: '#d18b1f'
}

const load = async () => {
  const res = await fetch('http://localhost:3000/expenses')
  expenses.value = await res.json()
}

onMounted(load)

const remove = async (id) => {
  await fetch('http://localhost:3000/expenses/' + id, { method: 'DELETE' })
  load()
}

const updateCategory = async (id, category) => {
  const res = await fetch(`http://localhost:3000/expenses/${id}/category`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category })
  })

  if (!res.ok) {
    window.alert(
      'La categorie n a pas pu etre mise a jour. Redemarre le serveur backend puis reessaie.'
    )
    return
  }

  load()
}

const total = computed(() =>
  expenses.value.reduce((sum, e) => sum + e.amount, 0)
)

const categoryStats = computed(() => {
  const totals = {
    transport: 0,
    nourriture: 0,
    loisirs: 0,
    logement: 0,
    sante: 0
  }

  for (const expense of expenses.value) {
    const key = totals[expense.category] !== undefined
      ? expense.category
      : 'nourriture'
    totals[key] += Number(expense.amount) || 0
  }

  return Object.entries(totals)
    .map(([name, amount]) => ({
      name,
      label: categoryLabels[name],
      amount,
      color: categoryColors[name],
      percentage: total.value ? Math.round((amount / total.value) * 100) : 0
    }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount)
})

const chartGradient = computed(() => {
  if (!categoryStats.value.length) {
    return '#2b2b31 0 100%'
  }

  let start = 0

  return categoryStats.value
    .map((item) => {
      const end = start + item.percentage
      const segment = `${item.color} ${start}% ${end}%`
      start = end
      return segment
    })
    .join(', ')
})

const topCategoryLabel = computed(() =>
  categoryStats.value[0]?.label || 'Aucune'
)
</script>

<style scoped>
.landing {
  width: min(1440px, 100%);
  min-height: calc(100vh - 82px);
  padding: 24px 32px 40px;
  margin: 0 auto;
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(380px, 520px);
  gap: 28px;
  align-items: center;
  min-height: 74vh;
}

.hero-copy {
  padding: 30px 0;
  min-width: 0;
}

.eyebrow {
  margin: 0 0 14px;
  color: #f6c27a;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(3.6rem, 7vw, 6rem);
  line-height: 0.98;
  letter-spacing: -0.05em;
  color: #f5f5f5;
}

h1 span {
  background: linear-gradient(135deg, #7f8cff 0%, #f6c27a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.lead {
  max-width: 640px;
  margin: 28px 0 0;
  color: #a1a1aa;
  font-size: 1.35rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  margin-top: 34px;
}

.primary-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 240px;
  padding: 18px 28px;
  border-radius: 999px;
  border: 1px solid rgba(246, 194, 122, 0.9);
  background: linear-gradient(135deg, #f0b90b 0%, #f6c27a 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 10px 26px rgba(240, 185, 11, 0.16);
  color: #151515;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 700;
}

.hero-total {
  padding: 18px 22px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
}

.hero-total span {
  display: block;
  color: #a1a1aa;
}

.hero-total strong {
  display: block;
  margin-top: 4px;
  font-size: 2rem;
  color: #f5f5f5;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 42px;
}

.stat-box {
  padding: 22px 18px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(6px);
}

.stat-box span {
  display: block;
  margin-bottom: 10px;
  color: #f6c27a;
  font-size: 1.55rem;
  font-weight: 700;
}

.stat-box p {
  margin: 0;
  color: #c4c4c7;
  line-height: 1.5;
}

.hero-visual {
  position: relative;
  min-height: 720px;
  min-width: 0;
}

.visual-card {
  border-radius: 32px;
  background:
    linear-gradient(180deg, rgba(29, 27, 36, 0.96), rgba(18, 18, 22, 0.96));
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35);
}

.main-visual {
  position: absolute;
  top: 20px;
  right: 0;
  width: min(520px, 100%);
  padding: 30px;
}

.floating-visual {
  position: absolute;
  left: 10px;
  bottom: 0;
  width: min(400px, 74%);
  padding: 24px;
}

.visual-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
  color: #e5e7eb;
}

.visual-head span {
  color: #a1a1aa;
}

.donut {
  position: relative;
  width: 220px;
  height: 220px;
  margin: 0 auto 28px;
  border-radius: 50%;
}

.donut-center {
  position: absolute;
  inset: 22px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #19181d;
  text-align: center;
}

.donut-center strong,
.donut-center span {
  display: block;
}

.legend,
.bars,
.ledger-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.legend {
  display: grid;
  gap: 12px;
}

.legend li {
  display: grid;
  grid-template-columns: 12px 1fr auto;
  gap: 12px;
  align-items: center;
  color: #ededed;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
}

.bars {
  display: grid;
  gap: 16px;
}

.bar-label {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
  color: #ededed;
}

.bar-track {
  overflow: hidden;
  height: 10px;
  border-radius: 999px;
  background: #2b2b31;
}

.bar-fill {
  height: 100%;
  border-radius: 999px;
}

.ledger-shell {
  margin-top: 24px;
  width: 100%;
  padding: 32px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.03);
  overflow: hidden;
}

.ledger-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
}

.ledger-head h2 {
  margin: 0;
  font-size: 2rem;
  color: #f5f5f5;
}

.ledger-head span {
  color: #a1a1aa;
}

.empty {
  margin: 0;
  padding: 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  color: #a1a1aa;
}

.ledger-list {
  display: grid;
  gap: 16px;
}

.ledger-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
  padding: 20px 22px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.title,
.amount {
  margin: 0;
}

.title {
  color: #f5f5f5;
  font-size: 1.2rem;
  font-weight: 700;
}

.amount {
  margin-top: 6px;
  color: #a1a1aa;
  font-size: 1.05rem;
}

.item-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  justify-content: flex-end;
  min-width: 0;
}

.category-select {
  min-width: 180px;
  max-width: 220px;
  padding: 12px 14px;
  border: 0;
  border-radius: 14px;
  background: #0f1012;
  color: #f5f5f5;
  font: inherit;
}

.delete-button {
  padding: 12px 16px;
  border: 0;
  border-radius: 14px;
  background: #2b2b31;
  color: #f5f5f5;
  font-weight: 600;
  cursor: pointer;
}

@media (max-width: 1200px) {
  .landing {
    padding: 22px 18px 32px;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .hero-visual {
    min-height: auto;
    display: grid;
    gap: 18px;
  }

  .main-visual,
  .floating-visual {
    position: static;
    width: 100%;
  }
}

@media (max-width: 720px) {
  .hero-actions,
  .ledger-head,
  .ledger-item,
  .item-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .stats-row {
    grid-template-columns: 1fr;
  }

  .primary-link,
  .category-select,
  .delete-button {
    width: 100%;
  }

  h1 {
    font-size: 3.2rem;
  }

  .lead {
    font-size: 1.1rem;
  }

  .landing {
    padding: 18px 14px 28px;
  }

  .ledger-shell {
    padding: 22px 18px;
  }

  .category-select {
    max-width: none;
  }
}
</style>
