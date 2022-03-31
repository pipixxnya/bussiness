import Mock from 'mockjs';

const alarmList = {
  url: '/alarm/list',
  type: 'get',
  response: () => {
    return Mock.mock({
      code: 200,
      total: 10,
      'data|10': [
        {
          id: '@id',
          warningName: '@ctitle(3, 5)',
          warningType: '@cword("012", 1)',
          warningLevel: '@cword("012", 1)',
          deviceName: '@ctitle(3, 5)',
          deviceCode: '@natural',
          parameter: '@ctitle(3, 5)',
          status: '@cword("012", 1)',
          triggerTime: '@datetime',
        },
      ],
    });
  },
};

const alarmSettingList = {
  url: '/alarmSetting/list',
  type: 'get',
  response: () => {
    return Mock.mock({
      code: 200,
      total: 10,
      'data|10': [
        {
          id: '@id',
          warningName: '@ctitle(3, 5)',
          warningType: '@cword("012", 1)',
          warningLevel: '@cword("012", 1)',
          deviceName: '@ctitle(3, 5)',
          deviceCode: '@natural',
          parameter: '@ctitle(3, 5)',
          status: '@cword("012", 1)',
          triggerTime: '@datetime',
        },
      ],
    });
  },
};

const mechanismLsit = {
  url: '/mechanism/list',
  type: 'get',
  response: () => {
    return Mock.mock({
      code: 200,
      total: 10,
      'data|50': [
        {
          id: '@id',
          mechanismName: '@ctitle(3, 5)',
        },
      ],
    });
  },
};

export default [mechanismLsit, alarmList,alarmSettingList];
