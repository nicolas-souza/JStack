/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
// import { Link } from 'react-router-dom';

import {
  Container,
} from './styles';

import Loader from '../../Components/Loader';
import Modal from '../../Components/Modal';
import useHome from './useHome';

import InputSearch from './Components/InputSearch';
import Header from './Components/Header';
import ErrorStatus from './Components/ErrorStatus';
import EmptyList from './Components/EmptyList';
import SearchNotFound from './Components/SearchNotFound';
import ContactsList from './Components/ContactsList';

export default function Home() {
  const {
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
  } = useHome();

  const hasContact = contacts.length;
  const isListEmpty = !hasError && !isLoading && !hasContact;
  const isSearchEmpty = !hasError && hasContact && filteredContacts.length < 1;

  return (
    <Container>

      <Loader isLoading={isLoading} />

      {hasContact && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContact && (
      <>
        <ContactsList
          filteredContacts={filteredContacts}
          orderBy={orderBy}
          onToggleOrderBy={handleToggleOrderBy}
          onDeleteContact={handleDeleteContact}
        />
        <Modal
          danger
          isLoading={isLoadingDelete}
          visible={isDeleteModalVisible}
          title={`Tem certeza que deseja remover ${contactBeingDelete?.name}?`}
          confirmLabel="Deletar"
          onCancel={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
        >
          <p>Esta ação não poderá ser desfeita!</p>
        </Modal>
      </>
      )}
    </Container>
  );
}
