import UserVoiceControls from '@/features/Main/components/UserVoiceControls.component';

interface ChannelLayoutProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
}

const ChannelLayoutContainer: React.FC<ChannelLayoutProps> = ({
  header,
  children,
}) => {
  return (
    <div className="flex w-60 flex-col bg-secondary">
      <div className="flex h-12 w-60 flex-col shadow-elevation-low">
        {header}
      </div>
      <div className="scrollbar-2 scrollbar-thumb-rounded scrollbar-thumb-border hover-scrollbar-thumb flex-rest-y flex flex-col overflow-y-scroll pt-2 -webkit-scrollbar-thumb:min-h-[2.5rem] -webkit-scrollbar-thumb:bg-transparent">
        {children}
      </div>
      <div className="flex h-[3.3125rem] items-center bg-secondary-alt px-2">
        <UserVoiceControls />
      </div>
    </div>
  );
};

export default ChannelLayoutContainer;
