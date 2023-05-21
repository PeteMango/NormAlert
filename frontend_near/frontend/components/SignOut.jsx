import React from 'react'

export const SignOut = ({accountId, onClick}) => {
  return (
    <div>
        <button style={{ float: 'right' }} onClick={onClick}>
            Sign out {accountId}
        </button>
    </div>
  )
}
