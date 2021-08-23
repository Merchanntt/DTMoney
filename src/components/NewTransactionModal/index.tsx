import { FormEvent, useState } from 'react';

import Modal from 'react-modal';
import Income from '../../assets/income.svg'
import Outcome from '../../assets/outcome.svg'
import CloseButton from '../../assets/close.svg'

import { Container, TransactionButtons, TransactionCard } from './styles';
import { api } from '../../services/api';

interface TransactionModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export function TransactionModal({isModalOpen, onCloseModal}: TransactionModalProps) {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState('')

  const [type, setType] = useState('deposit')

  function HandleSubmitTransactionForm (event: FormEvent) {
    event.preventDefault()

    const data = {
      title,
      value,
      category,
      type
    }

    api.post('/transactions', data)
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button
        type='button'
        onClick={onCloseModal}
        className='modal-close-button'
      >
        <img src={CloseButton} alt="Fechar transação"/>
      </button>
      <Container onSubmit={HandleSubmitTransactionForm}>
        <h2>Nova transação</h2>
        <input 
          placeholder='Título'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input 
          type='number'
          placeholder='Valor'
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <TransactionButtons>
          <TransactionCard 
            type="button"
            isActive={type === 'deposit'}
            onClick={() => {setType('deposit')}}
            color={'green'}
            >
            <img src={Income} alt="Entrada" />
            <span>Entrada</span>
          </TransactionCard>

          <TransactionCard 
            type="button"
            isActive={type === 'withdraw'}
            onClick={() => {setType('withdraw')}}
            color={'red'}
            >
            <img src={Outcome} alt="Saída" />
            <span>Saída</span>
          </TransactionCard>

        </TransactionButtons>
        <input 
          placeholder='Categoria'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}