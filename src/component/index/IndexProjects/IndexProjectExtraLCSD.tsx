import IndexProjectSectionExtraItemFrame from './IndexProjectSectionExtraItemFrame'

const IndexProjectExtraLCSD = () => {
  return (
    <IndexProjectSectionExtraItemFrame
      name={'LCSD Captcha Solver'}
      year={'2022'}
      stack={'Python · Tensorflow'}
      description={
        "A dockerized service that employs deep learning to solve captchas for the Leisure and Cultural Services Department (LCSD) of Hong Kong SAR Government's Online Booking system. It utilizes OpenCV for image processing and an attention-based OCR (Optical Character Recognition) deep learning model developed with TensorFlow and TensorFlow Serving. The project focuses on fine-tuning the deep learning model to effectively decipher the captchas used by LCSD's system."
      }
      maxW={'465px'}
      isReverse={true}
    />
  )
}
export default IndexProjectExtraLCSD
