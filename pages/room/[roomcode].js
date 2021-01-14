import React, { useState } from 'react';
import { useRouter } from 'next/router'
import {Flex, Text, Button, Heading, useControllableState, Box} from '@chakra-ui/react'
import { gql, useQuery, useLazyQuery} from '@apollo/client';
import Image from 'next/image'

const GET_ROOM_INFO = gql`
    query getRoomInfo($roomcode: String) {
        getRoomInfo(roomcode: $roomcode) {
            nickname
            steamID
        }
    }
`
const GET_MATCHING_GAMES = gql`
    query updatedFindSimiliarGames($roomusers: [String]) {
        updatedFindSimiliarGames(roomusers: $roomusers) {
            id
            name
            appID
            header
        }
    }
`

function ButtonController({selectedUsers, user, click}){
    if(selectedUsers.includes(user.steamID)){
        return (
            <Button variant="solid" onClick={() => click(user.steamID)}>{user.nickname}</Button>
        )
    }
    return(
        <Button variant="outline">{user.nickname}</Button>
    )
}

function GameList({users}) {
    const [getGames, {loading, data, error}] = useLazyQuery(GET_MATCHING_GAMES)
    if(loading) return <p>loading</p>
    if(error) return <p>error</p>
    if(users.length > 0){
        console.log(users)
        getGames({variables: {roomusers: users}})
    }
    return (
        <Flex>
            <p>yeet</p>
            {data.updatedFindSimiliarGames.map((game) => {
                return <p>test</p>
            })}
        </Flex>
    )
}





function Room(props) {
    const roomCode = `#${props.roomcode}`

    const [selectedUsers, updateUsers] = useState([])
    const {loading: roomLoading, data: roomInfo, error: roomError} = useQuery(GET_ROOM_INFO, {
        variables: {roomcode: roomCode},
        onCompleted: data => {
            let initialUsers = data.getRoomInfo.map((user) => {
                return user.steamID
            })
            updateUsers(initialUsers)
        }
    })
    const {loading: gameLoading, data:gameData, error: gameError} = useQuery(GET_MATCHING_GAMES, {
        variables: {roomusers: selectedUsers}
    })
    if(roomLoading) return <p>loading</p>
    if(roomError) return <p>{roomError}</p>

    if(gameLoading) return <p>loading</p>
    if(gameError) return <p>error</p>



    return(
        <div>
            <Heading>{roomCode}</Heading>
            {roomInfo.getRoomInfo.map((user) => {            
                return <ButtonController key={user.steamID} selectedUsers={selectedUsers} user={user} name={user.steamID}></ButtonController>
            })}
            <Flex wrap="wrap">
                {gameData.updatedFindSimiliarGames.map((game) => {
                    return <Box borderWidth={1} margin="5px">
                        <Image height={100} width={200} src={game.header}/>
                        <Text>{game.name}</Text>
                    </Box>
                })}
            </Flex>
        </div>
    )
}

Room.getInitialProps = ({query}) => {
    return {
        roomcode: query.roomcode
    }
}


export default Room