CNINE 일정표 INLINE 패키지

구성
- ygosu_paste_INLINE.txt : 와고 글 본문에 붙여넣는 버전. iframe 사용 안 함.
- cnine_schedule.html : 외부 전체 페이지 확인용.
- data/schedule.json : 일정 데이터 저장 파일.
- netlify/functions/save-schedule.js : 저장/비밀번호 변경 서버 함수.
- assets/cnine_logo_fallback.svg : 로고 대체 파일.

사용 순서
1) 폴더 전체를 GitHub 저장소에 올림.
2) Netlify에 연결해서 배포.
3) ygosu_paste_INLINE.txt 열기.
4) https://YOUR_NETLIFY_URL 를 실제 Netlify 주소로 전체 바꾸기.
5) 와이고수 글 본문에 붙여넣기.

로고
- 기본 로고 URL: https://keyman1335-maker.github.io/poong-rank/assets/crew_logos/cninelogo.png?v=9999
- 안 뜨면 data/schedule.json 의 settings.logoUrl 값을 실제 로고 주소로 바꾸면 됨.

저장 방식
- 첫 저장 때 입력한 비밀번호가 관리자 비밀번호로 등록됨.
- 이후 같은 비밀번호를 아는 사람은 누구나 수정 가능.
- 저장하면 Netlify function이 data/schedule.json을 갱신함.

주의
- 와고가 script 태그까지 막는 게시판이면 INLINE 수정 기능도 막힘. 그 경우에는 외부 페이지 링크형만 가능.
