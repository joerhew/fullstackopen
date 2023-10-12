import Display from './components/Display'
import Button from './components/Button'

const App = () => (
  <div>
    <Display />
    <div>
      <Button type="INC" label="+" />
      <Button type="DEC" label="-" />
      <Button type="ZERO" label="0" />
    </div>
  </div>  
)

export default App