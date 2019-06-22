import Mock from 'mockjs';


const total = 200;

const result = Mock.mock({
  [`list|${total}`]: [{
    name: '@name',
    email: '@email',
    id: '@guid',
  }],
});

export default ({ pageSize, currentPage }) => {
  const start = pageSize * (currentPage - 1) + 1;
  const end = start + pageSize;
  const list = result.list.slice(start, end);
  return new Promise(r => setTimeout(() => {
    r({
      list,
      total,
    });
  }, 300));
};
