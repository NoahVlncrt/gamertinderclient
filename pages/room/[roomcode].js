import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { Flex, Text, Button, Heading, useControllableState, Box, HStack, VStack, Spacer, Center, Container } from '@chakra-ui/react'
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import Image from 'next/image'
import GameCard from '../../components/GameCard'
import UserCard from '../../components/UserCard'
import Head from 'next/head'


const GET_ROOM_INFO = gql`
    query getRoomInfo($roomcode: String) {
        getRoomInfo(roomcode: $roomcode) {
            nickname
            steamID
            icon
            tagline
        }
    }
`
const GET_MATCHING_GAMES = gql`
    query getSimiliarGames($gamers: [String]) {
        getSimiliarGames(gamers: $gamers) {
            name
            appID
            header
            collectivePlayTime
        }
    }
`

function ButtonController({ selectedUsers, user, click }) {
    if (selectedUsers.includes(user.steamID)) {
        return (
            <Button variant="solid" onClick={() => click(user.steamID)}>{user.nickname}</Button>
        )
    }
    return (
        <Button variant="outline">{user.nickname}</Button>
    )
}


function Room(props) {
    const roomCode = `#${props.roomcode}`

    const [selectedUsers, updateUsers] = useState([])
    const { loading: roomLoading, data: roomInfo, error: roomError } = useQuery(GET_ROOM_INFO, {
        variables: { roomcode: roomCode },
        onCompleted: data => {
            let initialUsers = data.getRoomInfo.map((user) => {
                return user.steamID
            })
            console.log(data)
            updateUsers(initialUsers)
        }
    })
    const { loading: gameLoading, data: gameData, error: gameError } = useQuery(GET_MATCHING_GAMES, {
        variables: { gamers: selectedUsers }
    })
    if (roomLoading) return <p>loading</p>
    if (roomError) return <p>{roomError}</p>

    if (gameLoading) return <p>loading</p>
    if (gameError) return <p>error</p>
    console.log(gameData)



    return (
            <Box bgGradient="linear(to-t, #DB4D47, #FF4D47)">
                <VStack >
                    <VStack alignContent="left">
                        <Heading as="h1">Tinderforgamers</Heading>
                        <Text>RoomCode: {roomCode}</Text>
                    </VStack>
                    <HStack>
                        {/* <Flex align="center" w="6xl" direction="vertical" minW="6xl" padding={5} alignItems="stretch" justifyContent="center" grow={1}> */}
                        <Head>
                            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                        </Head>

                        <VStack margin="lg" spacing="md">
                            <Flex wrap="wrap" maxH="6xl" maxW="xl" borderRadius={5} borderWidth={5} margin={5} padding={5} overflowY="scroll" align="center" >
                                {gameData.getSimiliarGames.map((game) => {
                                    return (
                                        <GameCard gameInfo={game} />
                                    )
                                })}
                            </Flex>
                        </VStack>
                        <Spacer />


                        <VStack alignItems="right" minW="lg">
                            <VStack margin="lg" spacing="md" minW="lg">
                                {roomInfo.getRoomInfo.map((user) => {
                                    return <UserCard user={user} />
                                })}
                            </VStack>
                        </VStack>

                        {/* </Flex > */}
                    </HStack>
                </VStack>
            </Box>
    )
}

Room.getInitialProps = ({ query }) => {
    return {
        roomcode: query.roomcode
    }
}


export default Room