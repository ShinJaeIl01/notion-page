<template>
  <header>
  </header>
</template>

<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'

export default {
  computed: {
    ...mapStores(useWorkspaceStore)
  },
  mounted() {
    this.workspaceStore.findWorkspacePath()
    console.log('currentWorkspacePath', this.workspaceStore.currentWorkspacePath)
  }
}
</script>
