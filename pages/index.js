import { IconButton, Flex, Spacer, Heading, Text, Input, Button, Stack, HStack, Box, useToast, VStack } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'

import Image from 'next/image';
import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Fade from 'react-reveal';
import Header from '../components/Header'
import Head from 'next/head';

//graphql data fetching
const UPDATE_JOIN_ROOM = gql`
  mutation updatedJoinRoom($steamid: String, $roomcode: String) {
    updatedJoinRoom(steamid: $steamid, roomcode: $roomcode){
      id
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
const footerData = [
  {
    name: "Item1",
    route: "/",
  },
  {
    name: "Item 2",
    route: "/"
  },
  {
    name: "Item 3",
    route: "/",
  },
]

const footerSocial = [
  {
    icon: "fab fa-facebook-f",
    route: "/",
  },
  {
    icon: "fab fa-twitter",
    route: "/"
  },
  {
    icon: "fab fa-youtube",
    route: "/",
  },
  {
    icon: "fab fa-linkedin-in",
    route: "/",
  },
  {
    icon: "fab fa-instagram",
    route: "/",
  },
]


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

  const toast = useToast()

  const [joinRoom, { data, loading: joinLoading, error: joinError }] = useMutation(UPDATE_JOIN_ROOM, {
    onCompleted: async (room) => {
      router.push({
        pathname: '/room/[roomcode]',
        query: { roomcode: roomcode.replace('#', '') }
      })
    },
    onError: async (room) => {
      toast({
        title: "Cannot join room.",
        description: "SteamID or Roomcode is invalid",
        status: "error",
        duration: 9000,
        isClosable: true,
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
          <IconButton colorScheme="blue" w="8vw" icon={<ArrowForwardIcon />} onClick={() => joinRoomLogic()} isLoading={joinLoading}/>
        </HStack>
      </Stack>
    </Fade>
  )
}

export function CreatePage({ changeType }) {
  const router = useRouter()
  const [createSteamID, setCreateID] = React.useState("")
  const handleCreateID = (event) => setCreateID(event.target.value)
  const toast = useToast()



  const [createRoom, { room, loading: createLoading, error: createError }] = useMutation(UPDATE_CREATE_ROOM, {
    onCompleted: async (room) => {
      console.log(room)
      router.push({
        pathname: '/room/[roomcode]',
        query: { roomcode: room.updatedCreateNewRoom.inviteCode.replace('#', '') }
      })
    },
    onError: async (error) => {
      console.log(error)
      toast({
        title: "Cannot create room.",
        description: "SteamID is invalid",
        status: "error",
        duration: 9000,
        isClosable: true,
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
          <IconButton colorScheme="blue" w="8vw" icon={<ArrowForwardIcon />} onClick={() => createRoomLogic()} isLoading={createLoading}/>
        </HStack>
      </Stack>
    </Fade >
  )
}

export default function Home() {

  const [currentMenu, changeCurrentMenu] = React.useState("")

  return (
    // Main Page
    <Box bg="#f1f7fc">
      <Head>
        <title>What's in Our Library</title>
      </Head>
      <Header/>
      <Flex direction="column" align="center" bg="#f1f7fc" p={4} minH="xl" minW="xl">
        <Flex direction='column' align="center" bg="white" size="lg" border="true" borderRadius={10} borderWidth={5} p={5} shadow="md">
          <Stack align="center" alignItems="center">
            <Image src="/logo.svg" width="md" height="md" size="lg" />
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
        <VStack marginTop="15px">
          <Heading>F.A.Q</Heading>

          <Heading size="md">How Do I Get Started?</Heading>
          <Text>Click "Join Room" and paste your Steam ID in. Once you create a room send your friend the room code and have them join.</Text>
          <Heading size="md">How Do I Join A Room?</Heading>
          <Text>Click Join room and put the roomcode and your Steam ID in. Then click the next arrow.</Text>
        </VStack>
      </Flex >
    </Box>
  )
}