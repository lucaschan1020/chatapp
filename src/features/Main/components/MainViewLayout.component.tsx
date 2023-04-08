interface MainViewLayoutProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
}

const MainViewLayout: React.FC<MainViewLayoutProps> = ({
  header,
  children,
}) => {
  return (
    <div className="flex-rest-x flex flex-col bg-primary">
      <div className="z-[2] flex h-12 items-center px-2 shadow-elevation-low">
        {header}
      </div>
      <div className="flex-rest-y flex">{children}</div>
    </div>
  );
};

export default MainViewLayout;
