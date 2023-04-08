interface FullScreenProps {
  children?: React.ReactNode;
}

const FullScreen: React.FC<FullScreenProps> = ({ children }) => {
  return <div className="h-screen-sv flex w-screen">{children}</div>;
};

export default FullScreen;
