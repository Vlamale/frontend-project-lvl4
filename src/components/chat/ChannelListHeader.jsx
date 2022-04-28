import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { openModal } from '../../slices/modalSlice.js';

function ChannelListHeader() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const openModalHandler = () => {
    dispatch(openModal({ type: 'addChannel', extra: null }));
  };

  return (
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
      <span className="text-truncate">{t('channels.title')}</span>
      <Button
        variant="outline-primary"
        size="sm"
        onClick={openModalHandler}
      >
        {t('channels.addBtn')}
      </Button>
    </div>
  );
}

export default ChannelListHeader;
