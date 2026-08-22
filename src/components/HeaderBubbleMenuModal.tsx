import type { RefObject } from 'react';
import type { BubbleMenuItem } from '@/components/ui/BubbleMenu';
import HeaderAnchorBubbleMenu from '@/components/HeaderAnchorBubbleMenu';

interface HeaderBubbleMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLElement | null>;
  fallbackAnchorRef?: RefObject<HTMLElement | null>;
  items: BubbleMenuItem[];
}

const HeaderBubbleMenuModal = ({
  isOpen,
  onClose,
  anchorRef,
  fallbackAnchorRef,
  items,
}: HeaderBubbleMenuModalProps) => (
  <HeaderAnchorBubbleMenu
    isOpen={isOpen}
    onClose={onClose}
    anchorRef={anchorRef}
    fallbackAnchorRef={fallbackAnchorRef}
    items={items}
  />
);

export default HeaderBubbleMenuModal;
