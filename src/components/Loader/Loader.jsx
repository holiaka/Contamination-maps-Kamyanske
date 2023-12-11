import { LoaderOverlay, Spinner } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderOverlay>
      <Spinner
        strokeColor="black"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </LoaderOverlay>
  );
};