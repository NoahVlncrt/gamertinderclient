import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { Flex, Text, Button, Heading, useControllableState, Box, HStack, VStack, Spacer, Center, Container, Grid } from '@chakra-ui/react'
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
        <Box bg="#f1f7fc">
            <VStack>
                <VStack justifyContent="flex=start">
                    <Heading as="h1">What's in our library?</Heading>
                    <Text>RoomCode: {roomCode}</Text>
                </VStack>
                <HStack justifyContent="space-between" width="100%" alignItems="flex-start">
                    <Head>
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    </Head>

                    {/* Games grid */}
                    <VStack margin="lg" spacing="md" maxH="6xl">
                        <Grid templateColumns="repeat(3,1fr)" gap={3} borderRadius={5} padding={3} margin={5} bg="#D2DCE1" minH="md">
                            {gameData.getSimiliarGames.map((game) => {
                                return (
                                    <GameCard gameInfo={game} />
                                )
                            })}
                        </Grid>
                    </VStack>


                    <Spacer />

                    {/* Player cards grid */}
                    <VStack alignItems="flex-end" minW="lg" margin="lg" spacing="md">
                        <Grid templateColumns="repeat(1, 1fr)" gap={5} borderRadius={5} padding={5} margin={5} bg="#D2DCE1" maxW="sm">
                            {roomInfo.getRoomInfo.map((user) => {
                                return <UserCard user={user} />
                            })}
                        </Grid>
                    </VStack>

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