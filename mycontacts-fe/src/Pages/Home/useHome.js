/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import toast from '../../utils/toast';
import ContactsService from '../../Services/ContactsService';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDelete, setContactBeingDelete] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);
      // const contactsList = []; await ContactsService.listContacts(orderBy);

      setContacts(contactsList);
      setHasError(false);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContact(contact) {
    setContactBeingDelete(contact);
    setIsDeleteModalVisible(true);
  }
  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setContactBeingDelete(null);
  }
  async function handleConfirmDelete() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDelete.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDelete.id,
      ));

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
    } catch (error) {
      console.log(error);
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato...',
      });
      setIsLoadingDelete(false);
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDelete,
    handleCloseDeleteModal,
    handleConfirmDelete,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  };
}
