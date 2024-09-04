import { useMediaQuery } from 'react-responsive';

const useDevice = () => {
  const isPc = useMediaQuery({ query: '(min-width: 1024px)' });

  return {
    isPc,
  };
};

export default useDevice;
