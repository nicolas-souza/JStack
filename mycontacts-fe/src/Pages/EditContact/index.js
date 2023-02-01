import PageHeader from '../../Components/PageHeader';
import ContactForm from '../../Components/ContactForm';

export default function EditContact() {
  return (
    <>
      <PageHeader
        title="Novo Contato"
      />
      <ContactForm
        buttonLabel="Salvar Alterações"
      />
    </>
  );
}
