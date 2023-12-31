import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Register from "../screens/Register";
import Details from "../screens/Details";

const {Navigator, Screen} = createNativeStackNavigator()

export default (() =>{
    return(
        <Navigator screenOptions={{statusBarHidden:true, headerShown: false}}>
            <Screen name="home" component={Home}/>
            <Screen name="register" component={Register}/>
            <Screen name="details" component={Details}/>
        </Navigator>
    )
})