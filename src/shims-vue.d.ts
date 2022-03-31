declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// // 对vue进行类型补充说明
// declare module '@vue/runtime-core' {
// interface ElForm {
//   validate:function():boolean;
// }
// interface Response {
//   code: String;
//   data: any;
//   msg: String;
// }
// }
