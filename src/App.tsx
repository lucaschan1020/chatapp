import Notice from './components/Notice';
import PrivateChannelList from './components/PrivateChannelList';
import ServerList from './components/ServerList';
import './index.css';

function App() {
  return (
    <div className="flex items-stretch h-screen">
      <ServerList className=" flex-none w-18 bg-zinc-900" />
      <div className="flex-1 flex items-stretch flex-col">
        <Notice className="bg-cyan-600">hello notice</Notice>
        <div className="flex-1 flex items-stretch">
          <PrivateChannelList className="flex-none w-60 bg-zinc-800 flex flex-col items-stretch" />
          <div className="flex-1 bg-zinc-700"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
