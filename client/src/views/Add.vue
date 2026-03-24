<template>
  <section class="editor">
    <p class="section-label">Nouvelle ligne</p>
    <h2>Ajouter une sortie</h2>
    <p class="description">
      Une entree simple, presque comme sur papier: un libelle, un montant, puis
      retour au registre.
    </p>

    <form class="form" @submit.prevent="add">
      <label>
        <span>Libelle</span>
        <input v-model="title" placeholder="Ex: Courses" required />
      </label>

      <label>
        <span>Montant</span>
        <input v-model.number="amount" type="number" min="0" step="0.01" required />
      </label>

      <button>Enregistrer la ligne</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const title = ref('')
const amount = ref(0)

const add = async () => {
  await fetch('http://localhost:3000/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title.value, amount: amount.value })
  })

  router.push('/')
}
</script>

<style scoped>
.editor {
  padding: 26px;
  border: 1px solid rgba(44, 54, 38, 0.12);
  border-radius: 32px;
  background:
    linear-gradient(180deg, rgba(255, 251, 244, 0.98), rgba(249, 244, 233, 0.98));
  box-shadow: 0 14px 28px rgba(69, 56, 33, 0.07);
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

.description {
  max-width: 520px;
  margin: 12px 0 0;
  line-height: 1.65;
  color: #5d6353;
}

.form {
  display: grid;
  gap: 20px;
  margin-top: 28px;
}

label {
  display: grid;
  gap: 10px;
  color: #1f2a1f;
  font-weight: 600;
}

input {
  padding: 15px 16px;
  border: 1px solid rgba(44, 54, 38, 0.14);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.84);
  color: #1f2a1f;
  font: inherit;
}

input:focus {
  outline: none;
  border-color: #6d7f5d;
  box-shadow: 0 0 0 4px rgba(156, 175, 136, 0.18);
}

button {
  justify-self: start;
  padding: 13px 22px;
  border: 0;
  border-radius: 999px;
  background: #263126;
  color: #fff7e8;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 640px) {
  .editor {
    padding: 20px 18px;
    border-radius: 24px;
  }

  button {
    width: 100%;
    justify-self: stretch;
  }
}
</style>
