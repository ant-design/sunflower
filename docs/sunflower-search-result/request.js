import Mock from 'mockjs';


const total = 200;

const db = Mock.mock({
  [`list|${total}`]: [{
    username: '@name',
    email: '@email',
    id: '@guid',
  }],
});

export default ({ username, pageSize, currentPage }) => {
  const start = pageSize * (currentPage - 1) + 1;
  const end = start + pageSize;
  let totalList = db.list;
  if (username) {
    totalList = totalList.filter(item => (item.username.indexOf(username) > -1));
  }
  debugger
  const list = totalList.slice(start, end);
  return new Promise(r => setTimeout(() => {
    r({
      list,
      total: totalList.length,
    });
  }, 300));
};
