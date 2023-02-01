import PropTypes from 'prop-types';
import FormFroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import { Form, ButtonContainer } from './style';

export default function ContactForm({ buttonLabel }) {
  return (
    <Form>
      <FormFroup>
        <Input placeholder="Nome" />
      </FormFroup>

      <FormFroup>
        <Input placeholder="E-mail" />
      </FormFroup>

      <FormFroup>
        <Input placeholder="Telefone" />
      </FormFroup>

      <FormFroup>
        <Select>
          <option value="instagram">Instagram</option>
        </Select>
      </FormFroup>

      <ButtonContainer>
        <Button type="submit">
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
