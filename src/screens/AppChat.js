
import React, { useState, useEffect, useCallback, Component } from 'react'
import { GiftedChat, InputToolbar, } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, TextInput, View, LogBox, Button, ScrollView } from 'react-native'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { EmailContext } from '../Providers/EmailContext'


const firebaseConfig = {
    apiKey: "AIzaSyCOP1omhBK24tXV1dGnR1jHmHFOlGSZkI4",
    authDomain: "marq2-768c9.firebaseapp.com",
    projectId: "marq2-768c9",
    storageBucket: "marq2-768c9.appspot.com",
    messagingSenderId: "846953979788",
    appId: "1:846953979788:web:9732fb760997b1041700a9",
    measurementId: "G-2X3M3X3F85"
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}


const db = firebase.firestore()

export default props => {
    const [user, setUser] = useState("Marq")
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])
    const { id } = React.useContext(EmailContext)
    const chatsRef = db.collection('usuarios').doc(String(id)).collection('chats')

    useEffect(() => {
        readUser()
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot.docChanges().filter(({ type }) => type === 'added').map(({ doc }) => {
                const message = doc.data()
                return { ...message, createdAt: message.createdAt.toDate() }
            }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
        return () => unsubscribe()
    }, [])

    const appendMessages = useCallback(
        (messages) => { setMessages((previousMessages) => GiftedChat.append(previousMessages, messages)) },
        [messages]
    )

    async function readUser() {
        const user = await AsyncStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }
    async function handlePress() {
        const _id = 1232 //Math.random().toString(36).substring(7)
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }
    async function handleSend(messages) {
        const writes = messages.map((m) => chatsRef.add(m))
        await Promise.all(writes)
    }
    return (

        <View style={{ backgroundColor: "#d8f6ff", flex: 1 }}>

            <GiftedChat //listViewProps={{style: {backgroundColor: 'purple',},}} 
                messages={messages} user={user} onSend={handleSend} user={{ _id: 'Marq', }} />


        </View>
        // <GiftedChat renderSystemMessage={props => (<View style={{backgroundColor:'red',alignSelf:'center'}} ><Text style={{alignSelf:'center'}}>Marq</Text></View>)} renderInputToolbar={props => ( <InputToolbar {...props} containerStyle={{ backgroundColor: "black", }}  /> )} /> 
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    cupertinoButtonInfo: {
        height: 61,
        width: 325,
        backgroundColor: "rgba(80,227,194,1)",
        shadowColor: "rgba(155,155,155,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        textDecorationColor: "#0073ba"


    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
})