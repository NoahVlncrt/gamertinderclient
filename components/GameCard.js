import React from 'react';
import Image from 'next/image'
import { Box, Heading, Text, Flex, VStack } from '@chakra-ui/react';
import { usePalette } from 'react-palette';



export default function GameCard({ gameInfo }) {
    /*
        gameInfo.header;
        getPrimaryColor;
        str titleTextColor = getTitleTextColor();
        str bodyTextColor = bodyTextColor();
    */
    // let colorPalette = Vibrant.from(gameInfo.header);
    // console.log(colorPalette);
    // var primaryColor = colorPalette.getPrimaryColor().getHex();
    // var titleColor = colorPalette.getTitleTextColor().getHex();
    let primaryColor

    const { data, loading, error } = usePalette(gameInfo.header);

    let darkMuted = data.darkMuted;
    let darkVibrant = data.darkVibrant;
    let lightMuted = data.lightMuted;
    let lightVibrant = data.lightVibrant;
    let muted = data.muted;
    let vibrant = data.vibrant;

    return (
        <Box maxW="s" maxH="s" borderWidth={5} borderRadius={5} overflow="hidden" shadow="lg" size="s">
            <VStack padding={3} alignItems="left" size="xs" bg={darkMuted}>
                {/* Library image */}
                <Flex size="xs">
                    <Image height={215} width={450} src={gameInfo.header} />
                </Flex>
                {/* <Box>
                    <Image src="https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg?t=1610490805" maxWidth={230} maxHeight={108}></Image>
                </Box> */}
                <VStack alignItems="left" size="xs">
                    <Heading color="#fff" as="h2" size="md" noOfLines={2} isTruncated>{gameInfo.name}</Heading>
                    <Text color="#fff" fontSize="sm" isTruncated>Total Hours: {Math.round(gameInfo.collectivePlayTime / 60)}</Text>
                </VStack>
            </VStack>
        </Box >
    )
}