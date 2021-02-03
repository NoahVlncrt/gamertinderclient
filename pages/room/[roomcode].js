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
    query getSimiliarGames($gamers: [String]) {
        getSimiliarGames(gamers: $gamers) {
            name
            appID
            header
            collectivePlayTime
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


function Room(props) {
    const roomCode = `#${props.roomcode}`

    const [selectedUsers, updateUsers] = useState([])
    const {loading: roomLoading, data: roomInfo, error: roomError} = useQuery(GET_ROOM_INFO, {
        variables: {roomcode: roomCode},
        onCompleted: data => {
            let initialUsers = data.getRoomInfo.map((user) => {
                return user.steamID
            })
            console.log(data)
            updateUsers(initialUsers)
        }
    })
    const {loading: gameLoading, data:gameData, error: gameError} = useQuery(GET_MATCHING_GAMES, {
        variables: {gamers: selectedUsers}
    })
    if(roomLoading) return <p>loading</p>
    if(roomError) return <p>{roomError}</p>

    if(gameLoading) return <p>loading</p>
    if(gameError) return <p>error</p>
    console.log(gameData)



    return(
        <div>
            <Heading>{roomCode}</Heading>
            {roomInfo.getRoomInfo.map((user) => {            
                return <ButtonController key={user.steamID} selectedUsers={selectedUsers} user={user} name={user.steamID}></ButtonController>
            })}
            <Flex wrap="wrap">
                {gameData.getSimiliarGames.map((game) => {
                    return <Box borderWidth={1} margin="5px">
                        <Image height={100} width={200} src={game.header}/>
                        <Text>{game.name}</Text>
                        <Text>{game.collectivePlayTime}</Text>
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