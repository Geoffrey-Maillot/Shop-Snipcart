import React from 'react';

const styles = {
  modal: {
    width: '100%',
    height: '100vh',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0 , .15)',
  }
}

const Modal = ({ openCloseListModal, children }) => {

  const handlerOnClickModal = (evt) => {
    if (evt.target.className === 'modal') {
      openCloseListModal();
    }
  };
  return (
    <div style={styles.modal} onClick={handlerOnClickModal}>
      {children}
    </div>
  );
};


export default Modal;

/*-----------------------------------
            CSS
-----------------------------------*/



// Bloquer le défilement de la page avec la propriété "positio: fixed" sur le plus haut parent, ex:
/*
.app {
  position: fixed;
}

*/