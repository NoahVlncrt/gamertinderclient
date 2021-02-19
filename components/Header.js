import React from 'react';
import {Text, Button, Flex, Spacer} from '@chakra-ui/react'

export default function Header(){
    return (
        <Flex>
            <Spacer/>
            <Button margin="5px" variant="link">About</Button>
        </Flex>
    )
}