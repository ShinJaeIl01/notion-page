<template>
  <h1>일해라 일</h1>
  <button @click="workspaceStore.createWorkspace">
    두둥칫
  </button>
</template>

<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'

export default {
  computed: {
    ...mapStores([useWorkspaceStore])
  }
}
</script>
