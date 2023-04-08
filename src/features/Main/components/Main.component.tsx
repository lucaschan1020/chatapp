import Notice from '@/components/Notice.component';
import ServerList from '@/features/Main/components/ServerList.component';
import ChannelLayoutContainer from '@/features/Main/components/ChannelLayout.component';
import PrivateChannelList from '@/features/PrivateChannels/components/PrivateChannelList.component';
import SearchChannel from '@/features/PrivateChannels/components/SearchChannel.component';
import { Outlet } from 'react-router-dom';

const Main: React.FC = () => {
  return (
    <>
      <div className="h-screen-sv flex w-screen">
        <ServerList className="w-[4.5rem] flex-none bg-tertiary" />
        <div className="flex-rest-x flex flex-col overflow-y-hidden">
          <div className="bg-tertiary">
            <Notice>
              Want to take full advantage of Discord with better performance,
              in-game overlay, and more? Get the desktop app!
            </Notice>
          </div>
          <div className="flex-rest-y flex overflow-x-hidden">
            <ChannelLayoutContainer header={<SearchChannel />}>
              <PrivateChannelList />
            </ChannelLayoutContainer>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
