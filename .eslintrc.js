module.exports = {
  root: true, // 此项是用来告诉eslint找当前配置文件不用往父级查找
  env: {
    // 此项指定环境的全局变量，指定为浏览器或者node
    browser: true,
    // node: true,
    es2021: true,
  },
  parserOptions: {
    // 解析器
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
  },
  extends: ['plugin:vue/vue3-recommended', 'airbnb-base', 'plugin:prettier/recommended'], // extends中后引入的规则会覆盖前面的规则。
  plugins: ['prettier'], // 插件，省略eslint-plugin-前缀。

  // 规则：
  //  "off" => 0,关闭规则
  //  "wran" => 1,开启警告规则
  //  "error" => 2 开启错误规则
  rules: {
    'prettier/prettier': 'error',
  },
};
