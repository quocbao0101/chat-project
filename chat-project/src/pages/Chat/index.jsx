/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Flex, Text, Box, Skeleton, Stack, Avatar, Textarea } from '@chakra-ui/react';
// import { AiOutlineSend } from 'react-icons/ai';
// import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold } from '@google/generative-ai';

const runChat = async (value, his) => {
  const MODEL_NAME = 'gemini-1.0-pro';
  const API_KEY = 'AIzaSyDDWH5V3FWVbai_YeHx4YGq041NU_nelCg';
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },

  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: his,
  });

  const result = await chat.sendMessage(value);
  const { response } = result;
  return {
    text: response.text(),
    history: await chat.getHistory(),
  };
};

function Chat({ user }) {
  const [input, setInput] = useState('');
  const [recentPromt, setRecentPromt] = useState('');
  // const [prevPromts, setPrevPromts] = useState([]);
  const [history, setHistory] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 30 * index);
  };
  const onSent = async (value) => {
    try {
      setResultData('');
      setLoading(true);
      setShowResult(true);
      setRecentPromt(value);
      setInput('');
      const res = await runChat(value, history);
      if (res) {
        const arr = res?.text?.split('**');
        let newResponse = '';
        for (let i = 0; i < arr.length; i++) {
          if (i === 0 || i % 2 !== 1) {
            newResponse += arr[i];
          } else {
            newResponse += `<b>${arr[i]}</b>` || '';
          }
        }
        const response2 = newResponse?.split('*').join('<li>');
        // const response3 = response2?.split('```').join('<div style="background: #f0f4f9; padding: 8px; border-radius: 4px">');
        // const response4 = response3?.split('```').join('</div>');
        const newArr = response2?.split(' ');
        for (let i = 0; i < newArr.length; i++) {
          const nextWord = newArr[i];
          delayPara(i, `${nextWord} `);
        }
        setHistory(res.history);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      setInput('');
      onSent(input);
    }
  };

  return (
    <Flex
      p={4}
      w="full"
      direction="column"
      overflow="auto"
      h="90%"
    >
      <Flex w="full">
        <Text fontWeight={600}>Chatbots</Text>
      </Flex>
      <Flex
        w="full"
        paddingInline="10%"
        pt={20}
      >
        <Flex w="full">
          {!showResult ? (
            <Box>
              <Text
                style={{
                  WebkitTextFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  backgroundSize: '400% 100%',
                }}
                backgroundClip="text"
                fontSize="3.5rem"
                fontWeight={600}
                background="linear-gradient(74deg,var(--chakra-colors-messenger-400) 0,var(--chakra-colors-purple-600) 9%,var(--chakra-colors-orange-600) 20%,var(--chakra-colors-orange-600) 24%,var(--chakra-colors-purple-600) 35%,var(--chakra-colors-messenger-400) 44%,var(--chakra-colors-purple-600) 50%,var(--chakra-colors-orange-600) 56%,var(--chakra-colors-twitter-50) 75%,var(--chakra-colors-twitter-50) 100%)"
              >
                Hi
                {' '}
                {user?.user_metadata?.full_name || user?.email}
                !
              </Text>
              <Text
                fontSize="3.5rem"
                fontWeight={600}
                color="#c4c7c5"
              >
                How can I help you today?
              </Text>
            </Box>
          )
            : (
              <Box w="full">
                <Flex alignItems="center" gap={2} marginBottom={8}>
                  <Avatar src={user?.user_metadata?.avatar_url} name={user?.user_metadata?.full_name || user?.email} />
                  <Text wordBreak="break-word" whiteSpace="pre-line">{recentPromt}</Text>
                </Flex>
                {loading ? (
                  <Stack w="full">
                    <Skeleton fadeDuration={30} startColor="#4285f4" endColor="rgba(0,0,0,0.1)" height="25px" />
                    <Skeleton fadeDuration={45} startColor="#4285f4" endColor="rgba(0,0,0,0.1)" height="25px" />
                    <Skeleton fadeDuration={60} startColor="#4285f4" endColor="rgba(0,0,0,0.1)" w="70%" height="25px" />
                  </Stack>
                ) : (
                  <Flex gap={2}>
                    <Text fontWeight={600}>Chatbot:</Text>
                    <Text dangerouslySetInnerHTML={{ __html: resultData?.replace(/\n/g, '<br>') }} />
                  </Flex>
                )}
              </Box>
            )}
        </Flex>
        <Flex position="fixed" width="80%" bottom="3%">
          <Textarea
            onKeyPress={handleKeyPress}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            w="full"
            size="md"
            zIndex={100}
            placeholder="Type something"
            borderRadius="20"
            resize="none"
            background="#f0f4f9"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Chat;
