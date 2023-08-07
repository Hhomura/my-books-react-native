import React, {useState} from 'react'
import auth from '@react-native-firebase/auth'
import { Heading, Icon, Image, VStack, useTheme } from "native-base";
import { useNavigation } from '@react-navigation/native';
import Input from "../Componentes/Input";
import { Envelope, Key } from "phosphor-react-native";
import logo from '../assets/logo.png'
import Button from "../Componentes/Button";
import { Alert } from 'react-native';

export default (() => {

    const {colors} = useTheme();
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation<any | null>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSignin(){
        
        if(!email && !password){
            return Alert.alert("Erro", "Preencha todos os campos!")
        }

        if(!email && password){
            return Alert.alert("Erro", "Preencha o campo do email!")
        }

        if(email && !password){
            return Alert.alert("Erro", "Preencha o campo da senha!")
        }

        setLoading(!loading)

        auth().signInWithEmailAndPassword(email, password).then(() =>{
            Alert.alert("Sucesso", "Logado com Sucesso!");
        }).catch((error) =>{
            setLoading(false);

            var msgError = "Ocorreu um erro ao fazer Login:  "+error;

            if(error.code === 'auth/invalid-email'){
                msgError = "Email inválido!"
            }

            if(error.code === 'auth/wrong-password'){
                msgError = "E-mail ou Senha inválida!"
            }

            if(error.code === 'auth/user-not-found'){
                msgError = "Usuário não encontrado"
            }

            return Alert.alert('Erro', msgError);
        })

    }

    return (
        <VStack flex={1} bg="gray.600" alignItems="center" px={8} py={24}>

            <Image source={logo} resizeMode="contain" size="xl" alt="logo"/>

            <Heading color="gray.100" fontSize="xl" mt={10} mb={6}>
                Acesse sua conta
            </Heading>
            <Input
            placeholder="E-mail"
            InputLeftElement={<Icon as = {<Envelope color={colors.gray[300]}/>} ml={4}/>}
            keyboardType="email-address"
            autoCapitalize="none"
            mb={4}
            onChangeText={setEmail}
            />
            <Input
            placeholder="Senha"
            InputLeftElement={<Icon as = {<Key color={colors.gray[300]}/>} ml={4}/>}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect = {false}
            mb={8}
            onChangeText={setPassword}
            />

            <Button title="Entrar"
             w="full"
             isLoading ={loading}
             onPress={handleSignin}
             />
        </VStack>
    )
})
