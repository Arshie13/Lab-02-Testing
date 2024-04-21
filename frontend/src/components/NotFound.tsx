import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <div>Not Found</div>
      <Button component={Link} to="/signin" color='inherit'>Go back</Button>
    </div>
  )
}

export default NotFound