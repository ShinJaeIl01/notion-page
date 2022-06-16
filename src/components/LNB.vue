<template>
  <nav>
    <div class="header">
      Oimne's Notion
    </div>
    <ul class="workspaces">
      <WorkspaceItem
        v-for="workspace in workspaceStore.workspaces"
        :key="workspace.id"
        :workspace="workspace" />
    </ul>
    <div class="actions">
      <button>+ 새로운 페이지</button>
    </div>
  </nav>
</template>

<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'
import WorkspaceItem from '~/components/WorkspaceItem.vue'

export default {
  components: {
    WorkspaceItem
  },
  computed: {
    ...mapStores([useWorkspaceStore])
  },
  created() {
    this.workspaceStore.readWorkspaces()
  }
}
</script>

<style scoped lang="scss">
@import "~/scss/variables";
nav {
  background-color: $color-background;
  min-width: 160px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  .header {
    height: 48px;
    flex-shrink: 0;
    padding: 14px;
  }
  ul.workspaces {
    flex-grow: 1;
    overflow: auto;
  }
  .actions {
    height: 48px;
    flex-shrink: 0;
    padding: 14px;
    border-top: 1px solid red;
  }
}
</style>
