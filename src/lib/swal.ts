import Swal from 'sweetalert2';

export const swal = Swal.mixin({
  buttonsStyling: false,
  customClass: {
    popup: 'acu-popup',
    title: 'acu-title',
    confirmButton: 'acu-btn-confirm',
    cancelButton: 'acu-btn-cancel',
  },
  background: '#ffffff',
  color: '#0f172a', // slate-900 approximate
  iconColor: '#f97316', // orange-500
});
