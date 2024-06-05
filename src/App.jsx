import {
  Container,
  Heading,
  Box,
  Stack,
  Text,
  Input,
  Button,
  Collapse,
  Fade,
} from '@chakra-ui/react'
import { useState } from 'react'
import superagent from 'superagent'

function App() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])
  const [show, setShow] = useState(true)

  async function sendMessage(event) {
    event.preventDefault()
    setHistory((prev) => [
      ...prev,
      { role: 'user', parts: [{ text: message }] },
    ])
    setMessage('')
    try {
      const { text } = await superagent
        .post('http://localhost:3000/gemini')
        .send({ message, history })

      setHistory((prev) => [
        ...prev,
        { role: 'model', parts: [{ text: text }] },
      ])
    } catch (error) {
      console.error(error)
    }
  }

  function establishTitle(event) {
    event.preventDefault()
    setShow(false)
    setHistory([
      {
        role: 'user',
        parts: [
          { text: `Hello, I am interviewing for a job title of ${title}.` },
        ],
      },
      {
        role: 'model',
        parts: [{ text: 'Tell me more about yourself' }],
      },
    ])
  }

  return (
    <>
      <Container maxW='container.md'>
        <Heading>A I nterviewer </Heading>
        <Box>
          <Text>Job Title</Text>
          <Stack direction={'row'} paddingBottom={2}>
            <Input
              borderWidth='4px'
              borderRadius='lg'
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              readOnly={!show}
            />
            <Fade in={show}>
              <Button onClick={establishTitle}>submit</Button>
            </Fade>
          </Stack>
        </Box>
        <Box borderWidth='4px' borderRadius='lg' minHeight={300}>
          <Stack spacing={2} alignItems='flex-start'>
            {history.map(({ role, parts }, i) => {
              return (
                <Box
                  display='inline-block'
                  borderRadius={'sm'}
                  padding={2}
                  key={i}
                  backgroundColor={role == 'user' ? '#B2F5EA' : '#BEE3F8'}
                  alignSelf={role === 'user' ? 'flex-start' : 'flex-end'}
                >
                  {role == 'user' ? (
                    <Text>
                      {'Me'}: {parts[0].text}
                    </Text>
                  ) : (
                    <Text>{parts[0].text}</Text>
                  )}
                </Box>
              )
            })}
          </Stack>
        </Box>
        <Collapse in={!show}>
          <Stack direction={'row'} paddingTop={2}>
            <Input
              borderWidth='4px'
              borderRadius='lg'
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <Button onClick={sendMessage}>send message</Button>
          </Stack>
        </Collapse>
      </Container>
    </>
  )
}

export default App
