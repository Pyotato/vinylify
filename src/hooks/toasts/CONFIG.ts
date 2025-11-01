import { Bounce } from 'react-toastify';

const TOAST_SETTINGS = {
  position: 'top-center',
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  autoClose: false,
  draggable: false,
  theme: 'light',
  transition: Bounce,
} as const;

export default TOAST_SETTINGS;
