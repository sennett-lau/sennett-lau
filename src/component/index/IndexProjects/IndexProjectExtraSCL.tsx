import IndexProjectSectionExtraItemFrame from './IndexProjectSectionExtraItemFrame'

const IndexProjectExtraSCL = () => {
  return (
    <IndexProjectSectionExtraItemFrame
      name={'Smart Contract Library'}
      year={'2022'}
      stack={'Solidity · Hardhat · EtherJs · Mocha'}
      description={
        "The project features a suite of reusable smart contracts tailored for blockchain applications. Central to this are the 'TokenVesting' contract, which manages the conditional vesting of tokens, and the 'VRFRandomNumberGenerator', crucial for generating verifiable random numbers. Additional utility contracts like 'Payable' and 'Whitelist' provide essential functions like transaction management and access control. The project also integrates interfaces like 'IERC721Burnable' and 'IERC721MinterBurnable', enhancing the functionality of ERC721 tokens through minting and burning capabilities, indicating a focus on flexibility and efficiency in blockchain operations."
      }
      maxW={'450px'}
    />
  )
}
export default IndexProjectExtraSCL
