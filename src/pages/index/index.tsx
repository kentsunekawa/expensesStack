import { useState, useEffect } from 'react'

import { toggleIsShowExpenseRegister } from 'src/hooks'

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  useEffect(() => {
    toggleIsShowExpenseRegister(true)
  }, [])

  return <>Home</>
}

export default Home
