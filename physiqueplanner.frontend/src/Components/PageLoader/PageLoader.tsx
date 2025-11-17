import { Loader } from '@mantine/core';

interface Props {
    
}

const PageLoader = (props: Props) => {
  return (
    <div className='flex flex-col items-center justify-center'>
    <Loader color="blue" type="dots" size="xl"/>
    <h1>Loading...</h1>
    </div>
  )
}

export default PageLoader