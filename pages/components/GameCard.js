import React from 'react';
import Image from 'next/image'
import { Box, Heading, Text, Flex, VStack } from '@chakra-ui/react';

export default function GameCard({ gameInfo }) {
    console.log(gameInfo);
    return (
        <Box maxW="s" borderWidth={5} borderRadius={5} overflow="hidden" shadow="lg" size="xs">
            <VStack padding={3} alignItems="left" size="xs">
                {/* Library image */}
                <Flex size="xs">
                    <Image height={215} width={450} src={gameInfo.header} />
                </Flex>
                {/* <Box>
                    <Image src="https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg?t=1610490805" maxWidth={230} maxHeight={108}></Image>
                </Box> */}
                <VStack alignItems="left" size="xs">
                    <Heading as="h2" size="md" noOfLines={2} isTruncated>{gameInfo.name}</Heading>
                    <Text fontSize="sm" isTruncated>Total Hours: {Math.round(gameInfo.collectivePlayTime / 60)}</Text>
                </VStack>
            </VStack>
        </Box >
    )
}