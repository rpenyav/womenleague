import LoaderFull from "./LoaderFull";

interface Props {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}

const LoadingAndErrorComponent: React.FC<Props> = ({
  isLoading,
  isError,
  error,
}) => {
  if (isLoading) {
    return (
      <div>
        <LoaderFull />
      </div>
    );
  }

  if (isError && error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return null;
};

export default LoadingAndErrorComponent;
