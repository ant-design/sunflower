import Mock from "mockjs";

const total = 200;

const db = Mock.mock({
  [`list|${total}`]: [
    {
      username: "@name",
      email: "@email",
      id: "@guid",
      "gender|1": ["male", "female"] 
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

export default ({ username, email, filters, sorter, pageSize, current }) => {
  console.log('-------> request: username: %s, pageSize: %s, current: %s, filters: %s, sorter: %s', username, pageSize, current, JSON.stringify(filters), JSON.stringify(sorter));
  const start = pageSize * (current - 1);
  const end = start + pageSize;
  let totalList = db.list;
  totalList = filter(totalList, "username", username);
  totalList = filter(totalList, "email", email);
  if (filters) {
    Object.keys(filters).forEach(key => {
      if (!filters[key]) {
        return true;
      }
      if (filters[key].length === 0) {
        return true;
      }
      totalList = totalList.filter(item => filters[key].includes(item[key]));
    });
  }
  if (sorter && sorter.column) {
    const { dataIndex } = sorter.column;
    if (sorter.order === 'descend') {
      totalList = [...totalList].sort((a, b) => b[dataIndex].charCodeAt(0) - a[dataIndex].charCodeAt(0));
    } else {
      totalList = [...totalList].sort((a, b) => a[dataIndex].charCodeAt(0) - b[dataIndex].charCodeAt(0));
    }
  }
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
