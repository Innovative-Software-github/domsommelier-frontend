'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Backdrop } from '@/ui/Backdrop/Backdrop';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pendingCancelRef = useRef(false);

  const handleClose = () => {
    if (!isCancelling) {
      setIsModalOpen(false);
    }
  };

  const handleConfirmCancel = () => {
    pendingCancelRef.current = true;
    onCancel();
  };

  useEffect(() => {
    if (pendingCancelRef.current && !isCancelling) {
      pendingCancelRef.current = false;
      if (!cancelError) {
        setIsModalOpen(false);
      }
    }
  }, [isCancelling, cancelError]);

  return (
    <div className={cls.cancelBlock}>
      <Button
        className={cls.cancelButton}
        variant="darkOutlined"
        height="H-48"
        onClick={() => setIsModalOpen(true)}
      >
        Отменить заказ
      </Button>

      <Backdrop
        isOpen={isModalOpen}
        animation="center"
        withCancelIcon
        onClickCancelIcon={handleClose}
        title="Отмена заказа"
        contentClassName={cls.modal}
        titleClassName={cls.modalTitle}
      >
        <p className={cls.cancelWarning}>
          Вы уверены? После отмены восстановить заказ будет невозможно.
        </p>
        <div className={cls.cancelActions}>
          <Button
            className={cls.confirmButton}
            height="H-42"
            onClick={handleConfirmCancel}
            isLoading={isCancelling}
          >
            Да, отменить
          </Button>
          <Button
            className={cls.confirmButton}
            variant="darkOutlined"
            height="H-42"
            onClick={handleClose}
            isDisabled={isCancelling}
          >
            Оставить
          </Button>
        </div>
        {cancelError && <p className={cls.cancelError}>{cancelError}</p>}
      </Backdrop>
    </div>
  );
};
