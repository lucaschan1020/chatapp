import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import leadingZero from '../utilities/leading-zero';
import AvatarIcon from './AvatarIcon.component';
import Icon from './Icon.component';

interface PrivateChannelListProps {
  className?: string;
}

function PrivateChannelList({ className = '' }: PrivateChannelListProps) {
  const CurrentUser = useAppSelector((state) => state.CurrentUser);
  const PrivateChannelList = useAppSelector(
    (state) => state.PrivateChannelList
  );

  return (
    <div className={className}>
      <div className="flex flex-col overflow-y-hidden">
        <div className="flex h-12 w-60 flex-none shadow-elevation-low">
          <button className="m-[0.55rem] flex-auto rounded-[0.25rem] bg-tertiary px-[0.375rem] text-left font-primary text-sm font-medium leading-6 text-muted">
            Find or start a conversation
          </button>
        </div>
        <div className="scrollbar-2 scrollbar-thumb-rounded scrollbar-thumb-border hover-scrollbar-thumb flex flex-col overflow-y-scroll pt-2 -webkit-scrollbar-thumb:min-h-[2.5rem] -webkit-scrollbar-thumb:bg-transparent">
          <NavLink to="/channels/@me" end>
            {({ isActive }) => (
              <div
                className={`${
                  isActive
                    ? 'bg-modifier-active text-interactive-active'
                    : 'text-channel-default'
                } my-[0.0625rem] ml-[0.5rem] flex h-[2.625rem] flex-none cursor-pointer items-center justify-start rounded-[0.25rem] hover:bg-modifier-hover hover:text-interactive-hover`}
              >
                <Icon.Friends className="ml-3 h-6 w-6" />
                <label className="ml-4 font-primary font-medium">Friends</label>
              </div>
            )}
          </NavLink>
          <div className="my-[0.0625rem] ml-[0.5rem] flex h-[2.625rem] flex-none cursor-pointer items-center justify-start rounded-[0.25rem] text-channel-default hover:bg-modifier-hover hover:text-interactive-hover active:bg-modifier-active active:text-interactive-active">
            <Icon.Nitro className="ml-3 h-6 w-6" />
            <label className="ml-4 font-primary font-medium">Nitro</label>
          </div>
          <div className="flex h-10 flex-none items-center justify-between pt-[1.125rem] pr-[0.5rem] pb-[0.25rem] pl-[1.125rem] text-channel-default hover:text-interactive-hover">
            <label className="h-[1.125rem] cursor-default font-display text-xs font-semibold uppercase tracking-[0.015625rem]">
              Direct Messages
            </label>
            <Icon.DMPlus className="h-4 w-4 cursor-pointer" />
          </div>
          {!PrivateChannelList ||
            (Object.keys(PrivateChannelList).length === 0 && (
              <Icon.EmptyPrivateChannelList className="fill-primary p-4" />
            ))}
          {PrivateChannelList &&
            Object.keys(PrivateChannelList).length > 0 &&
            Object.values(PrivateChannelList).map((privateChannel) => (
              <NavLink
                to={`/channels/@me/${privateChannel._id}`}
                key={privateChannel._id}
              >
                {({ isActive }) => (
                  <div
                    className={`${
                      isActive
                        ? 'bg-modifier-active text-interactive-active'
                        : 'text-channel-default'
                    } group my-[0.0625rem] ml-[0.5rem] flex h-[2.625rem] flex-none cursor-pointer items-center justify-start rounded-[0.25rem] px-2 hover:bg-modifier-hover hover:text-interactive-hover`}
                  >
                    <AvatarIcon
                      src={
                        !privateChannel.isGroup
                          ? privateChannel.participants[0].avatar
                          : undefined
                      }
                    />
                    <div className="ml-3 flex flex-1 flex-col truncate">
                      <label className="cursor-pointer truncate font-primary text-base font-medium leading-5">
                        {privateChannel.isGroup
                          ? privateChannel.privateChannelName
                          : privateChannel.participants[0].username}
                      </label>
                      {privateChannel.participants.length > 1 && (
                        <label className="mt-[-0.125rem] cursor-pointer truncate font-primary text-xs font-medium">
                          {privateChannel.participants.length} Members
                        </label>
                      )}
                    </div>

                    <Icon.Cross className="ml-auto mr-[0.125rem] hidden h-4 w-4 flex-none text-channel-default hover:text-interactive-hover active:text-interactive-active group-hover:block" />
                  </div>
                )}
              </NavLink>
            ))}
        </div>
      </div>
      <div className="mt-auto flex h-[3.3125rem] flex-none items-center bg-secondary-alt px-2">
        <AvatarIcon src={CurrentUser?.avatar} />
        <span className="ml-2 mr-1 flex w-[5.25rem] flex-col justify-center font-primary">
          <label className="truncate text-sm font-semibold leading-[1.125rem] text-header-primary">
            {CurrentUser?.name}
          </label>
          <label className="text-xs font-medium leading-[0.8125rem] text-header-secondary">
            #{leadingZero(CurrentUser?.discriminator ?? 0, 4)}
          </label>
        </span>
        <div className="flex flex-1 justify-around">
          <button className="text-interactive h-8 w-8 rounded-[0.25rem] hover:bg-modifier-hover">
            <Icon.Mute className="mx-auto" />
          </button>
          <button className="text-interactive h-8 w-8 rounded-[0.25rem] hover:bg-modifier-hover">
            <Icon.Deafen className="mx-auto" />
          </button>
          <button className="text-interactive h-8 w-8 rounded-[0.25rem] hover:bg-modifier-hover">
            <Icon.Setting className="mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivateChannelList;
