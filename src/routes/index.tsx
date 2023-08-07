import { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import SignIn from '../screens/SignIn'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import Loading from '../Componentes/Loading'
import AppRoutes from "./appRoutes"

export default  (() =>{
    const [loading,setLoading] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User>();

    
    useEffect(() =>{
        const subscriber = auth().onAuthStateChanged(response =>{
            console.log(`Response`, response);
            setUser(response);
            setLoading(false);
        })
    }, [])

    if(loading){
        return <Loading/>
    }

    return(
        <NavigationContainer>
            {user? (
                <AppRoutes/>
            ):(
                <SignIn/>
            )}
        </NavigationContainer>
    )
})