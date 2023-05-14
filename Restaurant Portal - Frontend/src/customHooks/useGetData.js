import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase.config'

const useGetData = (collectionName) => {
    const [data, setData] = useState([])
    const collectionRef = collection(db, collectionName)

    useEffect(() => {
        let getData = async () => {
            await onSnapshot(collectionRef, snapshot => {
                setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                
                
            })
        }
        getData()
    }, [])

    return { data }

}

export default useGetData
