import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useVerifyemailQuery } from '../../sevices/MyShopApi'

const EmailVerify = () => {

    const data = useParams()

    const [msg, setMsg] = useState('')
    
    const res = useVerifyemailQuery(data)

    useEffect(()=>{
        if (res.data){
            setMsg(res.data.msg)
        }
    })

    return (
    <>

<div style={{marginTop:'32vh'}}>

    <div className="alert alert-success mx-4 text-center p-5" role="alert">
        {msg}
    </div>

</div>

    </>
  )
}

export default EmailVerify