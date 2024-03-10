<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const issuesInstance = axios.create({
  baseURL: "http://localhost:3000"
})

/**
 * Issues state
 */
const issues = ref<{
  id: string
  title: string
  description?: string
}[]>([])

async function fetchAllIssues() {
  const { data } = await issuesInstance.get('/issues')
  issues.value = data
}

const newTitle = ref<string>()
const newDescription = ref<string>()

const isUpdateDialogShown = ref(false)
const selectedId = ref<string>()
const updateTitle = ref<string>()
const updateDescription = ref<string>()

async function addIssue() {
  await issuesInstance.post('/issue', {
    title: newTitle.value,
    description: newDescription.value
  })
  fetchAllIssues();
}

async function deleteIssue(id: string) {
  await issuesInstance.delete(`/issue/${id}`)
  fetchAllIssues();
}

function showUpdateDialog(id: string) {
  isUpdateDialogShown.value = true
  selectedId.value = id

  const issue = issues.value.find(issue => issue.id === id)
  if (issue) {
    updateTitle.value = issue.title
    updateDescription.value = issue.description
  }

}

function hideUpdateDialog() {
  isUpdateDialogShown.value = false
  updateTitle.value = undefined
  updateDescription.value = undefined
  selectedId.value = undefined
}

async function updateIssue() {
  if (selectedId.value)
    await issuesInstance.put(`/issue/${selectedId.value}`, {
      title: updateTitle.value,
      description: updateDescription.value
    })
  await fetchAllIssues()
  hideUpdateDialog()
}

onMounted(async () => {
  await fetchAllIssues()
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-center text-5xl font-medium text-neutral-900 mb-4">Sitemate Issues</h1>
    <button type="button" class="mb-8" @click="fetchAllIssues">Click to refresh</button>

    <div class="max-h-[70vh] overflow-auto flex flex-col w-96 border border-neutral-900 drop-shadow-sm p-4">
      <div class="flex flex-col gap-3">
        <input v-model="newTitle" placeholder="Enter title" />
        <textarea v-model="newDescription" placeholder="Enter description(optional)"></textarea>
        <button type="button" class="self-end" @click="addIssue">Add</button>
      </div>
      <div class="h-px bg-slate-300 w-full my-5"></div>
      <div class="flex flex-col gap-3">
        <div v-for="issue in issues" :key="issue.id" class="flex flex-col gap-1 p-3 rounded-sm bg-neutral-100">
          <span class="text-left text-base font-medium text-neutral-900">{{ issue.title }}</span>
          <span v-if="issue.description" class="text-left text-sm font-normal text-neutral-500 ml-3">{{ issue.description
          }}</span>
          <span v-else class="text-left text-sm font-normal text-neutral-500 ml-3">No description provided</span>
          <button type="button" class="self-end" @click="showUpdateDialog(issue.id)">Update</button>
          <button type="button" class="self-end" @click="deleteIssue(issue.id)">Delete</button>
        </div>
      </div>
    </div>

    <div v-if="isUpdateDialogShown"
      class="flex flex-col items-center justify-center fixed inset-0 z-10 bg-neutral-900/30">
      <div class="flex flex-col bg-white p-4 w-96 gap-5">
        <input v-model="updateTitle" placeholder="Enter title" />
        <textarea v-model="updateDescription" placeholder="Enter description(optional)"></textarea>
        <div class="flex flex-row justify-end gap-3">
          <button type="button" @click="hideUpdateDialog">Close</button>
          <button type="button" @click="updateIssue">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>
