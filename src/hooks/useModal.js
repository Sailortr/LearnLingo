import { useState, useCallback } from "react";

/**
 * Modal pencerelerin açma/kapama durumunu yönetmek için bir custom hook.
 * * @param {boolean} [initialState=false] - Modalın başlangıçtaki açık/kapalı durumu.
 * @returns {object}
 * - isOpen: Modalın açık olup olmadığını belirten boolean.
 * - openModal: Modalı açan fonksiyon.
 * - closeModal: Modalı kapatan fonksiyon.
 * - toggleModal: Modalın durumunu değiştiren (açıksa kapatır, kapalıysa açar) fonksiyon.
 */
export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};
