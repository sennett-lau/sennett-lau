import { Box, Link } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import IndexProjectSectionExtraItemFrame from './IndexProjectSectionExtraItemFrame'

type Props = {
  triggerAnimation: boolean
}

const IndexProjectExtraSCL = (props: Props) => {
  const { triggerAnimation } = props

  const [isAnimationTriggered, setIsAnimationTriggered] = useState(false)

  useEffect(() => {
    if (triggerAnimation && !isAnimationTriggered) {
      setIsAnimationTriggered(true)
    }
  }, [triggerAnimation, isAnimationTriggered])

  return (
    <Link
      href='https://github.com/sennett-lau/smart-contract-library'
      target='_blank'
      textDecor={'none'}
      _hover={{
        textDecor: 'none',
      }}
      mx={'auto'}
    >
      <Box
        opacity={isAnimationTriggered ? 1 : 0}
        transform={isAnimationTriggered ? 'none' : 'translateY(100px)'}
        transition={'all .5s ease-in-out'}
      >
        <IndexProjectSectionExtraItemFrame
          name={'Smart Contract Library'}
          year={'2022'}
          stack={'Solidity · Hardhat · EtherJs · Mocha'}
          description={
            "The project features a suite of reusable smart contracts tailored for blockchain applications. Central to this are the 'TokenVesting' contract, which manages the conditional vesting of tokens, and the 'VRFRandomNumberGenerator', crucial for generating verifiable random numbers. Additional utility contracts like 'Payable' and 'Whitelist' provide essential functions like transaction management and access control. The project also integrates interfaces like 'IERC721Burnable' and 'IERC721MinterBurnable', enhancing the functionality of ERC721 tokens through minting and burning capabilities, indicating a focus on flexibility and efficiency in blockchain operations."
          }
          maxW={{
            base: '610px',
            lg: '450px',
          }}
        />
      </Box>
    </Link>
  )
}
export default IndexProjectExtraSCL
