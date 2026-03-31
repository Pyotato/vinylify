# [Vinylify](https://vinylify-tau.vercel.app/)

바이닐 레코드처럼, 음악을 새기다

<p align="center">
<a href="https://vinylify-tau.vercel.app/">
<img width="168"  alt="image"  src="https://github.com/user-attachments/assets/23090b17-17ea-4aa4-a826-238a1398bb96"/></a>
</p>

Spotify API를 활용해 나의 Top 트랙과 추천 음악을 탐색하고,<br/>
가사와 아티스트 정보까지 한 화면에서 즐길 수 있는 Spotify 웹 클라이언트 프로젝트.

## 기술스택 :

클라이언트

- React : 컴포넌트 기반의 UI 라이브러리로, 풍부한 생태계와 높은 자율성을 바탕으로 구조적인 UI를 설계하기에 적합하다고 판단하여 선택했습니다.

- TypeScript : 정적 타입 검사를 통한 안정성 확보와, 타입 인텔리센스를 통한 개발 생산성 향상을 위해 사용했습니다.

- SASS -> Tailwind CSS : 기존에 사용하던 Sass 대신 Tailwind CSS v4를 도입했습니다. @theme 블록에서 디자인 토큰을 CSS 변수로 정의하면 유틸리티 클래스가 자동 생성되어 별도의 변수 파일 관리가 필요 없어졌고, 스타일을 JSX와 같은 파일에서 작성할 수 있어 컴포넌트가 많은 구조에서 파일 전환 비용을 줄였습니다. 또한 사용한 클래스만 번들에 포함되는 트리쉐이킹으로 Sass 대비 CSS 번들 크기를 최소화했습니다.

- React Router DOM : SPA에서 페이지 전환을 관리하기 위해 사용했습니다. React.lazy와 결합해 페이지 단위의 코드 스플리팅을 선언적으로 구현할 수 있었습니다.

기능 구현에 사용한 도구

- ky : fetch API 기반의 경량 HTTP 클라이언트로, axios에 비해 번들 크기가 작고 인터셉터 구조가 간결하여 선택했습니다. afterResponse 훅을 활용해 API 오류를 중앙에서 일관되게 처리할 수 있었습니다.
- Zustand : 전역 토스트 상태 관리를 위해 사용했습니다. React Context 대비 보일러플레이트가 적고, 컴포넌트 외부에서도 스토어에 직접 접근할 수 있어 토스트 팩토리 패턴과 자연스럽게 결합할 수 있었습니다. 팩토리 ID별로 활성 토스트를 추적하며, dismissAllExcept를 통해 특정 화면 전환 시 컨텍스트 토스트만 제거하고 전역 토스트는 유지할 수 있도록 설계했습니다.
- TanStack Virtual : 검색 결과처럼 수백 개의 아이템이 한 번에 렌더링될 수 있는 리스트에서, DOM에 실제로 보이는 요소만 렌더링하는 가상화를 적용하기 위해 사용했습니다. 행·열을 모두 가상화하는 2D 그리드 구현에 활용했습니다.
- TanStack Query : 서버 상태와 클라이언트 상태를 명확히 분리하여 관리하기 위해 사용했습니다. 캐싱, 자동 리패칭, 로딩·에러 상태 관리 등을 선언적으로 처리할 수 있어, 직접 useEffect로 비동기 로직을 다루는 것보다 훨씬 간결하고 안정적인 코드를 작성할 수 있었습니다.

에러 트래킹에 사용한 도구 :

- Sentry : 프로덕션 환경에서 발생하는 에러를 실시간으로 트래킹하기 위해 사용했습니다. 개발 환경에서는 비활성화하여 노이즈를 줄이고, sourcemap을 활용해 minified된 코드에서도 에러 발생 위치를 정확히 파악할 수 있도록 했습니다.

빌드 도구 :

- Vite : 빠른 HMR과 ES Module 기반의 번들링을 위해 사용했습니다. rollup-plugin-visualizer를 통해 빌드 결과물의 번들 사이즈를 시각적으로 분석할 수 있었습니다.

배포 :

