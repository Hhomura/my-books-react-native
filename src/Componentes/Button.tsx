import { Button, Heading, VStack, IButtonProps } from "native-base"

type props = IButtonProps &{
    title: string;
}

export default (({title, ...rest}:props) => {
    return (
        <Button
        bg="yellow.500"
        h={14}
        width={300}
        fontSize="sm"
        rounded="sm"
        _pressed={{
            bg: "yellow.700"
        }}
        {...rest}>
            <Heading color="black" fontSize="md">
                {title}
            </Heading>
        </Button>
    )
})