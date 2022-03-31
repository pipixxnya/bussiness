import Mock from 'mockjs';
const Random = Mock.Random;
const logIn = {
  url: '/web/logIn',
  type: 'get',
  response: () => {
    return {
      code: 20000,
      data: {
        uid: Random.id(),
        type: 1,
        uname: Random.cname(),
        expire_in: '63666',
        token: Random.guid(),
        logintime: Random.date(),
        permission: ['1'],
      },
    };
  },
};

const signOut = {
  url: '/web/signOut',
  type: 'get',
  response: () => {
    return {
      code: 20000,
      data: [
        {
          id: 1,
          username: 'zhoujielun',
          password: '123456',
        },
        {
          id: 2,
          username: 'guojingming',
          password: '666666',
        },
      ],
    };
  },
};

export default [logIn, signOut];
