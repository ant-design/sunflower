import { lazy, useState, useEffect, Suspense } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Tabs } from 'antd';

const { TabPane } = Tabs;


const Playground = ({ name }) => {
  const [code, setCode] = useState('');
  const Component = lazy(() => import(`../examples/${name}`));
  useEffect(() => {
    import(`!!raw-loader!../examples/${name}`).then(obj => setCode(obj.default))
  }, []);
  return (
    <Tabs defaultActiveKey="1">
        <TabPane tab="ui" key="1">
          <Suspense fallback={<div>Loading...</div>}>
            <Component />
          </Suspense>
        </TabPane>
        <TabPane tab="jsx" key="2">
          <SyntaxHighlighter language="jsx">
            {code}
          </SyntaxHighlighter>
        </TabPane>
    </Tabs>
  );
};

export default Playground;
