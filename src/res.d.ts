

interface Response {
  code: String;
  data: any;
  msg: String;
}

interface ElForm {
  validate:function():boolean;
  resetFields:function();
}

