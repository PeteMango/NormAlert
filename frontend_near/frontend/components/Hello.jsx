import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Hello = () => {
  const navigate = useNavigate();
  navigate('/medical-history');
  return (
    <div>Hello</div>
  )
}
