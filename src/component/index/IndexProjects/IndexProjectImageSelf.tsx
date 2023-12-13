import { Flex, Image } from '@chakra-ui/react'

const IndexProjectImageSelf = () => {
  return (
    <Flex w={'340px'} h={'264px'} gap={'8px'}>
      <Image src={'/assets/me/a.png'} w={'50px'} h={'212px'} mt={'33px'} />
      <Image src={'/assets/me/b.png'} w={'50px'} h={'212px'} mt={'52px'} />
      <Image src={'/assets/me/c.png'} w={'50px'} h={'212px'} mt={'19px'} />
      <Image src={'/assets/me/d.png'} w={'50px'} h={'212px'} mt={'40px'} />
      <Image src={'/assets/me/e.png'} w={'50px'} h={'212px'} mt={'0px'} />
      <Image src={'/assets/me/f.png'} w={'50px'} h={'212px'} mt={'40px'} />
    </Flex>
  )
}

export default IndexProjectImageSelf
