import Mock from 'mockjs';
const mockFiles = import.meta.glob('./modules/*.ts');

interface mockItem {
  url: string;
  type: string;
  response: any;
}

for (const path in mockFiles) {
  mockFiles[path]().then((mods) => {
    mods.default.forEach((mod: mockItem) => {
      Mock.mock(mod.url, mod.type, mod.response);
    });
  });
}
