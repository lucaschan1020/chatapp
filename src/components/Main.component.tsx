import { Outlet } from 'react-router-dom';
import Notice from './Notice.component';
import PrivateChannelList from './PrivateChannelList.component';
import ServerList from './ServerList.component';

function Main() {
  return (
    <>
      <ServerList className="w-[4.5rem] flex-none bg-tertiary" />
      <div className="flex min-w-0 flex-1 flex-col overflow-y-hidden">
        <div className="bg-tertiary">
          <Notice className="bg-cyan-600">
            Want to take full advantage of Discord with better performance,
            in-game overlay, and more? Get the desktop app!
          </Notice>
        </div>
        <div className="flex min-h-0 flex-1">
          <PrivateChannelList className="flex w-60 flex-none flex-col bg-secondary" />
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default Main;
