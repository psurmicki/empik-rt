import React, { useContext } from 'react';
import { Context } from '../store.jsx';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const ModalQuantity = () => {
  const [state, dispatch] = useContext(Context);

  const toggle = () => {
    let payload = {
      product: {},
      modalIsOpen: false
    }
    dispatch({ type: 'HANDLE_MODAL', payload })
  }

  return (
    <div>
      <Modal
        isOpen={state.modalIsOpen}
        toggle={toggle}
      >
        <ModalHeader
          style={{ backgroundColor: 'red' }}
          toggle={toggle}
        >
          Uwaga!
        </ModalHeader>
        <ModalBody>
          <h5>Przekroczyłeś maksymalną liczbę zamówionych produktów!</h5>
          <p>
            {
              `Maksymalna liczba zamówienia dla produktu pn. ${state.product.name} to: ${state.product.max} szt.`
            }
          </p>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalQuantity;