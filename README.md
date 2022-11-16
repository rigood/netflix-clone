<br>

<p align="center">
<img src="./public/assets/logo.png">
</p>

<br>

# 넷플릭스 클론코딩 리팩토링

- [기존 프로젝트 링크](https://rigood.github.io/netflix)
- 리팩토링 결과 링크

<br>

## 목표

### 1) 기존 프로젝트 리팩토링

- [x] 컴포넌트 분리
- [x] API 호출 함수 재사용
- [x] 페이지 하단 빈 공간 관련 레이아웃 개선
- [x] 모달창 스크롤 개선
- [x] 배너, 모달창 연결
- [x] 슬라이더 Prev, Next 버튼 배치 조절
- [x] Prev 버튼 초기 비활성화
- [x] 오버레이, 모달창 이벤트 겹침 해결
- [ ] api 이미지가 존재하지 않는 경우 default 이미지로 대체
- [ ] 화면 작아지면 배너 text 숨기기

### 2) 추가 기능 구현

- [ ] 예고편 유튜브 동영상 삽입
- [ ] 상세정보에 추천/유사 콘텐츠 추가
- [ ] 검색 결과를 무한 스크롤로 구현
- [ ] footer 추가
- [ ] 다국어 지원(KO, EN)

<br>

## 리팩토링 결과

<br>

> ### 1. 컴포넌트 분리

- Slider 컴포넌트 내에 있던 Modal을 별도 컴포넌트로 분리

<br>

> ### 2. API 호출 함수 재사용

- (기존) 섹션, 카테고리마다 API 호출 함수 생성
  <br>
- (개선) URL에 섹션, 카테고리 parameter를 추가하여 함수 재사용

<br>

> ### 3. 페이지 하단 빈 공간 관련 레이아웃 개선

- (기존) Banner 밑에 있는 SliderWrapper를 position: relative로 설정하고 위로 끌어올리니 하단에 빈 공간이 남음
  <br>
- (개선) Banner의 배경화면을 분리해 Background 컴포넌트로 만들고 Background 컴포넌트 내에 Banner, SlideWrapper를 자식 컴포넌트로 배치함
  <br>
- (참고) relative 요소에 margin을 음수(-)로 주면 빈 공간이 사라진다고 함

<br>

> ### 4. 모달창 스크롤 개선

- (기존) 모달창을 position: fixed로 고정하고 화면 정중앙에 배치했으나, 모달창이 화면보다 긴 경우 모달창 콘텐츠가 짤림, 모달창은 스크롤 되지 않고 모달창 뒷배경만 스크롤 됨
  <br>
- (개선) 오버레이 안에 모달창을 배치하고 오버레이는 스크롤 가능하게 설정, 모달창이 열리면 뒷배경은 스크롤 되지 않도록 body에 overflow-y: hidden 속성 부여

<br>

> ### 4-1. 모달창 스크롤 개선 후 발생한 문제 해결

- (문제) 모달창이 오버레이의 자식 컴포넌트이다보니, 모달창을 클릭해도 오버레이 클릭 이벤트가 발생함
  <br>
- (해결) 모달창 onClick 이벤트에 stopPropagation을 추가하여, 모달창 클릭시 부모 이벤트인 오버레이 클릭 이벤트가 발생하지 않도록 함 (버블링 방지)

<br>

> ### 5. 배너, 모달창 연결

- 배너 버튼 클릭 시 해당 콘텐츠의 URL로 이동
  <br>
- URL에서 콘텐츠 id를 추출하여 API를 통해 데이터를 받은 후 모달창 오픈

<br>

> ### 6. 슬라이더 Prev, Next 버튼 위치 조절

- (기존) 썸네일 height와 무관하게 슬라이더 높이를 15vw로 고정한 후 Prev, Next 버튼을 배치하여, 버튼이 썸네일 수직 가운데에 위치하지 않음
  <br>
- (개선) 화면 너비에 따라 유동적으로 변하는 썸네일 height를 useEffect로 감지하여 슬라이더 높이로 지정한 후, Prev, Next 버튼을 수직 가운데 배치함

<br>

> ### 7. Prev 버튼 초기 비활성화

- 초기에는 Prev 버튼을 감추고, Next 버튼 클릭 시 Prev 버튼을 표시함
