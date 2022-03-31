import Mock from 'mockjs';

const device = {
  url: '/select/device',
  type: 'get',
  response: () => {
    return Mock.mock({
      code: 200,
      total: 10,
      'data|50': [
        {
          id: '@id',
          deviceName: '@ctitle(3, 5)',
          deviceCode: '@natural',
        },
      ],
    });
  },
};

export default [device];
