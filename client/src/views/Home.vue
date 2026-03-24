<template>
  <section class="ledger">
    <div class="ledger-header">
      <div>
        <p class="section-label">Registre courant</p>
        <h2>Les dernieres sorties</h2>
      </div>

      <div class="summary">
        <span>Total actuel</span>
        <strong>{{ total }} €</strong>
      </div>
    </div>

    <p v-if="!expenses.length" class="empty-state">
      Le carnet est encore vide. Ajoute une premiere depense pour commencer le suivi.
    </p>

    <ul v-else class="entries">
      <li v-for="d in expenses" :key="d._id" class="entry">
        <span class="entry-dot"></span>

        <div class="entry-main">
          <p class="entry-title">{{ d.title }}</p>
          <p class="entry-meta">Ligne de depense</p>
        </div>

        <div class="entry-side">
          <strong>{{ d.amount }} €</strong>
          <button @click="remove(d._id)">Supprimer</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const expenses = ref([])

const load = async () => {
  const res = await fetch('http://localhost:3000/expenses')
  expenses.value = await res.json()
}

onMounted(load)

const remove = async (id) => {
  await fetch('http://localhost:3000/expenses/' + id, { method: 'DELETE' })
  load()
}

const total = computed(() =>
  expenses.value.reduce((sum, e) => sum + e.amount, 0)
)
</script>

<style scoped>
.ledger {
  padding: 26px;
  border: 1px solid rgba(44, 54, 38, 0.12);
  border-radius: 32px;
  background:
    linear-gradient(180deg, rgba(255, 251, 244, 0.98), rgba(249, 244, 233, 0.98));
  box-shadow: 0 14px 28px rgba(69, 56, 33, 0.07);
}

.ledger-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 26px;
}

.section-label {
  margin: 0 0 8px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #716a52;
}

h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 2.2rem;
  line-height: 1;
  letter-spacing: -0.04em;
}

.summary {
  min-width: 170px;
  padding: 16px 18px;
  border-radius: 22px;
  background: #263126;
  color: #f9f0dc;
}

.summary span {
  display: block;
  color: #d8c9a0;
}

.summary strong {
  display: block;
  margin-top: 4px;
  font-size: 2rem;
}

.empty-state {
  margin: 0;
  padding: 22px;
  border: 1px dashed rgba(44, 54, 38, 0.24);
  border-radius: 22px;
  color: #5d6353;
  background: rgba(255, 255, 255, 0.42);
}

.entries {
  list-style: none;
  margin: 0;
  padding: 0;
}

.entry {
  display: grid;
  grid-template-columns: 12px 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(44, 54, 38, 0.1);
}

.entry:last-child {
  border-bottom: 0;
}

.entry-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #9caf88;
  box-shadow: 0 0 0 5px rgba(156, 175, 136, 0.18);
}

.entry-title,
.entry-meta {
  margin: 0;
}

.entry-title {
  font-size: 1.12rem;
  font-weight: 700;
}

.entry-meta {
  margin-top: 4px;
  color: #7c7f69;
}

.entry-side {
  display: flex;
  align-items: center;
  gap: 16px;
}

.entry-side strong {
  font-size: 1.15rem;
  white-space: nowrap;
}

button {
  padding: 9px 13px;
  border: 1px solid rgba(145, 65, 45, 0.16);
  border-radius: 999px;
  background: #fff5ee;
  color: #8c3d2e;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 640px) {
  .ledger {
    padding: 20px 18px;
    border-radius: 24px;
  }

  .ledger-header,
  .entry-side {
    align-items: stretch;
    flex-direction: column;
  }

  .entry {
    grid-template-columns: 12px 1fr;
  }

  .entry-side {
    grid-column: 2;
  }

  .summary {
    width: 100%;
  }
}
</style>
