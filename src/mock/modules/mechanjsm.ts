import Mock from 'mockjs';
const Random = Mock.Random;

Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189']; // 自己写前缀哈
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/); //Number()
  },
});

const listorg = {
  url: /.*\/user-org-auth\/list-org-auth/,
  type: 'get',
  response: () => {
    return Mock.mock({
      code: 200,
      'data|1-10': [
        {
          id: '@id',
          responsible: '@cname',
          orgName: '@string("lower", 5)',
          'isEnable|0-1': 1,
          phoneNumber: '@phone',
        },
      ],
    });
    // return {
    //   code: 20000,
    //   data: [
    //     {
    //       id: 1,
    //       orgName: '五元',
    //     },
    //   ],
    // };
  },
};

export default [listorg];
