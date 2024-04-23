import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(-1)
  }

  return (
    <div>
      <div>Not Found</div>
      <Button onClick={handleButtonClick} color='inherit'>Go back</Button>
    </div>
  )
}

export default NotFound