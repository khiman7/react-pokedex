import { PropsWithChildren } from 'react';

interface IModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export default function Modal({ children, open, onClose }: IModalProps) {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? 'visible bg-black/20' : 'invisible'
      } `}
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-white rounded-2xl shadow"
      >
        {children}
      </div>
    </div>
  );
}
