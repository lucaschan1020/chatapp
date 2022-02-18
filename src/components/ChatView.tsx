import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../state';
import AvatarIcon from './AvatarIcon';
import Icon from './Icon';

const mapStateToProps = (state: AppState) => {
  return { CurrentChat: state.CurrentChat };
};
const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface props extends PropsFromRedux {
  className?: string;
}

function ChatView({ className = '', CurrentChat }: props) {
  const [viewMemberList, setViewMemberList] = useState(false);

  return (
    <div className={className}>
      <div className="shadow-elevation-low z-[2] flex h-12 flex-none items-center px-2">
        <div className="text-muted mx-2">
          <Icon.Alias />
        </div>
        <div className="font-display text-header-primary font-semibold">
          {CurrentChat?.participants.join(', ')}
        </div>
        <div className="ml-auto flex">
          <div className="text-interactive-normal hover:text-interactive-hover mx-2 cursor-pointer">
            <Icon.AudioCall />
          </div>
          <div className="text-interactive-normal hover:text-interactive-hover mx-2 cursor-pointer">
            <Icon.VideoCall />
          </div>
          <div className="text-interactive-normal hover:text-interactive-hover mx-2 cursor-pointer">
            <Icon.Pin />
          </div>

          <div className="text-interactive-normal hover:text-interactive-hover mx-2 cursor-pointer">
            <Icon.AddMember />
          </div>
          {CurrentChat && CurrentChat?.participants.length > 1 && (
            <div
              className="text-interactive-normal hover:text-interactive-hover mx-2 cursor-pointer"
              onClick={() => setViewMemberList(!viewMemberList)}
            >
              <Icon.Members />
            </div>
          )}
          <div className="text-normal mx-2 flex">
            <input
              className="bg-tertiary font-primary placeholder:text-muted placeholder-not-shown:w-[13.25rem] h-6 w-[7.25rem] flex-1 rounded-l pl-[0.375rem] text-sm font-medium leading-5 outline-none transition-[width] duration-[250ms] focus:w-[13.25rem]"
              placeholder="Search"
              type="text"
            />
            <div className="bg-tertiary text-muted flex h-6 w-7 cursor-text items-center justify-center rounded-r px-[0.125rem]">
              <Icon.MagnifyingGlass />
            </div>
          </div>
          <div className="text-interactive-normal hover:text-interactive-hover mx-2 cursor-pointer">
            <Icon.DMInbox />
          </div>
          <div className="text-interactive-normal hover:text-interactive-hover mx-2 cursor-pointer">
            <Icon.Help />
          </div>
        </div>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="flex flex-1 flex-col">
          <div className="-webkit-scrollbar:h-4 -webkit-scrollbar:w-4 -webkit-scrollbar-thumb:min-h-[2.5rem] -webkit-scrollbar-thumb:rounded-lg -webkit-scrollbar-thumb:border-4 -webkit-scrollbar-thumb:border-solid -webkit-scrollbar-thumb:border-transparent -webkit-scrollbar-thumb:bg-tertiary -webkit-scrollbar-thumb:bg-clip-padding -webkit-scrollbar-track:rounded-lg -webkit-scrollbar-track:border-4 -webkit-scrollbar-track:border-solid -webkit-scrollbar-track:border-transparent -webkit-scrollbar-track:bg-scrollbar-auto-track -webkit-scrollbar-track:bg-clip-padding flex flex-1 flex-col-reverse overflow-y-scroll">
            <div className="min-h-[1.875rem]"></div>
            {[...Array(200)].map(() => {
              return (
                <div className="hover:bg-message-hover group relative mt-[1.0625rem] flex min-h-[2.75rem] flex-none flex-col py-[0.125rem] pl-[4.5rem]">
                  <div className="absolute left-4">
                    <AvatarIcon
                      className="mt-[0.125rem] cursor-pointer"
                      height="h-10"
                      width="w-10"
                    />
                  </div>
                  <div className="flex">
                    <span className="font-primary text-header-primary cursor-pointer text-base font-medium leading-[1.375rem] hover:underline">
                      GhostShadow
                    </span>
                    <span className="font-primary text-muted mt-[0.0625rem] ml-2 h-4 text-xs font-medium leading-[1.375rem]">
                      09/18/2020
                    </span>
                  </div>
                  <div className="font-primary text-normal text-base font-normal leading-[1.375rem]">
                    yeah
                  </div>
                  <div className="shadow-elevation-stroke bg-primary absolute right-[0.875rem] top-[-1rem] hidden rounded group-hover:flex">
                    <button className="text-interactive-normal hover:text-interactive-hover p-[0.375rem]">
                      <Icon.AddReaction className="h-5 w-5" />
                    </button>
                    <button className="text-interactive-normal hover:text-interactive-hover p-[0.375rem]">
                      <Icon.Reply className="h-5 w-5" />
                    </button>
                    <button className="text-interactive-normal hover:text-interactive-hover p-[0.375rem]">
                      <Icon.More className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative mb-6 mt-[-0.5rem] flex flex-none px-4">
            <span className="bg-channeltextarea-background text-interactive-normal hover:text-interactive-hover flex-none rounded-l-lg px-4 py-[0.625rem]">
              <Icon.AttachPlus className="cursor-pointer" />
            </span>
            <div
              className="bg-channeltextarea-background font-primary text-normal -webkit-scrollbar:h-3 -webkit-scrollbar:w-3 -webkit-scrollbar-thumb:rounded-lg -webkit-scrollbar-thumb:border-4 -webkit-scrollbar-thumb:border-solid -webkit-scrollbar-thumb:border-transparent -webkit-scrollbar-thumb:bg-[rgba(24,25,28,.6)] -webkit-scrollbar-thumb:bg-clip-padding max-h-[29.375rem] min-h-[2.75rem] flex-1 overflow-y-auto rounded-r-lg py-[0.625rem] outline-none"
              contentEditable
            ></div>
            <div className="absolute right-5 top-1 flex flex-none items-center">
              <div className="text-interactive-normal hover:text-interactive-active mx-1 cursor-pointer p-1">
                <Icon.Gift />
              </div>
              <div className="text-interactive-normal hover:text-interactive-active mx-1 cursor-pointer p-1">
                <Icon.GIF />
              </div>
              <div className="text-interactive-normal hover:text-interactive-active mx-1 cursor-pointer p-1">
                <Icon.Sticker />
              </div>
            </div>
          </div>
        </div>
        {CurrentChat && CurrentChat?.participants.length > 1 && viewMemberList && (
          <div className="bg-secondary -webkit-scrollbar:h-2 -webkit-scrollbar:w-2 -webkit-scrollbar-thumb:min-h-[2.5rem] -webkit-scrollbar-thumb:rounded -webkit-scrollbar-thumb:border-2 -webkit-scrollbar-thumb:border-solid -webkit-scrollbar-thumb:border-transparent -webkit-scrollbar-thumb:bg-transparent -webkit-scrollbar-thumb:bg-clip-padding hover:-webkit-scrollbar-thumb:bg-scrollbar-thin-thumb flex w-60 flex-none flex-col overflow-y-scroll">
            <label className="font-display text-channel-default pt-6 pr-2 pl-4 text-xs font-semibold tracking-[0.015625rem]">
              MEMBERS—{CurrentChat?.participants.length}
            </label>

            {CurrentChat?.participants.map(
              (participant: string, index: any) => (
                <div
                  key={index}
                  className="group text-interactive-normal hover:bg-modifier-hover hover:text-interactive-hover ml-2 flex h-11 flex-none cursor-pointer items-center rounded-[0.25rem] px-2 py-[0.0625rem]"
                >
                  <AvatarIcon />
                  <label className="font-primary text-channel-default group-hover:text-interactive-hover ml-3 mt-[0.0625rem] cursor-pointer truncate text-base font-medium leading-5">
                    {participant}
                  </label>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default connector(ChatView);
