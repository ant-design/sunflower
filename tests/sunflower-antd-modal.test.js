import { renderHook } from '@testing-library/react-hooks';
import { useModal } from '../packages/sunflower-antd-modal/src';

test('useModal', async () => {
  const config = {
    defaultVisible: false,
  };
  const { result } = renderHook(() =>
    useModal(config),
  );
  const { modalProps, show, close, visible } = result.current;
  expect(typeof modalProps.onCancel).toBe('function');
  expect(typeof show).toBe('function');
  expect(typeof close).toBe('function');
  expect(typeof visible).toBe('boolean');
  const props = { ...modalProps };
  delete props.onCancel;
  expect(props).toEqual({
    visible: false,
  });
});
