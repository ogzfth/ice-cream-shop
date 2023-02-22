import React, { useEffect, useState } from "react";
import {  
  ChakraProvider,
  Box,
  Flex,
  Button,  
  Text, 
  Grid,
  Circle,
  Stack,
} from "@chakra-ui/react";
import { TriangleDownIcon } from '@chakra-ui/icons'

const App = (props) => {
  const [orderedFlavors, setOrderedFlavors] = useState([]);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [score, setScore] = useState(0);
  const [scoopDraw, setScoopDraw] = useState([]);
  

  const startTheGame = () => {
    const flavors = 'caramel pistachio strawberry '
    .repeat(3)
    .trim()
    .split(' ')
    .sort(() => (Math.random() > 0.5 ? 1 : -1))
    .slice(0,3)

setOrderedFlavors(flavors);
  
  };

  useEffect(() => {
    startTheGame();
  }, []);

  const [numSelectedFlavors, setNumSelectedFlavors] = useState(0);

  const onFlavorSelected = (flavor, color) => {
    let currentState = [...selectedFlavors, flavor];
    setSelectedFlavors(currentState);
    setNumSelectedFlavors((num) => num + 1);
    setScoopDraw(scoopDraw => [...scoopDraw, <Circle key={numSelectedFlavors} size='60px' bg={color} color='white' />]);
    if (isOrderCorrect(currentState)) {
      setScore(score + 1);
      
    }
  };

const isOrderCorrect = (currentState) => {
  
  if (currentState.length !== orderedFlavors.length) {
    return false;
  }
  for (let i = 0; i < orderedFlavors.length; i++) {
    if (currentState[i] !== orderedFlavors[i]) {
      return false;
    }
  }
  return true;

};


useEffect(() => {
  if (numSelectedFlavors === orderedFlavors.length) {
    
    setSelectedFlavors([]);
    setNumSelectedFlavors(0);

    // Reset the scoop draw after a delay of 1 second
    setTimeout(() => {
      setScoopDraw([]);
    }, 100);

    startTheGame();    
  }
  else if (numSelectedFlavors % 3 === 0 && numSelectedFlavors !== 0) {
    // Reset the scoop draw after a delay of 1 second
    setTimeout(() => {
      setScoopDraw([]);
    }, 100);
  }
}, [numSelectedFlavors]);



  return (
    <ChakraProvider>
      <Grid> 
      
          <Flex>
          <Button onClick={() => onFlavorSelected('pistachio', 'green')} bg='green' m='5' w= '30%' h= '150px'>Pistachio</Button>
          <Button onClick={() => onFlavorSelected('caramel', 'sandybrown')} bg='sandybrown' m='5'w= '30%' h= '150px'>Caramel</Button>
          <Button onClick={() => onFlavorSelected('strawberry', 'tomato') } bg='tomato' m='5'w= '30%' h= '150px'>Strawberry</Button> 
          </Flex>  
        
        <Box>
          <Text m={'5'} align={'center'}>Customer's Order: {orderedFlavors.join(', ')}</Text>
          <Text m={'5'} align={'center'}>Score: {score}</Text>
        </Box>
        
        
        <Box p={'5'} h={'50px'}>       
            <Stack align={'center'} m={'-1'} direction={['column']} spacing='-5'>
              {scoopDraw}          
            </Stack>
        </Box>        
        
      </Grid> 
    </ChakraProvider>
  );
}

export default App;