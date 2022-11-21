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
- [x] Modal 스크롤 개선
- [x] Banner, Modal 연결
- [x] Slider Prev, Next 버튼 배치 조절
- [x] Prev 버튼 초기 비활성화
- [x] Overlay, Modal 이벤트 중복 해결
- [x] api 이미지가 존재하지 않는 경우 default 이미지로 대체
- [x] Banner 컴포넌트 반응형 작업

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

- Slider 컴포넌트 내에 있는 Modal을 별도 컴포넌트로 분리

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

> ### 4. Modal 스크롤 개선

- (기존) Modal을 position: fixed로 고정하고 화면 정중앙에 배치했으나, Modal이 화면보다 긴 경우 Modal 콘텐츠가 짤림, Modal은 스크롤 되지 않고 Modal 뒷배경만 스크롤 됨
  <br>
- (개선) Overlay 안에 Modal을 배치하고 Overlay는 스크롤 가능하게 설정, Modal이 열리면 뒷배경은 스크롤 되지 않도록 body에 overflow-y: hidden 속성 부여

<br>

> ### 4-1. Modal 이벤트 버블링 해결

- (문제) Modal 내부 클릭시 Overlay의 닫기 이벤트가 발생함(Modal이 Overlay의 자식 컴포넌트이기 때문에)
  <br>
- (해결) Modal onClick 이벤트 핸들러에 stopPropagation을 추가하여, Modal 클릭시 부모 이벤트가 발생하지 않도록 함 (버블링 방지)

<br>

> ### 5. Banner와 Modal 연결

- Banner 버튼 클릭 시 해당 콘텐츠 URL로 이동
  <br>
- URL에서 콘텐츠 id를 추출하여 API를 통해 데이터를 받은 후 Modal 오픈

<br>

> ### 6. Slider Prev, Next 버튼 위치 조절

- (기존) Slider의 Prev, Next 버튼이 Slider 수직 가운데에 위치하지 않음(썸네일 높이가 화면 너비에 따라 변하기 때문에)
  <br>
- (개선) useEffect를 통해 화면 너비에 따라 변하는 썸네일 높이를 감지하여 Slider 높이로 지정한 후, Prev, Next 버튼을 수직 가운데 배치함

<br>

> ### 7. Prev 버튼 초기 비활성화

- 초기에는 Prev 버튼을 감추고, Next 버튼 클릭 시 Prev 버튼을 표시함

```javascript
  const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(true);

   const increaseIndex = () => {
    if (list) {
      if (moving) return;
      setIsPrevBtnDisabled(false);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      setMoving(true);
    }
  };

 <PrevBtn onClick={decreaseIndex} disabled={isPrevBtnDisabled}>
```

<br>

> ### 8. api 이미지가 없는 경우 기본 이미지 표시

- 삼항연산자를 통해 backdrop_path가 존재하지 않는 경우 기본 이미지를 표시함

```javascript
<Backdrop
  bg={details.backdrop_path ? getImgPath(details.backdrop_path) : noImg}
/>
```

<br>

> ### 9. Banner 컴포넌트 반응형 작업

- Media Query를 이용하여 화면 크기에 따라 display, width 속성 조절

```css
const Container = styled.div`
  @media screen and (max-width: 1024px) {
    width: 50%;
  }
  @media screen and (max-width: 576px) {
    width: 80%;
  }
`;

const Overview = styled.p`
  @media screen and (max-width: 960px) {
    display: none;
  }
`;
```
