<template>
  <header>
    헤더입니다
    <ul>
      <li
        v-for="path in workspaceStore.currentWorkspacePath"
        :key="path.id">
        <RouterLink :to="`/workspaces/${path.id}`">
          {{ path.title || '제목 없음' }}
        </RouterLink>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'

export default {
  computed: {
    ...mapStores(useWorkspaceStore),
    workspacesLoaded() {
      return this.workspaceStore.workspacesLoaded
    }
  },
  watch: {
    workspacesLoaded(value) {  // workspacesLoaded의 값이 변하면 실행
      value && this.workspaceStore.findWorkspacePath(this.$route.params.id)
    },
    $route() {
      this.workspaceStore.findWorkspacePath(this.$route.params.id)
    }
  }
}
</script>
