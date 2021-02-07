import React from 'react';
import { Box, HStack, Text, Flex, VStack } from '@chakra-ui/react';
import Image from "next/image"

export default function UserCard({ user }) {
    console.log(user);
    return (
        <Box margin={2} maxWidth="s" size="s" bg="#fff">
            <HStack borderWidth={5} borderRadius={5} overflow="hidden" shadow="lg" size="xs" padding={5}>
                <Flex minWidth={92} minHeight={92}>
                    <Image width={92} height={92} src={user.icon} />
                </Flex>
                <VStack align="left">
                    <Text noOfLines={1} maxW="md" flexWrap={true} fontWeight="bold" fontSize="xl">{user.nickname}</Text>
                    {/* <Heading as="h6" noOfLines={1} maxW="sm" isTruncated={true}>{user.nickname}</Heading> */}
                    <Text noOfLines={1}>{user.tagline}</Text>
                </VStack>
            </HStack >
        </Box>
    )
}