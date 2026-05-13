import { useSelector } from 'react-redux'

import { Flex } from '@chakra-ui/react'

import { RootState } from '@/store'

import IndexProjectExtraAINA from './IndexProjectExtraAINA'
import IndexProjectExtraLCSD from './IndexProjectExtraLCSD'
import IndexProjectExtraSCL from './IndexProjectExtraSCL'
import IndexProjectImageSelf from './IndexProjectImageSelf'
import IndexProjectSectionExtraTopFrame from './IndexProjectSectionExtraTopFrame'

const IndexProjectSectionExtra = () => {
  const subsectionId = useSelector(
    (state: RootState) => state.controlSlice.subsectionId,
  )

  return (
    <Flex
      w={'100%'}
      flexDir={'column'}
      color={'themeLight.500'}
      id={'projects-extra'}
    >
      <IndexProjectSectionExtraTopFrame
        triggerAnimation={subsectionId === 'projects-extra'}
      />
      <Flex
        mb={{
          base: '40px',
          lg: '95px',
        }}
      >
        <Flex
          flex={1}
          pt={{
            base: '52px',
            lg: '110px',
          }}
        >
          <IndexProjectExtraAINA
            triggerAnimation={subsectionId === 'projects-extra'}
          />
        </Flex>
        <Flex
          w={'fit-content'}
          pr={'31px'}
          display={{
            base: 'none',
            lg: 'flex',
          }}
        >
          <IndexProjectImageSelf
            triggerAnimation={subsectionId === 'projects-extra'}
          />
        </Flex>
      </Flex>
      <Flex
        flexDir={{
          base: 'column',
          lg: 'row',
        }}
        px={{
          base: '4px',
          lg: '0',
        }}
        gap={{
          base: '40px',
          lg: '0',
        }}
      >
        <Flex
          flex={1}
          pt={{
            base: '0',
            lg: '60px',
          }}
          pl={{
            base: '0',
            lg: '84px',
          }}
        >
          <IndexProjectExtraSCL
            triggerAnimation={subsectionId === 'projects-extra'}
          />
        </Flex>
        <Flex w={'fit-content'} mx={'auto'}>
          <IndexProjectExtraLCSD
            triggerAnimation={subsectionId === 'projects-extra'}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IndexProjectSectionExtra
