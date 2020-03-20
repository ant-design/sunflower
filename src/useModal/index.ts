import { useState, useCallback } from 'react';

export interface UseModalConfig {
  defaultVisible: boolean;
}

export const useModal = (config: UseModalConfig) => {
  const modalConfig = config || ({} as UseModalConfig);
  const { defaultVisible = false } = modalConfig;

  const [visible, setVisible] = useState(defaultVisible);
  const show = useCallback(() => setVisible(true), [visible]);
  const close = useCallback(() => setVisible(false), [visible]);

  const modalProps = {
    visible,
    onCancel: close,
  };
  return {
    visible,
    show,
    close,
    modalProps,
  };
};
