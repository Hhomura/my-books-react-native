import { VStack, Text, Button, IButtonProps, useTheme } from "native-base"

type props = IButtonProps & {
    title: string;
    isActive?: boolean;
    type: "reading" | "finished"
}
export default(({title, isActive = false, type, ...rest} : props) =>{
    const {colors} = useTheme();

    const colorType = type === 'reading' ? colors.green[500] : colors.secondary[700]

    return(
        <Button
        variant="outline"
        borderWidth={isActive? 1 : 0}
        borderColor={colorType}
        bgColor="gray.600"
        flex={1}
        size="sm"
        {...rest}>
            <Text color={isActive ? colorType : "gray.300"} fontSize="xs" textTransform="uppercase">
                {title}
            </Text>
        </Button>
    )
})