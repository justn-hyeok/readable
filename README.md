# Readable

TypeScript 기반 웹 접근성 개선 Chrome Extension

## 프로젝트 구조

Clean Architecture 패턴을 따르는 계층형 구조:

```
readable/
├── src/
│   ├── domain/           # 비즈니스 로직 (외부 의존성 없음)
│   │   ├── entities/     # 도메인 엔티티
│   │   ├── rules/        # 접근성 규칙
│   │   └── interfaces/   # 도메인 인터페이스
│   │
│   ├── application/      # 유스케이스 및 서비스
│   │   ├── services/     # 애플리케이션 서비스
│   │   └── useCases/     # 유스케이스
│   │
│   ├── infrastructure/   # 외부 시스템 구현
│   │   ├── dom/          # DOM 어댑터
│   │   └── ai/           # AI 모델 어댑터
│   │
│   ├── interfaces/       # UI 및 외부 인터페이스
│   │   ├── content/      # Content Script
│   │   ├── background/   # Background Service Worker
│   │   ├── popup/        # Popup UI
│   │   └── shared/       # 공유 유틸리티
│   │
│   └── utils/            # 공통 유틸리티
│
├── public/               # 정적 리소스
│   ├── manifest.json     # Extension 설정
│   ├── popup.html        # Popup HTML
│   └── icons/            # 아이콘 파일들
│
└── tests/                # 테스트
    └── unit/
```

## 기술 스택

- **언어**: TypeScript
- **빌드**: Vite
- **테스트**: Vitest
- **Extension API**: Manifest V3

## 설치 및 실행

### 1. 의존성 설치

```bash
pnpm i
```

### 2. 개발 빌드

```bash
pnpm dev
```

### 3. 프로덕션 빌드

```bash
pnpm build
```

### 4. Chrome에 로드

1. Chrome 주소창에 `chrome://extensions/` 입력
2. 우측 상단의 "개발자 모드" 활성화
3. "압축해제된 확장 프로그램을 로드합니다" 클릭
4. `dist/` 폴더 선택

## 주요 기능

- **접근성 검사**: 웹 페이지의 접근성 이슈 탐지
- **자동 개선**: AI 기반 대체 텍스트 자동 생성 (구현 예정)

## 개발 가이드

### 레이어별 규칙

#### Domain Layer (`src/domain/`)
- ✅ 순수 TypeScript만 사용
- ❌ 외부 의존성 금지 (window, document, chrome, fetch 등)
- ❌ 프레임워크/라이브러리 import 금지

#### Application Layer (`src/application/`)
- ✅ Domain 인터페이스에 의존
- ✅ 비즈니스 로직 조율
- ❌ 직접적인 DOM/API 접근 금지

#### Infrastructure Layer (`src/infrastructure/`)
- ✅ 외부 시스템 구현 (DOM, API, AI 등)
- ✅ Domain 인터페이스 구현
- ✅ 외부 라이브러리 사용 가능

#### Interfaces Layer (`src/interfaces/`)
- ✅ Chrome Extension API 사용
- ✅ UI 로직
- ✅ 메시지 통신

### 테스트 실행

```bash
pnpm test
```

### 타입 체크

```bash
pnpm type-check
```

## 라이센스

MIT

## 기여

배포 후 기여 받습니다. 현재는 안 받음
