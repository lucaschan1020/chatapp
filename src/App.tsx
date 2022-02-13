import ChatView from './components/ChatView';
import Notice from './components/Notice';
import PrivateChannelList from './components/PrivateChannelList';
import ServerList from './components/ServerList';
import './index.css';

function App() {
  return (
    <div className="flex h-screen">
      <ServerList className=" flex-none w-[4.5rem] bg-tertiary" />
      <div className="flex-1 flex flex-col">
        <div className="bg-tertiary">
          <Notice className="bg-cyan-600">
            Want to take full advantage of Discord with better performance, in-game overlay, and more? Get the desktop app!
          </Notice>
        </div>
        <div className="flex-1 flex min-h-0">
          <PrivateChannelList className="flex-none w-60 bg-secondary flex flex-col" />
          <ChatView className="flex-1 bg-primary flex flex-col" />
        </div>
      </div>
    </div>
  );
}

export default App;
