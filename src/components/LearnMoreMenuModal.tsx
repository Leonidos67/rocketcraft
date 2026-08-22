import type { RefObject } from 'react';
import HeaderBubbleMenuModal from '@/components/HeaderBubbleMenuModal';
import { learnMoreBubbleItems } from '@/lib/headerBubbleMenuItems';

interface LearnMoreMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLElement | null>;
}

const LearnMoreMenuModal = ({ isOpen, onClose, anchorRef }: LearnMoreMenuModalProps) => (
  <HeaderBubbleMenuModal
    isOpen={isOpen}
    onClose={onClose}
    anchorRef={anchorRef}
    items={learnMoreBubbleItems}
  />
);

export default LearnMoreMenuModal;
