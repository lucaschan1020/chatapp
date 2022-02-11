import Notice from './components/Notice';
import PrivateChannelList from './components/PrivateChannelList';
import ServerList from './components/ServerList';
import './index.css';

function App() {
  return (
    <div className="flex h-screen">
      <ServerList className=" flex-none w-[4.5rem] bg-tertiary" />
      <div className="flex-1 flex flex-col">
        <Notice className="bg-cyan-600">hello notice</Notice>
        <div className="flex-1 flex min-h-0">
          <PrivateChannelList className="flex-none w-60 bg-secondary flex flex-col" />
          <div className="flex-1 bg-primary"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
