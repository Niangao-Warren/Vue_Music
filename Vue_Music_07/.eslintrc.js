// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    "no-unused-vars": 
      ["error", { 
        // 检查全局范围的变量
        "vars": "all", 
        // 这允许函数使用两个命名参数
        "args": "after-used"
      }],
    // 关闭不能使用tab
    "no-tabs": 'off',
    // 语句强制分号结尾
    "semi": [0],
    // 文件以单一的换行符结束
    'eol-last': [0],
    // 禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [0],
    // 函数定义时括号前面要不要有空格 
    'space-before-function-paren': [0],
    // 缩进风格
    'indent': [0],
    // 空行上的尾随空白
    'no-trailing-spaces': [0]
  }
}
