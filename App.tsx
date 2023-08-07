import { NativeBaseProvider} from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import {THEME} from './src/styles/themes'
import Loading from './src/Componentes/Loading'
import SignIn from './src/screens/SignIn'
import Routes from './src/routes/index'

export default (() =>{

  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})

  return (
    <NativeBaseProvider theme={THEME}>
      
      {fontsLoaded ? (
        <Routes/>
      ):(
        <Loading/>
      )}
    </NativeBaseProvider>
  )
})