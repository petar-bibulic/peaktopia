import React from 'react'

type Props = {}

const LoginForm = (props: Props) => {
  return (
    <div>
        <form className="relative flex justify-center items-center">
            <label className="m-1" htmlFor="username-input">Username</label>
            <input id="username-input" type="text" />
        </form>
    </div>
    
  )
}

export default LoginForm