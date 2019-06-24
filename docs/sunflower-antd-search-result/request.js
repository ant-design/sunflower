import Mock from "mockjs";

const total = 200;

const db = Mock.mock({
  [`list|${total}`]: [
    {
      username: "@name",
      email: "@email",
      id: "@guid"
    }
  ]
});

function filter(list, dataIndex, keyword) {
  if (!keyword) {
    return list;
  }
  return list.filter(
    item =>
      item[dataIndex].toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) >
      -1
  );
}

export default ({ username, pageSize, currentPage }) => {
  const start = pageSize * (currentPage - 1) + 1;
  const end = start + pageSize;
  let totalList = db.list;
  totalList = filter(totalList, "username", username);
  const list = totalList.slice(start, end);
  return new Promise(r =>
    setTimeout(() => {
      r({
        list,
        total: totalList.length
      });
    }, 300)
  );
};
