<template>
  <section class="add-page">
    <div class="form-shell">
      <p class="eyebrow">Ajoute une ligne a ton registre.</p>
      <h1>Nouvelle depense.</h1>
      <p class="lead">
        Renseigne un libelle, un montant et une categorie pour mieux t'organiser.
      </p>

      <form class="form" @submit.prevent="add">
        <label>
          <span>Libelle</span>
          <input v-model="title" placeholder="Ex: Navigo" required />
        </label>

        <label>
          <span>Montant</span>
          <input v-model.number="amount" type="number" placeholder="Ex: 84" required />
        </label>

        <label>
          <span>Categorie</span>
          <select v-model="category" required>
            <option
              v-for="option in categories"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </label>

        <button>Enregistrer la depense</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const router = useRouter()
const title = ref('')
const amount = ref(0)
const categories = [
  { value: 'transport', label: 'Transport' },
  { value: 'nourriture', label: 'Nourriture' },
  { value: 'loisirs', label: 'Loisirs' },
  { value: 'logement', label: 'Logement' },
  { value: 'sante', label: 'Sante' }
]
const category = ref('nourriture')

const add = async () => {
  await fetch(`${apiBaseUrl}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title.value,
      amount: amount.value,
      category: category.value
    })
  })

  router.push('/')
}
</script>

<style scoped>
.add-page {
  min-height: calc(100vh - 82px);
  padding: 34px 32px 40px;
}

.form-shell {
  width: min(100%, 1120px);
  padding: 34px;
  border-radius: 32px;
  background:
    radial-gradient(circle at top left, rgba(127, 140, 255, 0.12), transparent 28%),
    linear-gradient(180deg, rgba(29, 27, 36, 0.96), rgba(18, 18, 22, 0.96));
  box-shadow: 0 28px 56px rgba(0, 0, 0, 0.34);
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
  color: #f5f5f5;
  font-size: clamp(2.8rem, 6vw, 4.4rem);
  line-height: 1;
  letter-spacing: -0.05em;
}

.lead {
  max-width: 700px;
  margin: 18px 0 0;
  color: #a1a1aa;
  font-size: 1.15rem;
  line-height: 1.6;
}

.form {
  display: grid;
  gap: 18px;
  max-width: 720px;
  margin-top: 34px;
}

label {
  display: grid;
  gap: 8px;
}

label span {
  color: #f3f4f6;
  font-weight: 600;
}

input,
select {
  padding: 15px 16px;
  border: 0;
  border-radius: 14px;
  background: #0f1012;
  color: #f5f5f5;
  font: inherit;
}

input:focus,
select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(240, 185, 11, 0.34);
}

button {
  justify-self: start;
  min-width: 240px;
  padding: 16px 22px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #f0b90b 0%, #f6c27a 100%);
  color: #141414;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 720px) {
  .add-page {
    padding: 20px 16px 28px;
  }

  .form-shell {
    padding: 24px 18px;
    border-radius: 24px;
  }

  button {
    width: 100%;
    justify-self: stretch;
  }
}
</style>
