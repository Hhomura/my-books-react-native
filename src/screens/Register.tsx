import {Heading, VStack } from "native-base"
import {useState} from 'react'
import { useNavigation } from "@react-navigation/native"
import {Alert} from 'react-native'
import Header from "../Componentes/Header"
import Input from "../Componentes/Input"
import Button from "../Componentes/Button"
import Firestore from '@react-native-firebase/firestore'

export default (() =>{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigation =  useNavigation();

    function handleNewBook(){
        if( !title || !description){
            return Alert.alert("Cadastro", "Preencha todos os campos")
        }

        setIsLoading(true);

        Firestore()
        .collection('books').add({
            title,
            description,
            status: 'reading',
            created_at: Firestore.FieldValue.serverTimestamp()
        })
        .then(() =>{
            Alert.alert("Sucesso", "Livro cadastrado com sucesso!");
            navigation.goBack();
        }).catch((error) =>{
            Alert.alert('Erro', "Erro ao Cadastrar o Livro");
        })
    }

    return(
        <VStack flex={1} p={6} bg="gray.600">
            <Header title="Novo Livro"/>

            <Input
            placeholder="Titulo"
            mt={4}
            onChangeText={setTitle}
            />

            <Input
            placeholder="Resumo"
            flex={1}
            multiline
            mt={5}
            textAlignVertical="top"
            onChangeText={setDescription
            }
            />

            <Button
            title="Cadastro"
            isLoading = {isLoading}
            onPress={handleNewBook}
            mt={6}
            mb={3}/>

        </VStack>
    )
})