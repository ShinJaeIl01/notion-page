import { defineStore } from 'pinia'
 
// 모듈의 이름을 문자로 넣어준다
export const useWorkspaceStore = defineStore('workspace', {
  state() {
    return {
      workspaces: [],
      workspace: null
    }
  },
  getters: {

  },
  actions: {
    //C
    async createWorkspace() {
      // fetch(url, options)
      // fetch('skdfnasnf.com', {
      //   method: 'POST'
      // })
      const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces', {
        method: 'POST',
        headers: {  // 요청 정보
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
      this.readWorkspaces()
    },
    // R
    async readWorkspaces() {
      const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces', {
        method: 'GET',
        headers: {  // 요청 정보
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'ShinJaeIL'
        }
      })
      const workspaces = await res.json()
      console.log(workspaces)

      this.workspaces = workspaces
    },
    async readWorkspace(id) {
      const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`, {
        method: 'GET',
        headers: {  // 요청 정보
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'ShinJaeIL'
        }
      })
      const workspace = await res.json()
      console.log(workspace)

      this.workspace = workspace
    },
    // U
    async updateWorkspace(payload) {
      const { id, title, content } = payload
      
      await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`, {
        method: 'PUT',
        headers: {  // 요청 정보
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'ShinJaeIL'
        },
        body: JSON.stringify({ // body에 담기위해 문자화시키기
          title,
          content
        })
      })

      this.readWorkspaces()
    },
    // D
    async deleteWorkspace(id) {
      await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`, {
        method: 'DELETE',
        headers: {  // 요청 정보
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'ShinJaeIL'
        }
      })
      // 첫번째 방법: id를 활용해서 workspaces 목록에서 해당되는 목록만 지우기 (최적화 방법, 대신 살짝 복잡하다)
      // 두번째 방법: 서버에서 목록을 다시 가져와 (코드짜기 편하다) - 이걸로 진행
      this.readWorkspaces()
    }
  }
})
