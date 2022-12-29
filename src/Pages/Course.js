import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalContext from '../GlobalContext'

const Course = () => {

    let { id } = useParams()
    let userInfo = useContext(GlobalContext)

    const [text, setText] = useState("Course " + id)

    const checkAccess = () => {
        if (id > 0 && id < 6) {
            if (userInfo.arrayOfAccess[id - 1] == 1) {
                setText("You Have Access To The Course")
            } else {
                setText("You Don't Have Access To The Course")
            }
        } else {
            setText("Course Not Found")
        }
    }

    useEffect(() => {
        checkAccess()
        console.log("availableInfo: ", userInfo.arrayOfAccess)
    }, [userInfo])


    return (
        <div>{text}</div>
    )
}

export default Course