/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFound,
} from './styles';
import formatPhone from '../../utils/formatPhone';
import Loader from '../../Components/Loader';
import Button from '../../Components/Button';
import Modal from '../../Components/Modal';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import useHome from './useHome';

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
  return (
    <Container>

      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquisar contato..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        justfyContent={

          hasError
            ? 'flex-end'
            : (
              contacts.length > 0
                ? 'space-between'
                : 'center'
            )
        }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new"> Novo contato </Link>
      </Header>
      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>

            <Button type="button" onClick={handleTryAgain}>
              Tentar Novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
      <>
        {(contacts.length < 1 && !isLoading) && (
          <EmptyListContainer>
            <img src={emptyBox} alt="Empty box" />
            <p>
              Você ainda não tem nenhum contato cadastrado!
              Clique no botão <strong>”Novo contato”</strong> à cima para cadastrar o seu primeiro!
            </p>
          </EmptyListContainer>
        )}
        {(contacts.length > 0 && filteredContacts.length < 1) && (
          <SearchNotFound>
            <img src={magnifierQuestion} alt="Magnifier Question" />
            <span>Nenhum resultado foi encontrado para <strong>{searchTerm}</strong></span>
          </SearchNotFound>
        )}
        {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </ListHeader>
        )}

        {filteredContacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category.name
                && (<small>{contact.category.name}</small>)}
              </div>
              <span>{contact.email}</span>
              <span>{formatPhone(contact.phone)}</span>
            </div>
            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={edit} alt="edit" />
              </Link>
              <button
                type="button"
                onClick={() => handleDeleteContact(contact)}
              >
                <img src={trash} alt="delet" />
              </button>
            </div>
          </Card>
        ))}

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
