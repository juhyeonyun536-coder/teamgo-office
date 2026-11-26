TEAM GO Office Calendar
1. public/index.html을 열면 개인 미리보기(브라우저 저장)가 됩니다.
2. 공유 배포: ZIP 압축을 풀고 전체 폴더 내용을 GitHub 저장소에 업로드한 후 Netlify에서 Import an existing project로 연결하세요. publish는 public, functions는 netlify/functions입니다. 또는 Node.js 설치 후 이 폴더에서 npm install, npx netlify-cli login, npx netlify-cli deploy --prod --build 실행하고 기존 사이트를 선택하세요.
3. 단순 HTML 드래그 앤 드롭은 서버 기능을 설치하지 않습니다.
4. 새 저장소(teamgo-office-v2)를 사용하므로 기존 데이터는 자동 이전되지 않습니다. 기존 사이트 인증 설정도 별도로 해제해야 할 수 있습니다.
5. 로그인 없는 공개 사이트로, URL을 아는 누구나 조회/수정/삭제할 수 있습니다. 민감한 업무 정보는 입력하지 마세요. 동기화는 15초 간격입니다. 동시 회의 예약은 경합 가능성이 있습니다.
