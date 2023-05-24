import { useEffect } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';
import useAnimatedList from '../../../hooks/useAnimatedList';

export default function ToastContainer() {
  const {
    // items: messages,
    setItems: setMessages,
    // pendingRemovalItemsIds,
    handleRemoveItem,
    // handleAnimationEnd,
    renderList,
  } = useAnimatedList();

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text, duration },
      ]);
    }
    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast');
    };
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}
