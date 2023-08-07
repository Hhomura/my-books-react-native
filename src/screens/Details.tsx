import { ScrollView, VStack, useTheme } from "native-base"
import { Alert } from 'react-native'
import { useState, useEffect } from 'react'
import Firestore from '@react-native-firebase/firestore'
import Header from "../Componentes/Header"
import { BookProps } from "../Componentes/Book"
import { useNavigation, useRoute } from "@react-navigation/native"
import BookDetails from "../Componentes/BookDetails"
import { CircleWavyCheck, ClipboardText } from "phosphor-react-native"
import Button from "../Componentes/Button"
import Loading from "../Componentes/Loading"
import { BookFirestoreDTO } from "../DTOs/BookDTO"
import { dateFormart } from "../utils/FirestoreDateFormat"
//import {dateFormat} from '../utils/FirestoreDateFormat'

type RouteParams = {
    bookId: string
}

type BookDetails = BookProps & {
    title: string;
    description: string;
    closed: string;
    when: string
}

export default (() => {

    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();
    const { bookId } = route.params as RouteParams;
    const { colors } = useTheme()
    const [book, setBook] = useState<BookDetails>({} as BookDetails)


    function handleFinish() {
        Firestore().collection('books').doc(bookId).update({
            status: 'finished',
            finish: Firestore.FieldValue.serverTimestamp()
        }).then(() => {
            Alert.alert("Sucesso", "Parabéns pela leitura do Livro.")
            navigation.goBack();
        }).catch((error) => {
            console.log("Erro", error);
            Alert.alert("Erro", "Ocorreu um erro a finalizar Leitura.");
        })
    }


    useEffect(() => {
        Firestore().collection<BookFirestoreDTO>('books').doc(bookId).get().then(doc => {
            if (doc.exists) {
                const { title, description, status, created_at, finish } = doc.data();
                const closed = finish ? dateFormart(finish) : null;
                setBook({
                    id: doc.id,
                    title,
                    description,
                    status,
                    closed,
                    when: dateFormart(created_at)
                })
            }
            setIsLoading(false);
        })
    }, [])


    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bg="gray.600" px={8}>
            <ScrollView mx={5} showsVerticalScrollIndicator={false}>
                <Header title="Nome do Livro" />
                <BookDetails title={book.title} description={book.description} icon={CircleWavyCheck} />

                <BookDetails title="Início da Leitura" description={book.when} icon={CircleWavyCheck} />

                <BookDetails title="Resumo" description={book.description} icon={ClipboardText} />

                {book.status == 'finished' && (
                    <BookDetails title="Término da Leitura" description={book.closed} icon={CircleWavyCheck} />
                )}

            </ScrollView>
            {book.status == 'reading' && (
                <Button title="Marcar como lido" mt={6} onPress={handleFinish} />
            )}
        </VStack>
    )
})