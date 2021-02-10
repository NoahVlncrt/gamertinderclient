// import Head from 'next/head';
// import Next from 'next/image';
// import styles from '../styles/Home.module.css';
import { IconButton, Flex, Spacer, Heading, Text, Input, Button, Stack, HStack } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
import Image from 'next/image';
import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter, Router } from 'next/router';
import Fade from 'react-reveal';
// import Room from './room/[roomcode]';



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

export function LandingPage({ changeType }) {
  return (
    <Fade>
      <Stack direction="column" align="center" size="xl">
        <Text fontFamily="Inter" width="xs" fontSize="lg" fontWeight="Black" textAlign="center" fontStyle="Black">Get Started:</Text>
        <Button colorScheme="blue" width="xs" fontFamily="Inter" onClick={() => changeType("join")} >Join Room</Button>
        <Button colorScheme="blue" width="xs" fontFamily="Inter" onClick={() => changeType("create")}>Create Room</Button>

      </Stack>
    </Fade>
  )
}

export function JoinPage({ changeType }) {
  const router = useRouter()

  const [joinSteamID, setJoinID] = React.useState("")
  const handleJoinID = (event) => setJoinID(event.target.value)

  const [roomcode, setRoomCode] = React.useState("")
  const handleRoomCode = (event) => setRoomCode(event.target.value)



  const [joinRoom, { data }] = useMutation(UPDATE_JOIN_ROOM, {
    onCompleted: async (room) => {
      router.push({
        pathname: '/room/[roomcode]',
        query: { roomcode: roomcode.replace('#', '') }
      })
    }
  })
  const joinRoomLogic = () => {
    joinRoom({
      variables: {
        steamid: joinSteamID.toString(),
        roomcode: roomcode
      }
    })
  }


  return (
    // JoinRoom GUI
    <Fade>
      <Stack direction="column" align="center" size="xl">
        <Text fontFamily="Inter" fontSize="lg" fontWeight="bold" fontStyle="italic">Join Room:</Text>
        <Input width="xs" fontFamily="Inter" placeholder="Steam ID" onChange={handleJoinID} value={joinSteamID} />
        <Input width="xs" fontFamily="Inter" placeholder="Invite Code" value={roomcode} onChange={handleRoomCode} />
        <HStack direction="horizontal" align="center" size="s">
          <IconButton colorScheme="red" w="8vw" icon={<ArrowBackIcon />} onClick={() => changeType("")} />
          <IconButton colorScheme="blue" w="8vw" icon={<ArrowForwardIcon />} onClick={() => joinRoomLogic()} />
        </HStack>
      </Stack>
    </Fade>
  )
}

export function CreatePage({ changeType }) {
  const router = useRouter()
  const [createSteamID, setCreateID] = React.useState("")
  const handleCreateID = (event) => setCreateID(event.target.value)



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
    // CreateRoom GUI
    <Fade>
      <Stack direction="column" align="center" size="xl">
        <Text fontFamily="Inter" fontSize="lg" fontWeight="bold" fontStyle="italic" >Create Room:</Text>
        <Input width="xs" fontFamily="Inter" placeholder="Steam ID" value={createSteamID} onChange={handleCreateID} />
        <HStack direction="horizontal" align="center" size="s">
          <IconButton colorScheme="red" w="8vw" icon={<ArrowBackIcon />} onClick={() => changeType("")} />
          <IconButton colorScheme="blue" w="8vw" icon={<ArrowForwardIcon />} onClick={() => createRoomLogic()} />
        </HStack>
      </Stack>
    </Fade >
  )
}

export default function Home() {

  const [currentMenu, changeCurrentMenu] = React.useState("")

  return (
    // Main Page
    <Flex direction="column" align="center" bg="#f1f7fc" p={4}>
      <Flex direction='column' align="center" bg="white" maxW="3xl" maxH="3xl" border="true" borderRadius={10} borderWidth={5} shadow="md">
        <Stack align="center" p={4}>
          <Image src="/logo.svg" width={200} height={200} size="lg" p={4} />
          <Spacer size="lg" />
          <Heading as="h1" size="lg" fontFamily="Montserrat">Whats in our library?</Heading>
          <Spacer size="lg" />
          <Flex bg="#e3e8ef" borderRadius={10} h={1} w={350}></Flex>
          <Spacer size="lg" />
          // Individual pages underneath
          <Flex direction="column" justify="center">
            {currentMenu === "join" && (
              <JoinPage changeType={changeCurrentMenu} />
            )}
            {currentMenu === "create" && (
              <CreatePage changeType={changeCurrentMenu} />
            )}
            {currentMenu === "" && (
              <LandingPage changeType={changeCurrentMenu} />
            )}
          </Flex>
        </Stack>
      </Flex>
    </Flex >
  )
}