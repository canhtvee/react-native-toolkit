import React from 'react';
import DatePicker from 'react-native-date-picker';

export const Picker = React.forwardRef((props, ref) => {
  const [openModal, setOpenModal] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    openModal: setOpenModal(true),
    closeModal: setOpenModal(false),
  }));

  return <DatePicker open={openModal} {...props} />;
});
