import { useTransaction } from '../../hooks/useTransaction'
import {Container} from './styles'

import IncomeImg from '../../assets/income.svg'
import OutcomeImg from '../../assets/outcome.svg'
import TotalImg from '../../assets/total.svg'

export function Summary() {
  const {transactions} = useTransaction()

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') { 
      acc.deposit += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraw += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;
  }, {
    deposit: 0,
    withdraw: 0,
    total: 0,
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={IncomeImg} alt="Income"/>
        </header>
        <strong>{
            new Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency'
            }).format(summary.deposit)
          }</strong>
      </div>

      <div>
        <header>
          <p>Saidas</p>
          <img src={OutcomeImg} alt="Outcome"/>
        </header>
        <strong>- {
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.withdraw)
          }</strong>
      </div>

      <div>
        <header>
          <p>Total</p>
          <img src={TotalImg} alt="Total"/>
        </header>
        <strong>{
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.total)
          }</strong>
      </div>
    </Container>
  )
}