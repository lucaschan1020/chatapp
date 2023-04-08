import Icon from '@/components/Icon.component';
import PrivateChannelMenu from '@/features/PrivateChannels/components/PrivateChannelMenu.component';
import PrivateChannelNavigateButton from '@/features/PrivateChannels/components/PrivateChannelNavigateButton.component';
import useGetPrivateChannels from '@/hooks/use-get-private-channels.hook';
import { NavLink } from 'react-router-dom';

const PrivateChannelList: React.FC = () => {
  const { data: privateChannels } = useGetPrivateChannels();

  return (
    <>
      <PrivateChannelMenu />
      {!privateChannels ||
        (Object.keys(privateChannels).length === 0 && (
          <Icon.EmptyPrivateChannelList className="min-h-[28.75rem] min-w-[13.5rem] fill-primary p-4" />
        ))}
      {privateChannels &&
        Object.keys(privateChannels).length > 0 &&
        Object.values(privateChannels).map((privateChannel) => (
          <NavLink
            to={`/channels/@me/${privateChannel.id}`}
            key={privateChannel.id}
          >
            {({ isActive }) => {
              const icon = !privateChannel.isGroup
                ? Object.values(privateChannel.participants)[0].avatar
                : undefined;
              const title = privateChannel.isGroup
                ? privateChannel.privateChannelName
                : Object.values(privateChannel.participants)[0].username;
              const description = privateChannel.isGroup
                ? `${Object.values(privateChannel.participants).length} Members`
                : undefined;

              return (
                <PrivateChannelNavigateButton
                  key={privateChannel.id}
                  isActive={isActive}
                  icon={icon}
                  title={title}
                  description={description}
                />
              );
            }}
          </NavLink>
        ))}
    </>
  );
};

export default PrivateChannelList;
