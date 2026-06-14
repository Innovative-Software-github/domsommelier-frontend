'use client';

import React, { useState } from 'react';
import { Button } from '@/ui/Button/Button';
import cls from './OrderCancelBlock.module.scss';

export interface IOrderCancelBlockProps {
  isCancelling: boolean;
  cancelError: string | null;
  onCancel: () => void;
}

export const OrderCancelBlock: React.FC<IOrderCancelBlockProps> = ({
  isCancelling,
  cancelError,
  onCancel,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className={cls.cancelBlock}>
      {!showConfirm ? (
        <Button
          className={cls.cancelButton}
          variant="darkOutlined"
          height="H-42"
          onClick={() => setShowConfirm(true)}
        >
          Отменить заказ
        </Button>
      ) : (
        <div className={cls.cancelConfirm}>
          <p className={cls.cancelWarning}>
            Вы уверены? После отмены восстановить заказ будет невозможно.
          </p>
          <div className={cls.cancelActions}>
            <Button
              className={cls.confirmButton}
              height="H-42"
              onClick={onCancel}
              isLoading={isCancelling}
            >
              Да, отменить
            </Button>
            <Button
              className={cls.confirmButton}
              variant="darkOutlined"
              height="H-42"
              onClick={() => setShowConfirm(false)}
            >
              Оставить
            </Button>
          </div>
          {cancelError && <p className={cls.cancelError}>{cancelError}</p>}
        </div>
      )}
    </div>
  );
};
