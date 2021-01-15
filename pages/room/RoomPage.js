import Head from 'next/head';
import { Next } from 'next/image';
import styles from '../../styles/Home.module.css';
import { Flex, Spacer, Box, Heading, Text, Input, Button, Container, Center, Stack, Divider, Icon, createIcon, VStack } from '@chakra-ui/react';
import React from 'react';
import { gql, useMutation } from '@apollo/client';
// import { useRouter, Router } from 'next/router';
import Fade from 'react-reveal';
import Image from 'next/image';

export const displayUser = () => {
  <Flex></Flex>
}

// TODO: Add Functionality of buttons
export default function RoomPage() {
  return (
    <Fade>
      <Flex direction="column" align="center" bg="#f1f7fc" p={4}>
        <Flex direction='column' bg="white" width="6xl" border="true" borderRadius={10} borderWidth={4}>
          <Flex direction="row" justifyContent="center" alignItems="center" p={4}>
            <Image src="/../public/logo.svg" width={50} height={50} p={4} />
            <Heading size="md">gamertinder</Heading>
            {/* <Icon></Icon> */}
            {/* <Image fallbackSrc="../../public/logo.png" /> */}
          </Flex>
          <Flex direction="row" justifyContent="start" alignItems="center" p={4}>
            <VStack>

            </VStack>
          </Flex>
        </Flex>
      </Flex >
    </Fade >
  )
}

