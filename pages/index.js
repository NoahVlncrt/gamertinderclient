import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Flex, Spacer, Box, Heading, Text, Input, Button, Container, Center, Stack, Divider } from '@chakra-ui/react';
import Image from 'next/image'
import React from 'react'
import { gql, useMutation } from '@apollo/client'
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



function LandingPage() {
  <Stack spacing={15} direction="row" justifyContent="center">
    <Flex>
      <Stack spacing={2} direction="column">
        <Text fontSize="xl" align="center" fontFamily="Oxygen">Create Room</Text>
        <Input size="sm" placeholder="Steam ID" fontFamily="Oxygen"></Input>
        <Button colorScheme="red" fontFamily="Oxygen">Create Room</Button>
      </Stack>
    </Flex>
    <Box>
      <Stack spacing={2}>
        <Text fontSize="xl" align="center" fontFamily="Oxygen">Join Room</Text>
        <Input size="sm" placeholder="Steam ID" fontFamily="Oxygen"></Input>
        <Input size="sm" placeholder="Invite Code" value={roomcode} onChange={handleRoomCode} fontFamily="Oxygen"></Input>
        <Button colorScheme="red" variant="solid" fontFamily="Oxygen">Join Room</Button>
      </Stack>
    </Box>
  </Stack>
}


export default function Home() {
  const router = useRouter()
  const [roomcode, setRoomCode] = React.useState("")
  const handleRoomCode = (event) => setRoomCode(event.target.value)

  const [joinSteamID, setJoinID] = React.useState("")
  const handleJoinID = (event) => setJoinID(event.target.value)

  const [createSteamID, setCreateID] = React.useState("")
  const handleCreateID = (event) => setCreateID(event.target.value)

  const [joinRoom, { data }] = useMutation(UPDATE_JOIN_ROOM)
  const joinRoomLogic = () => {
    joinRoom({
      variables: {
        steamid: joinSteamID.toString(),
        roomcode: roomcode
      }
    })
    router.push({
      pathname: '/room/[roomcode]',
      query: { roomcode: roomcode.replace('#', '') }
    })
  }

  const [createRoom, { room }] = useMutation(UPDATE_CREATE_ROOM, {
    onCompleted: async (room) => {
      console.log(room)
      router.push({
        pathname: '/room/[roomcode]',
        query: { roomcode: room.updatedCreateNewRoom.inviteCode.replace('#', '') }
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



  const tinderColor = "#DB6530";
  return (
    <Flex bg="#f1f7fc" align="stretch" direction="column">
      <Flex direction="column" align="center" p={10} justify="center">
        <Flex bg="white" p={10} align="center" direction="column" alignItems="center" borderRadius={10} boxShadow={5} shadow="true" borderColor="#e2eef8" borderWidth={5}>
          <Image src="/logo.png" alt="Cool Logo" width={100} height={100} />

          <Heading as="h1" fontFamily="Ubuntu">Tinder For Gamers - Beta</Heading>
          <Spacer />
          <Divider orientation="horizontal" colorScheme="red" size={100} />
          <LandingPage />
          {/* <Stack spacing={15} direction="row" justifyContent="center">
            <Flex>
              <Stack spacing={2} direction="column">
                <Text fontSize="xl" align="center" fontFamily="Oxygen">Create Room</Text>
                <Input size="sm" placeholder="Steam ID" fontFamily="Oxygen"></Input>
                <Button colorScheme="red" fontFamily="Oxygen">Create Room</Button>
              </Stack>
            </Flex>
            <Box>
              <Stack spacing={2}>
                <Text fontSize="xl" align="center" fontFamily="Oxygen">Join Room</Text>
                <Input size="sm" placeholder="Steam ID" fontFamily="Oxygen"></Input>
                <Input size="sm" placeholder="Invite Code" value={roomcode} onChange={handleRoomCode} fontFamily="Oxygen"></Input>
                <Button colorScheme="red" variant="solid" fontFamily="Oxygen">Join Room</Button>
              </Stack>
            </Box>
          </Stack> */}
        </Flex>
      </Flex>
    </Flex >
  )
}