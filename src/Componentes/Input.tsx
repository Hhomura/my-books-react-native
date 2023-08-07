import { IInputProps, Input } from "native-base";

export default (({...rest}:IInputProps) =>{
    return(
        <Input 
        bg="gray.700"
        h={14}
        size="md"
        fontFamily="body"
        color="white"
        placeholderTextColor="gray.300"
        _focus={{
            borderWidth: 1,
            borderColor: "yellow.500",
            bg: "gray.700"
        }}
        {...rest}>
        </Input>
    )
})