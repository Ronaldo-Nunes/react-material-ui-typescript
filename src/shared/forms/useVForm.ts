import { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';

export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);

  /**
   * useRef permite armazenar a referência de um objeto, evitando que ele seja perdido durante a reconstrução da página/componente
   */
  const isSavingAndClose = useRef(false);
  const isSavingAndNew = useRef(false);

  const handleSave = useCallback(() => {
    isSavingAndNew.current = false;
    isSavingAndClose.current = false;
    formRef.current?.submitForm();
  }, []);


  const handleSaveAndNew = useCallback(() => {
    isSavingAndNew.current = true;
    isSavingAndClose.current = false;
    formRef.current?.submitForm();
  }, []);


  const handleSaveAndClose = useCallback(() => {
    isSavingAndClose.current = true;
    isSavingAndNew.current = false;
    formRef.current?.submitForm();
  }, []);


  const handleIsSaveAndNew = useCallback(() => {
    return isSavingAndNew.current;
  }, []);


  const handleIsSaveAndClose = useCallback(() => {
    return isSavingAndClose.current;
  }, []);

  return {
    formRef,

    save: handleSave,
    saveAndNew: handleSaveAndNew,
    saveAndClose: handleSaveAndClose,

    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndClose: handleIsSaveAndClose
  };
};