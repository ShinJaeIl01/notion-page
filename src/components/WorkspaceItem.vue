<template>
  <li>
    <RouterLink :to="`/workspaces/${workspace.id}`">
      {{ workspace.title || '제목 없음' }}
    </RouterLink>
    <button @click="workspaceStore.createWorkspace({ parentId: workspace.id })">
      O
    </button>
    <button @click="workspaceStore.deleteWorkspace(workspace.id)">
      X
    </button>

    <ul v-if="workspace.children">
      <WorkspaceItem
        v-for="ws in workspace.children"
        :key="ws.id"
        :workspace="ws" />
    </ul>
  </li>
</template>

<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'


export default {
  props: {
    workspace: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapStores(useWorkspaceStore)
  }
}
</script>
