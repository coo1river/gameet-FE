![녹화_2025_07_15_23_08_55_514](https://github.com/user-attachments/assets/c9370e2a-fd89-4219-a372-68eef4abba0e)# 👾Gameet👾

## 프로젝트 소개
![겜밋 목업](https://github.com/user-attachments/assets/efa8d531-9d6d-4f9b-9463-1a5888b3ece7)

**GAMEET**은 선호하는 게임 장르와 스타일이 맞는 **게이머를 실시간으로 매칭**해 주는 웹 서비스입니다.  <br>
매칭된 친구와 채팅을 통해 어떤 게임을 할 지 이야기를 나눠 보세요.


**[GAMEET 바로 가기🔗](https://gameet.vercel.app/)**
```
Test ID : happy@gameet.com
Test PW : test!234
```


## 프로젝트 실행 방법

```bash
pnpm install // 패키지 설치
pnpm dev // 프로젝트 실행 (localhost:8000)
pnpm storybook // 스토리북 실행
```

## 기술 스택

|        범주         |                   기술                    |
| :-----------------: | :---------------------------------------: |
|    **Language**     |          JavaScript, TypeScript           |
|    **FrameWork**    |                  Next.js                  |
|     **Styling**     |              Tailwind CSS, HeroUI         |
|      **State**      |          Zustand, TanStack Query          |
|      **Form**       |              React Hook Form              |
|   **Lint/Format**   | ESLint (`next/core-web-vitals`), Prettier |
| **Package Manager** |                   pnpm                    |
|      **Test**       |                 Storybook                 |

## 폴더 구조

```
📁 gameet-fe
 ┗ 📁 public
 ┗ 📁 src
   ┣ 📁 app
   ┃ ┣ 📁 api             # axios 인스턴스, 공통 API 연결 로직, 소켓 연결 로직
   ┃ ┣ 📁 chat
   ┃ ┣ 📁 find-password
   ┃ ┣ 📁 login
   ┃ ┣ 📁 match
   ┃ ┣ 📁 profile
   ┃ ┣ 📁 signup         
   ┃ ┣ ⚙️ layout.tsx      # 최상위 layout
   ┃ ┣ ⚙️ page.tsx
   ┃ ┗ ⚙️ providers.tsx
   ┃ ┗ 📁 components      # 재사용 가능한 UI 컴포넌트
   ┃ ┃ ┣ 📁 auth        # 인증 컴포넌트
   ┃ ┃ ┣ 📁 common      # 공통 컴포넌트
   ┃ ┃ ┣ 📁 form        # 폼 컴포넌트
   ┃ ┃ ┣ 📁 layout      # 레이아웃 컴포넌트
   ┃ ┃ ┣ 📁 nav         # 네비게이션 컴포넌트
   ┃ ┃ ┗ 📁 pages       # 페이지 별 컴포넌트
   ┃ ┃ ┃ ┣ 📁 appointment
   ┃ ┃ ┃ ┣ 📁 chat
   ┃ ┃ ┃ ┣ 📁 findPassword
   ┃ ┃ ┃ ┣ 📁 login
   ┃ ┃ ┃ ┣ 🏠 main
   ┃ ┃ ┃ ┣ 📁 mannerEvaluation
   ┃ ┃ ┃ ┣ 📁 match
   ┃ ┃ ┃ ┣ 📁 profile
   ┃ ┃ ┃ ┣ 📁 report
   ┃ ┃ ┃ ┗ 📁 signup
   ┣ 📁 constants         # 전역 상수
   ┣ 📁 hooks             # 커스텀 React Hooks
   ┣ 📁 store             # Zustand 전역 상태 관리
   ┣ 📁 stories           # Storybook 공통 스토리
   ┣ 📁 styles            # tailwind 공통 스타일
   ┣ 📁 types             # TypeScript 타입
   ┗ 📁 utils             # 그 외 유틸리티
 ┗ 📄 .env.local
 ┗ 📄 .eslintrc.js
 ┗ 📄 .gitignore
 ┗ 📄 .npmrc
 ┗ 📄 .prettierrc.js
 ┗ 📄 next.config.ts
 ┗ 📄 package.json
 ┗ 📄 pnpm-lock.yaml
 ┗ 📄 tailwind.config.ts
   ```

## 기능 소개

### 🖥️ 메인
![녹화_2025_06_23_03_33_25_483](https://github.com/user-attachments/assets/b6742bca-4b1a-432f-b0ad-5d6486cad89c)

### 🖥️ 회원가입
![캡처_2025_06_23_03_32_07_331](https://github.com/user-attachments/assets/31a7f88b-256d-42c8-a628-7e4d1551b1b7)

### 🖥️ 로그인
![녹화_2025_07_15_22_58_19_204](https://github.com/user-attachments/assets/81740eb2-e253-4b6f-85a2-9c7be4ce446b)

### 🖥️ 매칭하기
![녹화_2025_06_23_03_38_25_468](https://github.com/user-attachments/assets/5edec5b2-15ed-4bd4-abf4-4b28086a5d31)

### 🖥️ 매칭 완료 및 채팅방 연결
![녹화_2025_07_15_23_07_42_618](https://github.com/user-attachments/assets/8d86f571-af26-476b-a140-45f20f5f7a75)

### 🖥️ 채팅방 내 상대 정보 & 약속 잡기
![녹화_2025_07_15_23_09_34_753](https://github.com/user-attachments/assets/a06e2081-25e3-4ac5-828c-8423dac108a3)


## 커밋/브랜치 컨벤션

| 타입       | 설명                                  | 예시                                    |
| :--------- | :------------------------------------ | :-------------------------------------- |
| `Feat`     | 새로운 기능 추가                      | `Feat: 회원가입 기능 구현`              |
| `Fix`      | 버그 수정                             | `Fix: 로그인 시 인증 오류 수정`         |
| `Remove`   | 기능/코드/파일 삭제                   | `Remove: README.md 삭제`                |
| `Refactor` | 코드 리팩토링                         | `Refactor: 컴포넌트 props 구조 정리`    |
| `Style`    | 코드 스타일 수정                      | `Style: 세미콜론 제거 및 줄 정리`       |
| `Docs`     | 문서 작성 및 수정                     | `Docs: README에 기술 스택 추가`         |
| `Test`     | 테스트 코드 추가 및 수정              | `Test: 로그인 테스트 케이스 추가`       |
| `Chore`    | 기타 변경사항 (패키지, 설정, 빌드 등) | `Chore: ESLint 설정 및 패키지 업데이트` |

### 브랜치 컨벤션

```bash
git branch // main 브랜치인지 확인
git checkout -b "Docs/1" ("커밋컨벤션/이슈번호")
```

### 커밋 메시지 예시

```bash
git commit -m "Feat: 기능 추가"
git commit -m "Fix: 레이아웃 깨지는 이슈 수정"
git commit -m "Docs: README에 프로젝트 구조 설명 추가"
```

## 문제 상황(해결 여부)
