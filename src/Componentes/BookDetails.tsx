import { HStack, Text, VStack, useTheme } from "native-base"
import { IconProps } from "phosphor-react-native";
import {ElementType} from 'react'

type Props = {
    title: string;
    description: string;
    icon: ElementType<IconProps>
}

export default (({title, description, icon: Icon}: Props) =>{
    const {colors} = useTheme();

    return(
        <VStack bg="gray.600" p={5} mt={5} rounded="sm">
            <HStack alignItems="center" mb="4">
                <Icon color={colors.primary[700]}/>
                <Text ml={2} color="gray.300" fontSize="sm" textTransform="uppercase">
                    {title}
                </Text>
            </HStack>
            {!!description &&(
                <Text color="gray.100" fontSize="md">
                    {description}
                </Text>
            )}
        </VStack>
    )
})