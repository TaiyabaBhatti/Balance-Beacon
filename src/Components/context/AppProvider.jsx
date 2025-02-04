import React from 'react'
import AuthState from './authState'


export default function AppProvider({children}) {
  return (
    <AuthState>
{children}
    </AuthState>
  )
}
