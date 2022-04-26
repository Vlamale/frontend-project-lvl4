import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import SocketContext from './SocketContext.js'
import { io } from "socket.io-client";
import { addMessage } from '../../slices/messagesSlice.js';

const SocketProvider = ({ children }) => {
    const socket = useRef(null)
    const dispatch = useDispatch()
    const [connection, setConnection] = useState(false)

    useEffect(() => {
        socket.current = io()

        socket.current.on("connect", () => {
            console.log('hello')
            socket.current.on('newMessage', (socket) => {
                dispatch(addMessage(socket));
                console.log(socket);
            })
    
            socket.current.on('newChannel', (socket) => {
                console.log(socket);
            })
    
            socket.current.on('removeChannel', (socket) => {
                console.log(socket);
            })
    
            socket.current.on('renameChannel', (socket) => {
                console.log(socket);
            })

            setConnection(true)
        });

    }, [])

    return (
        <SocketContext.Provider value={{socket: socket.current, connection}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider