import React, { useContext } from 'react'
import GlobalContext from '../GlobalContext'

const Home = () => {

    let userInfo = useContext(GlobalContext)

    console.log(userInfo.hasNormalNFT)

    return (
        <div>
            Home
        </div>
    )
}

export default Home