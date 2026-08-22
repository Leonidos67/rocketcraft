import { useEffect, type RefObject } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import LeadRequestForm, { type LeadSaasExample } from '@/components/LeadRequestForm';

const EASE = [0.22, 1, 0.36, 1] as const;

interface LeadRequestPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchorRef?: RefObject<HTMLElement | null>;
  mode?: 'popover' | 'dialog';
  saasExample?: LeadSaasExample;
}

const LeadRequestPopover = ({
  open,
  onOpenChange,
  anchorRef,
  mode = 'popover',
  saasExample,
}: LeadRequestPopoverProps) => {
  useEffect(() => {
    if (!open || mode !== 'popover' || !anchorRef) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (anchorRef.current?.contains(target)) return;
      if (target instanceof Element) {
        if (target.closest('[data-lead-request-panel]')) return;
        // Select portal renders outside the panel — keep the form open
        if (target.closest('[data-radix-select-content], [data-radix-popper-content-wrapper]')) {
          return;
        }
      }
      onOpenChange(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, mode, onOpenChange, anchorRef]);

  if (mode === 'dialog') {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="max-w-md rounded-2xl border border-black/10 p-6 sm:rounded-2xl"
          onPointerDownOutside={(event) => {
            const target = event.target as Element | null;
            if (target?.closest('[data-radix-select-content], [data-radix-popper-content-wrapper]')) {
              event.preventDefault();
            }
          }}
          onInteractOutside={(event) => {
            const target = event.target as Element | null;
            if (target?.closest('[data-radix-select-content], [data-radix-popper-content-wrapper]')) {
              event.preventDefault();
            }
          }}
        >
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-semibold">Оставить заявку</DialogTitle>
          </DialogHeader>
          <LeadRequestForm
            onSuccess={() => onOpenChange(false)}
            saasExample={saasExample}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          data-lead-request-panel
          role="dialog"
          aria-label="Форма заявки"
          className="absolute right-0 top-[calc(100%+0.65rem)] z-[140] w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-black/10 bg-background p-5 shadow-[0_18px_48px_hsl(0_0%_0%_/_0.12)]"
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.98 }}
          transition={{ duration: 0.22, ease: EASE }}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-foreground">Оставить заявку</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Оставьте контакты — перезвоним и обсудим задачу
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.12] bg-background text-foreground transition-colors hover:bg-[hsl(0_0%_96%)]"
              aria-label="Закрыть форму"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <LeadRequestForm
            onSuccess={() => onOpenChange(false)}
            saasExample={saasExample}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LeadRequestPopover;
