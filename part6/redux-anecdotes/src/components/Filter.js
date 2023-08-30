import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = ({ target }) => {
    dispatch(setFilter(target.value))
  }

  return (
    <div>
      filter <input name="filter" onChange={handleChange} />
    </div>
  )
}

export default Filter