import type { RefObject } from 'react';
import HeaderBubbleMenuModal from '@/components/HeaderBubbleMenuModal';
import { servicesBubbleItems } from '@/lib/headerBubbleMenuItems';

interface ServicesMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLElement | null>;
  fallbackAnchorRef?: RefObject<HTMLElement | null>;
}

const ServicesMenuModal = ({
  isOpen,
  onClose,
  anchorRef,
  fallbackAnchorRef,
}: ServicesMenuModalProps) => (
  <HeaderBubbleMenuModal
    isOpen={isOpen}
    onClose={onClose}
    anchorRef={anchorRef}
    fallbackAnchorRef={fallbackAnchorRef}
    items={servicesBubbleItems}
  />
);

export default ServicesMenuModal;
