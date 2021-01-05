import Head from 'next/head';
import { Next } from 'next/image';
import styles from '../../styles/Home.module.css';
import { Flex, Spacer, Box, Heading, Text, Input, Button, Container, Center, Stack, Divider, Image, Icon, createIcon } from '@chakra-ui/react';
import React from 'react';
import { gql, useMutation } from '@apollo/client';
// import { useRouter, Router } from 'next/router';
import Fade from 'react-reveal';

// TODO: Add Functionality of buttons
export default function RoomPage() {
    return (
      <Fade>
        <Flex direction="column" align="center" bg="#f1f7fc" p={4}>
          <Flex direction='column' bg="white" width="6xl" border="true" borderRadius={10} borderWidth={4}>
            <Flex direction="row" justifyContent="start" alignItems="center" p={4}>
              {/* <Image src="../public/logo.png" width={100} height={100} p={4} /> */}
              <Image fallbackSrc="../../public/logo.png" />
              <Button colorScheme="red"></Button>
              <Button colorScheme="blue"></Button>
            </Flex>
          </Flex>
        </Flex >
      </Fade>
    )
  }

