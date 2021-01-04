import Head from 'next/head'
import Next from 'next/image'
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



// TODO: Add Functionality of buttons
export function LandingPage() {
  return (
    <Stack direction="column" align="center" size="xl">
      <Text fontFamily="Oxygen" fontSize="lg" fontWeight="bold" fontStyle="italic">Get Started:</Text>
      <Button colorScheme="red" width="xs" fontFamily="Oxygen">Join Room</Button>
      <Button colorScheme="red" width="xs" fontFamily="Oxygen">Create Room</Button>
    </Stack>
  )
}

export function JoinPage() {
  return (
    <Stack direction="column" align="center" size="xl">
      {/* CODE FROM STARTING COMMIT. DOES NOT FUNCTION BECAUSE OF STATE*/}
      {/*<Input size="sm" placeholder="Steam ID" value={joinSteamID} onChange={handleJoinID}></Input>
      <Input size="sm" placeholder="Invite Code" value={roomcode} onChange={handleRoomCode}></Input>
      <Button onClick={() => joinRoomLogic()}>Join Room</Button> */}
      <Text fontFamily="Oxygen" fontSize="lg" fontWeight="bold" fontStyle="italic">Join Room:</Text>
      <Input width="xs" fontFamily="Oxygen" placeholder="Steam ID" />
      <Input width="xs" fontFamily="Oxygen" placeholder="Invite Code" />
      <Button colorScheme="red" width="xs" fontFamily="Oxygen">Submit</Button>
    </Stack>
  )
}

export function CreatePage() {
  return (
    <Stack direction="column" align="center" size="xl">
      {/* CODE FROM STARTING COMMIT. DOES NOT FUNCTION BECAUSE OF STATE*/}
      {/* 
      <Input size="sm" placeholder="Steam ID" value={createSteamID} onChange={handleCreateID}></Input>
            <Button onClick={() => createRoomLogic()}>Create Room</Button> */}
      <Text fontFamily="Oxygen" fontSize="lg" fontWeight="bold" fontStyle="italic">Create Room:</Text>
      <Input width="xs" fontFamily="Oxygen" placeholder="Steam ID" />
      <Button colorScheme="red" width="xs" fontFamily="Oxygen">Submit</Button>
    </Stack>
  )
}

export function RoomPage() {
  return (
    <Flex direction="column" align="center" bg="#f1f7fc" p={5}>
      <Flex direction='column' bg="white" width="6xl" border="true" borderRadius={10} borderWidth={5}>
        <Flex direction="row" justifyContent="start" alignItems="center" p={5}>
          <Image src="/logo.png" width={100} height={100} p={5} />
          <Button colorScheme="red"></Button>
          <Button colorScheme="blue"></Button>
        </Flex>
      </Flex>
    </Flex >
  )
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


  return (
    <RoomPage />
    // <Flex direction="column" align="center" bg="#f1f7fc" p={5}>
    //   <Flex direction='column' align="center" bg="white" size="lg" border="true" borderRadius={10} borderWidth={5}>
    //     <Stack align="center" p={5}>
    //       <Image src="/logo.png" width={100} height={100} size="lg" p={5} />
    //       <Spacer size="lg" />
    //       <Heading as="h1" size="lg" fontFamily="Ubuntu">Tinder For Gamers - Beta</Heading>
    //       <Spacer size="lg" />
    //       {/* SUPER RATCHET DIV */}
    //       <Flex bg="#e3e8ef" borderRadius={10} h={1} w={350}></Flex>
    //       <Spacer size="lg" />
    //       <Flex direction="column" justify="center">

    //         {/* FOR TESTING PURPOSES */}
    //         {/* <LandingPage /> */}

    //         {/* <JoinPage /> */}

    //         {/* <CreatePage /> */}



    //         {/* <Input size="sm" placeholder="Steam ID" value={joinSteamID} onChange={handleJoinID}></Input>
    //         <Input size="sm" placeholder="Invite Code" value={roomcode} onChange={handleRoomCode}></Input>
    //         <Button onClick={() => joinRoomLogic()}>Join Room</Button>
    //         <Input size="sm" placeholder="Steam ID" value={createSteamID} onChange={handleCreateID}></Input>
    //         <Button onClick={() => createRoomLogic()}>Create Room</Button> */}
    //       </Flex>
    //     </Stack>
    //   </Flex>
    // </Flex >
  )
}