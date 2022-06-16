import { defineStore } from 'pinia'
// import router from '~/routes'
 
// 모듈의 이름을 문자로 넣어준다
export const useWorkspaceStore = defineStore('workspace', {
  state() {
    return {
      workspace: {},
      workspaces: [],
      workspacesLoaded: false,
      currentWorkspacePath: []
    }
  },
  getters: {

  },
  actions: {
    //C
    async createWorkspace(payload = {}) {
      const { parentId } = payload
      // fetch(url, options)
      // fetch('skdfnasnf.com', {
      //   method: 'POST'
      // })
      const workspace = await request({  // 전역 함수request를 활용해서 코드 깔끔히한다.
        method: 'POST',
        body: { // body 부분에 문자화해야한다.
          parentId,
          title: ''
        }
      })
      this.readWorkspaces()
      // this.$router.push('/login')과 같다.
      // router.push(`/workspaces/${workspace.id}`) 피니아 문제가 있으므로 전역객체를 활용
      window.location.href = `/workspaces/${workspace.id}`
    },
    // R
    async readWorkspaces() {
      const workspaces = await request({
        method: 'GET',
      })

      this.workspaces = workspaces
      this.workspacesLoaded = true

      if(!this.workspaces.length) { // 불러왔는데 데이터가 없으면 하나 만들어
        this.createWorkspace()
      }
    },
    async readWorkspace(id) {
      const workspace = await request({
        method: 'GET',
        id
      })
      this.workspace = workspace
    },
    // U
    async updateWorkspace(payload) {
      const { id, title, content, poster } = payload
      const updatedWorkspace = await request({
        method: 'PUT',
        id,
        body: { // body에 담기위해 문자화시키기
          title,
          content,
          poster
        }
      })
      this.workspace = updatedWorkspace
      this.readWorkspaces()
    },
    // D
    async deleteWorkspace(id) {
      await request({
        method: 'DELETE',
        id
      })
      // 첫번째 방법: id를 활용해서 workspaces 목록에서 해당되는 목록만 지우기 (최적화 방법, 대신 살짝 복잡하다)
      // 두번째 방법: 서버에서 목록을 다시 가져와 (코드짜기 편하다) - 이걸로 진행
      this.readWorkspaces()
    },
    findWorkspacePath(currentWorkspaceId) {
      const find = (workspace, parents) => { // function find 변수가 아니라 함수 find일때 왜 오류? 못읽는 이유가 뭘까
        // 특정 경로 조회
        if(currentWorkspaceId === workspace.id) {
          this.currentWorkspacePath = [...parents, workspace]
        }

        // 모든 경로 조회
        if(workspace.children) {
          workspace.children.forEach(ws => {
            find(ws, [...parents, workspace])
          })
        }
      }
      // workspaces 초기화 값은 빈 배열
      this.workspaces.forEach(workspace => {
        find(workspace, [])
      })

    }
    // findWorkspacePath() {
    //   function find(workspace, parents = []) {
    //     const id = '1-2-1'
    //     if (id === workspace.id) {
    //       this.currentWorkspacePath = [...parents, workspace]
    //     }
    //     if (workspace.children) {
    //       workspace.children.forEach(ws => {
    //         find(ws, [...parents, workspace])
    //       })
    //     }
    //   }
    //   this.workspaces.forEach(ws => {
    //     find(ws)
    //   })
    // }
    
  }
})

async function request(options) {
  const { id = '', method, body } = options
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`, {
    method,
    headers: {  // 요청 정보
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202204',
      'username': 'ShinJaeIL'
    },
    body: JSON.stringify(body)
  })
  return res.json()
}
