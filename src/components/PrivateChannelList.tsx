import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import PrivateChannel from '../interfaces/PrivateChannel';
import { AppState } from '../state';
import { ChangeCurrentChat } from '../state/actions/CurrentChatActionCreator';
import { AddPrivateChannelList } from '../state/actions/PrivateChannelListActionCreator';
import AvatarIcon from './AvatarIcon';
import Icon from './Icon';

const mapStateToProps = (state: AppState) => {
  return { PrivateChannelList: state.PrivateChannelList };
};
const connector = connect(mapStateToProps, {
  AddPrivateChannelList,
  ChangeCurrentChat,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

interface props extends PropsFromRedux {
  className?: string;
}

function PrivateChannelList({
  className = '',
  PrivateChannelList,
  AddPrivateChannelList,
  ChangeCurrentChat,
}: props) {
  useEffect(() => {
    const privateChannels: PrivateChannel[] = [
      { participants: ['sadsadasd| Elexir Wizard', 'Jackson Wong'] },
      { participants: ['Jay'] },
      { participants: ['Alex'] },
      { participants: ['Sam'] },
      { participants: ['Jeremy', 'Kelvin'] },
      { participants: ['Sam', 'Lucas', 'Ming Fong', 'Desmond', 'Mun Haw'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
      { participants: ['Sam'] },
    ];

    AddPrivateChannelList(privateChannels);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className}>
      <div className="shadow-elevation-low flex h-12 w-60 flex-none">
        <button className="bg-tertiary font-primary text-muted m-[0.55rem] flex-auto rounded-[0.25rem] px-[0.375rem] text-left text-sm">
          Find or start a conversation
        </button>
      </div>
      <div className="-webkit-scrollbar:h-2 -webkit-scrollbar:w-2 -webkit-scrollbar-thumb:min-h-[2.5rem] -webkit-scrollbar-thumb:rounded -webkit-scrollbar-thumb:border-2 -webkit-scrollbar-thumb:border-solid -webkit-scrollbar-thumb:border-transparent -webkit-scrollbar-thumb:bg-transparent -webkit-scrollbar-thumb:bg-clip-padding hover:-webkit-scrollbar-thumb:bg-scrollbar-thin-thumb flex flex-col overflow-y-scroll pt-2">
        <div className="text-channel-default hover:bg-modifier-hover hover:text-interactive-hover my-[0.0625rem] ml-[0.5rem] flex h-[2.625rem] flex-none  cursor-pointer items-center justify-start rounded-[0.25rem] active:bg-[rgba(79,84,92,0.24)] active:text-white">
          <Icon.Friends className="ml-3 h-6 w-6" />
          <label className="font-primary ml-4 font-medium">Friends</label>
        </div>
        <div className="text-channel-default hover:bg-modifier-hover hover:text-interactive-hover my-[0.0625rem] ml-[0.5rem] flex h-[2.625rem] flex-none cursor-pointer items-center justify-start rounded-[0.25rem] active:bg-[rgba(79,84,92,0.24)] active:text-white">
          <Icon.Nitro className="ml-3 h-6 w-6" />
          <label className="font-primary ml-4 font-medium">Nitro</label>
        </div>
        <div className="text-channel-default hover:text-interactive-hover flex h-10 flex-none items-center justify-between pt-[1.125rem] pr-[0.5rem] pb-[0.25rem] pl-[1.125rem]">
          <label className="font-display h-[1.125rem] cursor-default text-xs font-semibold tracking-[0.015625rem]">
            DIRECT MESSAGES
          </label>
          <Icon.DMPlus className="h-4 w-4 cursor-pointer" />
        </div>
        {PrivateChannelList.map((privateChannel, index) => (
          <div
            key={index}
            className="group text-channel-default hover:bg-modifier-hover hover:text-interactive-hover my-[0.0625rem] ml-[0.5rem] flex h-[2.625rem] flex-none  cursor-pointer items-center justify-start rounded-[0.25rem] px-2 active:bg-[rgba(79,84,92,0.24)] active:text-white"
            onClick={() => ChangeCurrentChat(privateChannel)}
          >
            <AvatarIcon
              src={
                privateChannel.avatarSrc ? privateChannel.avatarSrc : undefined
              }
            />
            <div className="ml-3 flex flex-1 flex-col truncate">
              <label className="font-primary cursor-pointer truncate text-base font-medium leading-5">
                {privateChannel.participants.join(', ')}
              </label>
              {privateChannel.participants.length > 1 && (
                <label className="font-primary mt-[-0.125rem] cursor-pointer truncate text-xs font-medium">
                  {privateChannel.participants.length} Members
                </label>
              )}
            </div>

            <Icon.Cross className="text-channel-default hover:text-interactive-hover active:text-interactive-active ml-auto mr-[0.125rem] hidden h-4 w-4 flex-none group-hover:block" />
          </div>
        ))}
      </div>
      <div className="bg-secondary-alt mt-auto flex h-[3.3125rem] flex-none items-center px-2">
        <AvatarIcon />
        <span className="font-primary ml-2 mr-1 flex w-[5.25rem] flex-col justify-center">
          <label className="text-header-primary truncate text-sm font-semibold leading-[1.125rem]">
            GhostShadow
          </label>
          <label className="text-header-secondary text-xs font-medium leading-[0.8125rem]">
            #9005
          </label>
        </span>
        <div className="flex flex-1 justify-around">
          <button className="text-interactive-normal hover:bg-modifier-hover hover:text-interactive-hover h-8 w-8 rounded-[0.25rem]">
            <Icon.Mute className="mx-auto" />
          </button>
          <button className="text-interactive-normal hover:bg-modifier-hover hover:text-interactive-hover h-8 w-8 rounded-[0.25rem]">
            <Icon.Deafen className="mx-auto" />
          </button>
          <button className="text-interactive-normal hover:bg-modifier-hover hover:text-interactive-hover h-8 w-8 rounded-[0.25rem]">
            <Icon.Setting className="mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default connector(PrivateChannelList);
