import React from 'react'
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
function CustomConfirm({show,onClose,handleConfirm}) {
    const { t } = useTranslation();
  return (
    
        <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('isitnewaccountyesnoalert')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            {t('noo')}
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            {t('yes')}
          </Button>
        </Modal.Footer>
      </Modal>
    
  )
}

export default CustomConfirm;