- Vercel : 별도의 서버 설정 없이 GitHub 연동만으로 CI/CD를 구성할 수 있고, 프론트엔드 프로젝트에 최적화된 배포 환경을 제공하기 때문에 선택했습니다.

## 기능소개 :

[📼 데모 영상](https://www.youtube.com/watch?v=1u26NxKxHNQ)

| 기능                                    | 스크린샷                                                                                                                                                                                                                                                        |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 로그인                                  | <img width="70%" alt="image" src="https://github.com/user-attachments/assets/5631bf40-ebe7-4a96-99f1-2042c12bbeed"/>                                                                                                                                            |
| 메인                                    | <img width="70%" src="https://github.com/user-attachments/assets/ad161279-98f4-4cb1-832d-6890049a3cd8"/>                                                                                                                                                        |
| 현재 재생 곡                            | <img width="70%" src="https://github.com/user-attachments/assets/d6416dfe-971b-4bc0-be3f-60b33568a170"/>                                                                                                                                                        |
| 앨범, 아티스트, 트랙, 플레이리스트 검색 | <div width="100%" style="display:inline-flex;"><img width="45%" src="https://github.com/user-attachments/assets/ce97a35e-3098-4736-b32e-3446b9fdd47c"/><img width="45%" src="https://github.com/user-attachments/assets/ab0b385f-3f08-4742-b8ec-6a4ba959dc61"/> |

## ✨ 자랑하고 싶은 내용

### TanStack Query를 활용한 도메인별 쿼리 훅 설계 :

API 호출 로직을 컴포넌트에서 완전히 분리하고, 도메인(track / artist / search)별로 쿼리 훅을 구성했습니다. 모든 쿼리 훅은 공통 CONFIG를 참조해 일관된 retry / throwOnError 정책을 따르도록 설계했습니다.

retry 정책의 경우 401, 403, 429 상태는 재시도하지 않고, 408(타임아웃) 등의 일시적 오류에 대해서만 재시도를 허용했습니다. throwOnError 정책은 인증 관련 오류(401, 403)에 한해서만 에러를 ErrorBoundary로 전파하도록 설정하여, 인증 오류일 때는 사용자를 명확한 에러 화면으로 안내하고, 그 외의 오류는 조용히 처리되도록 구분했습니다.

### 중앙화된 에러 핸들링 :

ky의 afterResponse 훅을 활용해 모든 API 응답의 오류를 handleError 함수에서 일괄 처리하도록 설계했습니다. 각 HTTP 상태 코드에 대응하는 ERROR_NAMES와 ERROR_MESSAGES를 상수로 정의하고, 오류 객체의 name과 message를 통일된 형식으로 교체함으로써 컴포넌트 계층에서는 에러의 출처(Spotify API, OVH, ReccoBeats)에 관계없이 동일한 인터페이스로 에러를 다룰 수 있게 했습니다.

401, 403 오류의 경우 로컬스토리지의 인증 토큰을 즉시 제거하여 만료된 세션이 남아있지 않도록 처리했습니다. ErrorBoundary의 FallbackRender에서도 동일한 ERROR_MESSAGES 상수를 참조하여, 인증 오류일 때는 계정 오류 화면을, 그 외에는 일반 에러 화면을 렌더링하도록 분기했습니다.

### 2D 그리드 가상화 (useGridVirtualizer) :

검색 결과 페이지에서 수백 개의 카드가 그리드 형태로 렌더링될 때, DOM에 과부하가 걸리지 않도록 TanStack Virtual의 행·열 동시 가상화를 적용했습니다. useGridVirtualizer 훅 안에 행(row) virtualizer와 열(column) virtualizer를 함께 구성하고, 현재 뷰포트 너비에 따라 컬럼 수를 동적으로 계산하도록 했습니다.

또한 가상화된 행을 순회하며 이미지 URL을 미리 프리로드함으로써, 스크롤 시 이미지가 늦게 나타나는 현상을 줄였습니다. 무한 스크롤은 마지막으로 보이는 아이템의 인덱스와 전체 아이템 수를 비교해 threshold 이내로 좁혀졌을 때 fetchNextPage를 호출하는 방식으로 구현했습니다.

## 🧐 신경 쓴 부분

### 코드 스플리팅을 통한 초기 로딩 최적화 :

React.lazy와 Suspense를 활용해 페이지 단위와 주요 컴포넌트 단위로 코드 스플리팅을 적용했습니다. 초기 번들에 포함될 필요가 없는 컴포넌트는 사용 시점에 동적으로 로드되도록 하여, 초기 로딩 시간을 줄이고자 했습니다. Skeleton 컴포넌트를 fallback으로 제공해 로딩 중에도 레이아웃이 안정적으로 유지되도록 했습니다.

### 도메인 중심의 폴더 구조 :

atomic 패턴 대신 도메인 중심의 폴더 구조를 선택했습니다. 기능과 도메인 단위로 파일을 묶으면 특정 컴포넌트를 찾을 때 계층적 분류를 먼저 떠올려야 하는 인지 부하가 줄어들고, 관련 파일끼리의 응집도가 높아진다고 판단했기 때문입니다. 범용 UI 요소는 ui 폴더에, 도메인별 컴포넌트는 components 하위에 도메인 이름으로 구분했습니다.

### 절대 경로 임포트 :

@/\* 로 src 디렉터리를 참조하는 절대 경로 임포트를 사용했습니다. 파일이 이동하거나 폴더 구조가 변경될 때 상대 경로(../../../)를 일일이 수정하지 않아도 되어 유지보수 비용을 낮출 수 있었습니다.

### 커밋 컨벤션 자동화 :

Husky와 commitlint를 연동해 커밋 메시지가 Conventional Commits 규격을 따르지 않으면 커밋이 거부되도록 했습니다. 일관된 커밋 히스토리를 유지함으로써 변경 사항의 맥락을 쉽게 파악할 수 있었습니다.

### 반응형 디자인 :

`clamp()` · `max()` 기반의 유동적 CSS 커스텀 프로퍼티를 정의해 뷰포트에 따라 텍스트 크기·이미지 크기·여백·보더 반경이 자동으로 조정되도록 했습니다. 고정 브레이크포인트 대신 fluid 값을 사용함으로써 중간 뷰포트에서도 레이아웃이 자연스럽게 흐르도록 했습니다.

```css
/* fluid typography */
--text-fluid-xl: clamp(var(--text-base), 5vw, var(--text-4xl));
--text-fluid-xs: clamp(0.3rem, 3vw, var(--text-xs));

/* fluid vinyl album cover */
--vinyl-album-fluid: clamp(9rem, 26rem, 28vw);
```

가상화 그리드(`useGridVirtualizer`)는 `useThrottledWindowSize`로 현재 뷰포트 너비를 감지해 컬럼 수를 동적으로 계산합니다. Tailwind의 `sm:` · `md:` · `lg:` 반응형 prefix를 그리드와 레이아웃 컴포넌트 전반에 적용했습니다.

### 웹 접근성 :

- **키보드 탐색** : 모든 버튼과 탭에 `focus-visible` 포커스 인디케이터를 적용해 마우스 없이도 탐색 가능하도록 했습니다.
- **스크린 리더 지원** : 아이콘 전용 버튼에는 `aria-label`로 목적을 설명하고, 장식용 SVG에는 `aria-hidden` + `focusable="false"`를 적용했습니다. 내비게이션 버튼에는 현재 페이지 여부를 `aria-current="page"`로 전달합니다.
- **동적 콘텐츠 알림** : 검색 로딩 상태를 `aria-live="polite"`로 선언해 상태 변화를 스크린 리더에 알립니다.
- **탭 패턴** : 검색 카테고리 탭에 `role="tablist"` · `role="tab"` · `aria-selected`를 적용해 WAI-ARIA 탭 패턴을 준수했습니다.
- **모션 감소 설정 존중** : `@media (prefers-reduced-motion: reduce)` 로 바이닐 회전·캐러셀·네온 애니메이션을 비활성화해 전정 장애가 있는 사용자를 배려했습니다.
