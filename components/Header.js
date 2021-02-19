import React from 'react';
import {Text, Button, Flex, Spacer} from '@chakra-ui/react'
import Link from 'next/link'

export default function Header(){
    return (
        <Flex>
            <Spacer/>
            <Link href="/about">
                <Button margin="5px" variant="link">About</Button>
            </Link>
        </Flex>
    )
}