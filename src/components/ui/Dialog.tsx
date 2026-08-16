import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { useDialogFocus } from '../../hooks/useDialogFocus';

interface DialogProps {
  labelledBy: string;
  closeLabel: string;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

export function Dialog({
  labelledBy,
  closeLabel,
  onClose,
  className = '',
  children,
}: DialogProps) {
  const { dialogRef, initialFocusRef } = useDialogFocus(onClose);

  return (
    <motion.div
      className="dialog-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.div
        ref={dialogRef}
        className={`dialog-panel ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.985 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={initialFocusRef}
          className="dialog-close"
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
        >
          <X aria-hidden="true" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}
