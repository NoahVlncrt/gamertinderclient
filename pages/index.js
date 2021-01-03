import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Flex, Spacer, Box, Heading, Text, Input, Button} from '@chakra-ui/react';
import React from 'react'

export default function Home() {
  const [roomcode, setValue] = React.useState("")
  const handleRoomCode = (event) => setValue(event.target.value)
  return (
    <Flex direction="column" align="center">
      <Heading as="h1">Tinder For Gamers - Beta</Heading>
      <Box borderWidth="1px" borderRadius="lg" rounded="lg">
        <Flex direction="column" align="center">
          <Input size="sm" placeholder="Steam ID"></Input>
          <Input size="sm" placeholder="Invite Code" value={roomcode} onChange={handleRoomCode}></Input>
          <Button>Join Room</Button>
          <Input size="sm" placeholder="Steam ID"></Input>
          <Button>Create Room</Button>
        </Flex>
      </Box>
    </Flex>
  )
}
