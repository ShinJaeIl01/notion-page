import { defineStore } from 'pinia'
 
// 모듈의 이름을 문자로 넣어준다
export const useWorkspaceStore = defineStore('workspace', {
  state() {
    return {

    }
  },
  getters: {

  },
  actions: {
    //CRUD
    async createWorkspace() {
      // fetch(url, options)
      // fetch('skdfnasnf.com', {
      //   method: 'POST'
      // })
      const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'ShinJaeIL'
        },
        body: JSON.stringify({ // body 부분에 문자화해야한다.
          // parentId: '',
          title: '처음 만들어 봅니다.',
          content: '내용은 글쎄요..',
          // poster: ''
        })
      })
      const workspace = await res.json()
      console.log(workspace)
    }
  }
})
