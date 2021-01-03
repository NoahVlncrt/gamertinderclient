import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Flex, Spacer, Box, Heading, Text, Input, Button} from '@chakra-ui/react';
import React from 'react'
import {gql, useMutation} from '@apollo/client'
import { useRouter, Router } from 'next/router'

//graphql data fetching
const UPDATE_JOIN_ROOM = gql`
  mutation updatedJoinRoom($steamid: String, $roomcode: String) {
    updatedJoinRoom(steamid: $steamid, roomcode: $roomcode){
      id
      memberIds
      inviteCode
    }
  }
`
const UPDATE_CREATE_ROOM = gql`
  mutation updatedCreateNewRoom($steamid: String){
    updatedCreateNewRoom(steamid: $steamid){
      id
      inviteCode
    }
  }
`




export default function Home() {
  const router = useRouter()
  const [roomcode, setRoomCode] = React.useState("")
  const handleRoomCode = (event) => setRoomCode(event.target.value)

  const [joinSteamID, setJoinID] = React.useState("")
  const handleJoinID = (event) => setJoinID(event.target.value)

  const [createSteamID, setCreateID] = React.useState("")
  const handleCreateID = (event) => setCreateID(event.target.value)

  const [joinRoom, {data}] = useMutation(UPDATE_JOIN_ROOM)
  const joinRoomLogic = () => {
    joinRoom({
      variables: {
        steamid: joinSteamID.toString(),
        roomcode: roomcode
      }
    })
    router.push({
      pathname: '/room/[roomcode]',
      query: {roomcode: roomcode.replace('#', '')}
    })
  }

  const [createRoom, {room}] = useMutation(UPDATE_CREATE_ROOM,{
    onCompleted: async(room) => {
      console.log(room)
      router.push({
        pathname: '/room/[roomcode]',
        query: {roomcode: room.updatedCreateNewRoom.inviteCode.replace('#','')}
      })
    }
  })
  const createRoomLogic = () => {
    console.log(createSteamID.toString())
    createRoom({
      variables: {
        steamid: createSteamID.toString()
      }
    })

  }


  return (
    <Flex direction="column" align="center">
      <Heading as="h1">Tinder For Gamers - Beta</Heading>
      <Box borderWidth="1px" borderRadius="lg" rounded="lg">
        <Flex direction="column" align="center">
          <Input size="sm" placeholder="Steam ID" value={joinSteamID} onChange={handleJoinID}></Input>
          <Input size="sm" placeholder="Invite Code" value={roomcode} onChange={handleRoomCode}></Input>
          <Button onClick={() => joinRoomLogic()}>Join Room</Button>
          <Input size="sm" placeholder="Steam ID" value={createSteamID} onChange={handleCreateID}></Input>
          <Button onClick={()=> createRoomLogic()}>Create Room</Button>
        </Flex>
      </Box>
    </Flex>
  )
}
