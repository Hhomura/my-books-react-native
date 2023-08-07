import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'

export type BookFirestoreDTO = {
    title: string
    description: string
    status: 'reading' | 'finished'
    created_at: FirebaseFirestoreTypes.Timestamp
    finish?: FirebaseFirestoreTypes.Timestamp
}