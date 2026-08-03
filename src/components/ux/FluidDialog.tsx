"use client";

import { useEffect, useRef, type ReactNode } from "react";

type FluidDialogProps = {
  open: boolean;
  onClose: () => void;
  /** Id of the heading that names this dialog. */
  labelledBy: string;
  closeLabel: string;
  className?: string;
  children: ReactNode;
};

/**
 * Shared detail dialog shell. Uses the native `<dialog>` element so focus
 * trapping, top-layer stacking, and Escape handling come from the platform.
 */
export function FluidDialog({
  open,
  onClose,
  labelledBy,
  closeLabel,
  className,
  children,
}: FluidDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    // Native `close` covers the Escape key; the pointer check closes on backdrop clicks.
    const handleClose = () => onClose();
    const handlePointerDown = (event: MouseEvent) => {
      if (event.target === dialog) {
        dialog.close();
      }
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("mousedown", handlePointerDown);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("mousedown", handlePointerDown);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      className={`jov-dialog${className ? ` ${className}` : ""}`}
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-border bg-muted text-foreground/75 transition-colors hover:bg-aqua hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
        >
          <span className="sr-only">{closeLabel}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {children}
      </div>
    </dialog>
  );
}
