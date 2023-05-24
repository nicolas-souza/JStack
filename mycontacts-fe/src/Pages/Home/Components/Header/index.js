import propTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { HeaderContainer } from './styles';

export default function Header({ hasError, qtyOfContacts, qtyOfFilteredContacts }) {
  // eslint-disable-next-line no-nested-ternary
  const alignment = hasError
    ? 'flex-end'
    : (
      qtyOfContacts > 0
        ? 'space-between'
        : 'center'
    );
  return (
    <HeaderContainer justfyContent={alignment}>
      {(!hasError && qtyOfContacts > 0) && (
      <strong>
          {qtyOfFilteredContacts}
          {qtyOfFilteredContacts === 1 ? ' contato' : ' contatos'}
      </strong>
      )}
      <Link to="/new"> Novo contato </Link>
    </HeaderContainer>
  );
}

Header.propTypes = {
  hasError: propTypes.bool.isRequired,
  qtyOfContacts: propTypes.number.isRequired,
  qtyOfFilteredContacts: propTypes.number.isRequired,
};
