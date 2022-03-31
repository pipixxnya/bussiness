import Mock from 'mockjs';
const Random = Mock.Random;
const mechanismTree = {
  url: '/mechanism/tree',
  type: 'get',
  response: () => {
    return Mock.mock({
      code: 200,
      'data|10': [
        {
          id: '@id',
          label: '@ctitle(3, 5)',
          'children|10': [
            {
              id: '@id',
              label: '@ctitle(3, 5)',
            },
          ],
        },
      ],
    });
  },
};

const mechanismDeviceTable = {
  url: '/mechanism/device',
  type: 'get',
  response: () => {
    return Mock.mock({
      code: 200,
      total: 10,
      'data|10': [
        {
          id: '@id',
          deviceName: '@ctitle(3, 5)',
          deviceCode: '@natural',
          deviceType: '@cword("012", 1)',
          iot: '@cword("01", 1)',
          status: '@cword("012", 1)',
          runStatus: '@cword("012", 1)',
          craTime: '@datetime',
        },
      ],
    });
  },
};

const commandTable = {
  url: '/mechanism/command',
  type: 'get',
  response: () => {
    return Mock.mock({
      code: 200,
      total: 10,
      'data|10': [
        {
          id: '@id',
          parameter: '@ctitle(3, 5)',
          command: '@natural',
          deviceName: '@ctitle(3, 5)',
          deviceCode: '@natural',
          deviceType: '@cword("012", 1)',
          status: '@cword("0123", 1)',
          executionTime: '@datetime',
        },
      ],
    });
  },
};

const virtualTable = {
  url: '/virtual/list',
  type: 'get',
  response: () => {
    return Mock.mock({
      code: 200,
      total: 10,
      'data|10': [
        {
          id: '@id',
          parameter: '@ctitle(3, 5)',
          rule: '@natural',
          original: '@ctitle(3, 5)',
          conversion: '@ctitle(3, 5)',
          unit: '@cword("012", 1)',
          type: '@cword("01", 1)',
          access: '@cword("012", 1)',
        },
      ],
    });
  },
};

const pointHistoryTable = {
  url: '/pointHistory/list',
  type: 'get',
  response: () => {
    return Mock.mock({
      code: 200,
      total: 10,
      'data|30': [
        {
          id: '@id',
          reportingTime: '@datetime',
          original: '@ctitle(3, 5)',
          value: '@cword("012", 1)',
        },
      ],
    });
  },
};

export default [mechanismTree, mechanismDeviceTable, commandTable, virtualTable, pointHistoryTable];
