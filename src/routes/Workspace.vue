<template>
  <h1>일해라 일</h1>
  <button @click="workspaceStore.createWorkspace">
    워크스페이스 생성
  </button>
  <section :key="$route.params.id">
    <h1
      ref="title"
      placeholder="제목없음"
      contenteditable
      @blur="onInput"
      @keydown.prevent.enter="$refs.content.focus()">
      {{ workspaceStore.workspace.title }}
    </h1>
    <p
      ref="content"
      placeholder="내용 입력해라"
      contenteditable
      @blur="onInput"
      v-html="workspaceStore.workspace.content">
    </p>
  </section>

  <div contenteditable>
    oimne_
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'

export default {
  computed: {
    ...mapStores([useWorkspaceStore])
  },
  watch: { // page가 바뀔때 마다
    $route() {
      this.workspaceStore.readWorkspace(this.$route.params.id)
    }
  },
  created() {
    this.workspaceStore.readWorkspace(this.$route.params.id)
  },
  methods: {
    onInput() {
      const title = this.$refs.title.textContent // div와 같은 태그는 빼고 조회할려고
      const content = this.$refs.content.innerHTML

      if(!title.trim()) {
        this.$refs.title.innerHTML = ''
      }

      if(!this.$refs.content.textContent.trim()) {
        this.$refs.content.innerHTML = ''
      }

      this.workspaceStore.updateWorkspace({
        id: this.$route.params.id,
        title,
        content
      })
    }
  }
}
</script>

<style scoped lang="scss">
[contenteditable] {
  &:empty::before {
    content: attr(placeholder);
    color: tomato
  }
}
</style>
