# Wiki

## Prettier 설정

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

## lint 설정

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

## ESLint 에러 확인

```json
npm run lint

"lint": "eslint ./src/**/*.{ts,tsx,js,jsx}",

```

## ESLint 에러 자동 수정

```json
npm run lint:fix

"lint:fix": "eslint --fix ./src/**/*.{ts,tsx,js,jsx}"
```
