# About Frontend

### 🎨Tally의 공통 Deisign을 정리한 내용입니다!

- [Font](#font)
- Icon
- [Color](#color)
- Component

## Font

### Font Familiy

[Pretendard](https://cactus.tistory.com/306)

### Font Size

![image](https://github.com/KimSeonHui/Algorithm-Problems/assets/44824456/ae570a25-3746-4742-a524-03bd0ce5ba91)

### Font Weight

![image](https://github.com/DagonLee/DagonLee/assets/43575986/2ac19780-0116-4bc8-b651-098bfeb59cfb)

<br />

## Color

### Point Color

![image](https://github.com/KimSeonHui/Algorithm-Problems/assets/44824456/35255bb3-f6d1-4568-8a3f-a15665f51195)

### GrayScale

![image](https://github.com/KimSeonHui/Algorithm-Problems/assets/44824456/23ecfa53-2a4d-40d2-89e9-95943e5255aa)

### Button Style

![image](https://github.com/FOR-MY-EGG/ForMyEgg/assets/18045556/b81f4a14-de8f-4c79-afde-8927d903e2cb)

<br /><br />

# Frontend Team Role

- 이희정 : 메인페이지, 계좌 관리, 이체 UX / UI 설계 및 개발
- 이다곤 : 정산 및 분석 페이지 UX/UI 설계 및 개발
- 김선희 : 소셜 로그인, 여행지 관리, 상세 내역 UX / UI 설계 및 개발

<br /><br />

# Frontend Skill

<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Recoil-3578E5?style=flat&logo=recoil&logoColor=white"/>
<br /><br />
<br /><br />

# Prettier 설정

```json
{
  "singleQuote": true,
  "parser": "typescript",
  "semi": true,
  "useTabs": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

### 저장 시 Prettier 자동 적용

1. File → Preferences → Settings
2. Settings에서 `Format On Save` 검색 후 체크
   ![Untitled (2)](https://github.com/KimSeonHui/cs-study/assets/44824456/2a585830-e3e3-4f19-a8cb-f8123f061739)
3. Settings에서 `Default Formatter` 검색 후 Default Formatter selectbox에서 prettier 선택
   ![Untitled (1)](https://github.com/KimSeonHui/cs-study/assets/44824456/7d216bb0-7873-48e8-afae-15f24bd8eb02)

<br /><br />

# lint 설정

```json
{
  // 해당 환경에서 정의된 함수/전역 변수 사용 가능
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  // 적용할 규칙들 추가
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "airbnb/hooks",
    "airbnb-typescript",
    "prettier"
  ],
  // eslint가 구문분석할 때 사용하는 parser 설정
  "parser": "@typescript-eslint/parser",
  // 자바스크립트 언어 옵션 지정
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["./tsconfig.json"] // typscript로 파싱 가능하도록 설정
  },
  // 다른 사람이 만든 규칙 가져올 수 있음
  "plugins": ["react", "@typescript-eslint"],
  // plugin 규칙 커스텀 가능
  "rules": {
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
          "type",
          "unknown"
        ],
        "pathGroups": [
          {
            "pattern": "{react*, react*/**}",
            "group": "external",
            "position": "before"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  }
}
```

# ESLint 에러 확인

```json
npm run lint

"lint": "eslint ./src/**/*.{ts,tsx,js,jsx}",

```

# ESLint 에러 자동 수정

```json
npm run lint:fix

"lint:fix": "eslint --fix ./src/**/*.{ts,tsx,js,jsx}"
```
