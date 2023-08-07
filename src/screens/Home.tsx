import { Center, FlatList, HStack, Heading, IconButton, Image, Text, VStack, useTheme } from "native-base"
import logo from '../assets/logo.png'
import {useEffect} from 'react'
import Firestore from '@react-native-firebase/firestore'
import { ChatTeardrop, SignOut } from "phosphor-react-native"
import Filter from "../Componentes/Filter";
import { useState } from 'react'
import Book, { BookProps } from "../Componentes/Book";
import sizes from "native-base/lib/typescript/theme/base/sizes";
import Button from "../Componentes/Button";
import Loading from "../Componentes/Loading";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth'
import { Alert } from "react-native";
import { dateFormart } from "../utils/FirestoreDateFormat"

export default (() => {

    const navigation = useNavigation<any | null>();
    const { colors } = useTheme();
    const [statusSelected, setStatusSelected] = useState<'reading' | 'finished'>('reading')
    const [isLoading, setSIsLoading] = useState(false);

    const [books, setBooks] = useState<BookProps[]>([
    ])

    function handleNewBook(){
        navigation.navigate('register')
    }

    function handleLogOut(){
        auth().signOut().then(() => Alert.alert("Sucesso", "Deslogado com Sucesso")).catch((erro) => Alert.alert("Erro", erro));
    }

    function handleOpenDetails(bookId: string){
        navigation.navigate('details', {bookId}); 
    }

    useEffect(() =>{
        setSIsLoading(true);
        const subscriber = Firestore().collection('books').where('status', '==', statusSelected).onSnapshot((snapshot) =>{
            const data = snapshot.docs.map(doc =>{
                const { title, description, status, created_at, finish } = doc.data();
                return {
                    id: doc.id,
                    title,
                    description,
                    status,
                    when: dateFormart(created_at)
                }
            })
            setBooks(data);
            setSIsLoading(false);
        })
        return subscriber;
    }, [statusSelected])

    return (
        <VStack flex={1} pb={6} bg="gray.600" py={8}>
            {/*Cabeçalho*/}
            <HStack // HStack é um View/div na Horizontal
                w="full"
                h="24"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                pt={10}
                pb={6}
                px={6}>
                <Image source={logo} resizeMode="contain" size="sm" alt="logo" />

                <IconButton 
                icon={<SignOut size={26} color={colors.gray[300]}/>} onPress={handleLogOut}
                />
            </HStack>

            <VStack flex={1} px={7}>

                <HStack w="full" justifyContent="space-between" alignItems="center" mt={8} mb={4} pb={6}>
                    <Heading color="gray.100">
                        Meus Livros
                    </Heading>
                    <Text color="gray.200">
                        {books.length}
                    </Text>
                </HStack>

                {/* Filtro */}
                <HStack space={3} mb={8} mt={4}>
                    <Filter
                        title="lendo"
                        type="reading"
                        isActive={statusSelected === 'reading'}
                        onPress={() => setStatusSelected('reading')} />

                    <Filter
                        title="finalizado"
                        type="finished"
                        isActive={statusSelected === 'finished'}
                        onPress={() => setStatusSelected('finished')} />
                </HStack>

                {/*Livros*/}

                {isLoading ? (
                    <Loading />
                ) : (
                    <FlatList
                        data={books}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Book data={item} onPress={() => handleOpenDetails(item.id)}/>}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        ListEmptyComponent={() => (
                            <Center pt={20}>
                                <ChatTeardrop color={colors.gray[300]} size={28} />
                                <Text color={colors.gray[300]} fontSize="lg" mt={6} textAlign="center">
                                    {statusSelected === 'reading' ? 'Você não está lendo Livros!' : 'Você ainda não leu um Livro!'}
                                </Text>
                            </Center>
                        )}
                    />
                )}

                <Button title="Novo Livro" mt={6} onPress={handleNewBook}/>
            </VStack>
        </VStack>
    )
})