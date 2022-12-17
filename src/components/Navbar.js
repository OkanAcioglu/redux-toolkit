import { CartIcon } from '../icons'
//! hook that coming from react-redux
import { useSelector } from 'react-redux'

const Navbar = () => {
  //! invoke useSelector
  //! useSelector looking for a function and as a parameter entire state (we are talking about entire stoore) (parameter can be also named as store instead of state)
  //? First Approach
  const { amount } = useSelector((state) => state.cart)
  //? Second Approach
  //const amount  = useSelector((state) => state.cart.amount)

  return (
    <nav>
      <div className='nav-center'>
        <h3>redux toolkit</h3>
        <div className='nav-container'>
          <CartIcon />
          <div className='amount-container'>
            <p className='total-amount'>{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
