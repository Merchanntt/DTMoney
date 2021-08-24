import { FormEvent, useState } from 'react';

import Modal from 'react-modal';
import Income from '../../assets/income.svg'
import Outcome from '../../assets/outcome.svg'
import CloseButton from '../../assets/close.svg'

import { Container, TransactionButtons, TransactionCard } from './styles';
import { useTransaction } from '../../hooks/useTransaction';

interface TransactionModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export function TransactionModal({isModalOpen, onCloseModal}: TransactionModalProps) {
  const {createNewTransaction} = useTransaction()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  const [type, setType] = useState('deposit')

  async function HandleSubmitTransactionForm (event: FormEvent) {
    event.preventDefault()

    await createNewTransaction({
      title,
      amount,
      category,
      type
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
    onCloseModal()
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
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
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