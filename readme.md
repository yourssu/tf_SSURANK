```
.
|-- netlify.toml                 // 초기 netlify 배포를 위한 설정파일
|-- package-lock.json
|-- package.json
|-- src
|   |-- client
|   |   `-- Root.js               // GA 코드 여기있음
|   |-- components                // 공통 컴포넌트는 바로 하위에, 개별 사용은 폴더별로 분리함
|   |   |-- API
|   |   |   `-- Api.jsx
|   |   |-- Banner.jsx            // 배너
|   |   |-- Button.jsx            // 버튼
|   |   |-- CommentBox.jsx        // 댓글 박스
|   |   |-- CommentList.jsx       // 댓글 목록
|   |   |-- Content.css           // 컴포넌트별 css 총 집합체..
|   |   |-- Divider.jsx           // 디바이더
|   |   |-- Footer.css            // 푸터 css
|   |   |-- Footer.js             // 푸터
|   |   |-- Loading.js            // 로딩
|   |   |-- Logo.jsx              // 로고
|   |   |-- Nav.css               // 상단바 css
|   |   |-- Nav.js                // 상단바
|   |   |-- NoResult.jsx          // 결과 없음
|   |   |-- PropDropdown.js       // Dropdown 블럭
|   |   |-- RecentComment.jsx     // 최신 한줄평
|   |   |-- SearchBox.js          // 검색 박스
|   |   |-- SearchList.js         // 검색 결과 목록
|   |   |-- class                 // 강의평가
|   |   |   |-- Header.jsx        // 강의평가 상세뷰 전용 헤더
|   |   |   `-- HistoryGraph.jsx  // 강의평가 히스토리 그래프
|   |   `-- prof
|   |       |-- ClassList.jsx     // 강의개설 목록
|   |       |-- Dropdown.jsx      // 더보기 버튼
|   |       |-- Header.jsx        // 교수평가 상세뷰 전용 헤더
|   |       |-- RankingList.jsx   // 명예의 전당 목록
|   |       `-- RecentClass.jsx   // 최근 개설 강의 목록
|   |-- index.js
|   |-- lib
|   |-- pages
|   |   |-- ClassHome.js         // 강의 페이지
|   |   |-- Credit.jsx           // 만든 사람들
|   |   |-- Modal.jsx            // 모달
|   |   |-- ProHome.js           // 교수 페이지
|   |   |-- Ranking.js           // 학과별 교수 랭킹
|   |   |-- Search.js            // 검색 결과
|   |   |-- View.jsx             // 강의평가 상세보기
|   |   |-- ViewProf.jsx         // 교수평가 상세보기
|   |   `-- index.js             // Routes 사용을 위해 위 페이지를 모아둔곳
|   |-- server
|   `-- shared
|       |-- App.css
|       `-- App.js               // 라우터
|-- webpack.config.js
|-- yarn-error.log
`-- yarn.lock

10 directories, 45 files
```

해야할일

axios default 설정 (헤더 기본설정)
api 모듈화
recoil 토큰 들고오는 atom 만들기
recoil 하는김에 professor/class state 갖고오는 리코일도 만들면 좋을듯?
