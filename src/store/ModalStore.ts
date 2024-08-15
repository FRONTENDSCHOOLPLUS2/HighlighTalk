// stores/modalStore.ts
import { create } from 'zustand';
import React from 'react';

interface ModalState {
  isOpen: boolean;
  content: string;
  title?: string;
  footer?: React.ReactNode;
  openModal: (content?: string, title?: string, footer?: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: '',
  title: '',
  footer: null,
  openModal: (content = '기본 내용', title = '', footer = null) =>
    set({ isOpen: true, content, title, footer }),
  closeModal: () => set({ isOpen: false, content: '', title: '', footer: null }),
}));
