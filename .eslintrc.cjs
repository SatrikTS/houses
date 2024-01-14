module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  plugins: [],
  "ignorePatterns": [
    "api",
    "api-templates",
    "node_modules",
    "icons",
    "*.config.ts",
    "utils/validation.ts"
  ],
  "overrides": [
    {
      "files": [
        "*.json",
        "*.json5",
        "*.jsonc",
      ],
      "parser": "jsonc-eslint-parser"
    }
  ],
  rules: {
    "no-secrets/no-secrets": "off",
    "indent": "off",
    "max-len": [
      "warn",
      {
        "code": 300,
        "ignoreComments": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true,
      }
    ],
    "no-else-return": 1,
    "newline-before-return": "off",
    "no-new": "off",
    "space-before-function-paren": "off",
    "eqeqeq": "off",
    "quotes": [
      "error",
      "single"
    ],
    "vue/html-quotes": [ "error", "double", { "avoidEscape": false } ],
    "no-extra-boolean-cast": "off",
    "no-async-promise-executor": "off",
    "no-implicit-coercion": "off",
    "no-useless-escape": "off",
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "import/order": "off",
    "import/no-unresolved": [
      "error",
      {
        "ignore": [
          "\\.vue$",
          "\\.svg$",
          "\\.(scss)$"
        ]
      }
    ],
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/prefer-readonly": "off",
    "@typescript-eslint/promise-function-async": "off",
    "@typescript-eslint/prefer-reduce-type-parameter": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/prefer-ts-expect-error": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/member-ordering": [
      "error",
      {
        "default": [
          "static-field",
          "decorated-field",
          "abstract-field",
          "instance-field",
          "constructor",
          "static-method",
          "instance-method",
          "abstract-method",
          "decorated-method"
        ]
      }
    ],
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/no-invalid-void-type": "off",
    "vue/no-deprecated-slot-attribute": "off",
    "vue/multi-word-component-names": "off",
    "vue/attribute-hyphenation": "off",
    "vue/v-on-event-hyphenatio": "off",
    "vue/v-on-event-hyphenation": "off",
    "unicorn/no-null": "off",
    "unicorn/prefer-code-point": "off",
    "unicorn/numeric-separators-style": "off",
    "unicorn/prefer-export-from": "off",
    "unicorn/prevent-abbreviations": [
      "warn",
      {
        "allowList": {
          "props": true,
          "env": true,
          "e": true,
          "acc": true,
          "el": true,
          "ref": true,
          "args": true,
          "arg": true,
          "params": true,
          "Params": true,
          "Props": true,
          "Ref": true,
          "successMsg": true,
          "updateMsg": true,
          "updateMsgStatus": true,
        }
      }
    ],
    "unicorn/consistent-function-scoping": [
      "error",
      {
        "checkArrowFunctions": false
      }
    ],
    "unicorn/no-array-reduce": "off",
    "prettier/prettier": "off",
    "import/no-named-as-default": "off",
    "sonarjs/no-collapsible-if": "off",
    "sonarjs/no-identical-expressions": "off",
    "unicorn/filename-case": "off",
    "unicorn/explicit-length-check": "off",
    "unicorn/prefer-spread": "off",
    "unicorn/catch-error-name": "off",
    "unicorn/prefer-optional-catch-binding": "off",
    "unicorn/prefer-array-index-of": "off",
    "unicorn/prefer-array-some": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-await-expression-member": "off",
    "unicorn/no-lonely-if": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/prefer-ternary": "off",
    "unicorn/prefer-object-from-entries": "off",
    "unicorn/require-array-join-separator": "off",
    "unicorn/better-regex": "off",
    "unicorn/prefer-add-event-listener": "off",
    "unicorn/prefer-array-find": "off",
    "unicorn/prefer-date-now": "off",
    "unicorn/prefer-number-properties": "off",
    "unicorn/no-empty-file": "off",
    "unicorn/no-hex-escape": "off",
    "unicorn/escape-case": "off",
    "unicorn/prefer-string-slice": "off",
    "unicorn/prefer-dom-node-append": "off",
    "unicorn/prefer-query-selector": "off",
    "unicorn/prefer-dom-node-text-content": "off",
    "unicorn/no-abusive-eslint-disable": "off",
    "unicorn/consistent-destructuring": "off",
    "unicorn/no-object-as-default-parameter": "off",
    "unicorn/prefer-switch": "off",
    "unicorn/prefer-string-starts-ends-with": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "no-return-assign": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/no-useless-constructor": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/prefer-optional-chain": "off",
    "@typescript-eslint/array-type": "off",
    "no-mixed-operators": "off",
    "no-template-curly-in-string": "off",
    "sonarjs/no-ignored-return": "off",
    "sonarjs/cognitive-complexity": "off",
    "sonarjs/no-duplicate-string": "off",
    "import/no-duplicates": "off",
    "ino-extra-boolean-cast": "off",
    "sonarjs/no-identical-functions": "off",
    "vue/no-reserved-component-names": "off"
  }
}
