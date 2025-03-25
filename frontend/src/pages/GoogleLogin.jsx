import React from 'react'
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google'
import {jwtdecode} from 'json-decode'

export const GoogleLogIn = () => {

    const handlesuccess = (credentialResponse)=>{
        console.log("Google sign in success",credentialResponse);

        const decode = jwtdecode(credentialResponse?.credentials);
        console.log(decode);
    }

    const handleError = () => {
        console.log("Google sign in Error")
    }

    return (
    <div className='flex items-center justify-center'>
        <GoogleOAuthProvider  clientId="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">
            <GoogleLogin
            onSuccess={handlesuccess}
            onError={handleError}
            />
        </GoogleOAuthProvider>
    </div>
  )
}
