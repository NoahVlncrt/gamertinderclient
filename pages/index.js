import Head from 'next/head';
import Next from 'next/image';
import styles from '../styles/Home.module.css';
import { IconButton, ArrowForwardIcon, ArrowBackIcon, Flex, Spacer, Box, Heading, Text, Input, Button, Container, Center, Stack, Divider } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter, Router } from 'next/router';
import Fade from 'react-reveal';



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
        <Text fontFamily="Inter" fontSize="lg" fontWeight="Black" fontStyle="Black">Get Started:</Text>
        <Button colorScheme="red" width="xs" fontFamily="Inter" onClick={() => changeType("join")} >Join Room</Button>
        <Button colorScheme="red" width="xs" fontFamily="Inter" onClick={() => changeType("create")}>Create Room</Button>
      </Stack>
    </Fade>
  )
}

export function JoinPage() {
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
    <Fade>
      <Stack direction="column" align="center" size="xl">
        <Text fontFamily="Ubuntu" fontSize="lg" fontWeight="bold" fontStyle="italic">Join Room:</Text>
        <Input width="xs" fontFamily="Ubuntu" placeholder="Steam ID" onChange={handleJoinID} value={joinSteamID} />
        <Input width="xs" fontFamily="Ubuntu" placeholder="Invite Code" value={roomcode} onChange={handleRoomCode} />
        <Button colorScheme="red" width="xs" fontFamily="Inter" onClick={() => joinRoomLogic()}>Submit</Button>
      </Stack>
    </Fade>
  )
}

export function CreatePage() {
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
    <Fade>
      <Stack direction="column" align="center" size="xl">

        <Text fontFamily="Inter" fontSize="lg" fontWeight="bold" fontStyle="italic" >Create Room:</Text>
        <Input width="xs" fontFamily="Inter" placeholder="Steam ID" value={createSteamID} onChange={handleCreateID} />
        <Button colorScheme="red" width="xs" fontFamily="Inter" onClick={() => createRoomLogic()} />
        {/* <IconButton colorScheme="red" width="xs" fontFamily="Inter" icon={<ArrowForwardIcon />} onClick={() => createRoomLogic()} />
        <IconButton colorScheme="red" width="xs" fontFamily="Inter" icon={<ArrowBackIcon />}></IconButton> */}
      </Stack>
    </Fade >
  )
}

export default function Home() {

  const [currentMenu, changeCurrentMenu] = React.useState("")

  return (
    <Flex direction="column" align="center" bg="#f1f7fc" p={4}>
      <Flex direction='column' align="center" bg="white" maxW="3xl" maxH="3xl" border="true" borderRadius={10} borderWidth={4}>
        <Stack align="center" p={4}>
          <Image src="/logo.svg" width={200} height={200} size="lg" p={4} />
          <Spacer size="lg" />
          <Heading as="h1" size="lg" fontFamily="Montserrat">Tinder For Gamers - Beta</Heading>
          <Spacer size="lg" />
          <Flex bg="#e3e8ef" borderRadius={10} h={1} w={350}></Flex>
          <Spacer size="lg" />
          <Flex direction="column" justify="center">
            {currentMenu === "join" && (
              <JoinPage />
            )}
            {currentMenu === "create" && (
              <CreatePage />
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