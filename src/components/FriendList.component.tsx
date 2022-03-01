import AvatarIcon from './AvatarIcon.component';
import Icon from './Icon.component';
import TabItem from './TabItem.component';

interface FriendListProps {
  className?: string;
}

function FriendList({ className = '' }: FriendListProps) {
  return (
    <div className={className}>
      <div className="shadow-elevation-low z-[2] flex h-12 flex-none items-center px-2">
        <div className="text-muted mx-2">
          <Icon.Friends className="h-6 w-6" />
        </div>
        <div className="font-display text-header-primary font-semibold">
          Friends
        </div>
        <div className="bg-modifier-accent ml-4 mr-2 h-6 w-[0.0625rem]"></div>
        <div className="flex flex-1">
          <TabItem index={0}>Online</TabItem>
          <TabItem index={1}>All</TabItem>
          <TabItem index={2}>Pending</TabItem>
          <TabItem index={3}>Blocked</TabItem>
          <TabItem
            index={4}
            backgroundColor="bg-interactive-green-normal active:bg-modifier-active"
            color="text-interactive-active"
            selectedBackgroundColor="bg-inherit hover:bg-modifier-hover active:bg-modifier-active"
            selectedColor="text-interactive-green-normal"
          >
            Add Friend
          </TabItem>
        </div>
        <div className="flex">
          <div className="text-interactive-normal hover:text-interactive-hover mx-2 cursor-pointer">
            <Icon.GroupDM />
          </div>
          <div className="bg-modifier-accent mx-2 h-6 w-[0.0625rem]"></div>
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
          <div className="flex">
            <div className="bg-tertiary m-[0.0625rem] mt-4 mb-2 ml-[1.875rem] mr-5 flex flex-1 rounded p-[0.0625rem]">
              <input
                className="font-primary placeholder:text-muted text-normal m-[0.0625rem] h-[1.875rem] flex-1 bg-inherit py-[0.125rem] px-2 text-base font-normal leading-8 outline-none"
                placeholder="Search"
                type="text"
              />
              <div className="text-interactive-normal flex h-8 w-8 cursor-text items-center justify-center">
                <Icon.MagnifyingGlass className="h-5 w-5" />
              </div>
            </div>
          </div>
          <div className="font-display text-header-secondary mt-4 mr-5 mb-2 ml-[1.875rem] text-xs font-semibold tracking-[0.015625rem]">
            ONLINE — 8
          </div>
          <div className="-webkit-scrollbar-thumb:min-h-[2.5rem] -webkit-scrollbar-track:bg-scrollbar-auto-track -webkit-scrollbar-track:rounded-lg -webkit-scrollbar-track:border-solid -webkit-scrollbar-track:border-transparent -webkit-scrollbar-track:bg-clip-padding -webkit-scrollbar-track:border-4 -webkit-scrollbar:w-4 -webkit-scrollbar:h-4 -webkit-scrollbar-thumb:bg-scrollbar-thin-thumb -webkit-scrollbar-thumb:rounded-lg -webkit-scrollbar-thumb:border-solid -webkit-scrollbar-thumb:border-transparent -webkit-scrollbar-thumb:bg-clip-padding -webkit-scrollbar-thumb:border-4 mt-2 flex flex-1 flex-col overflow-y-scroll pb-2">
            <div className="border-modifier-accent group hover:bg-modifier-hover ml-[1.875rem] mr-5 flex h-[3.875rem] cursor-pointer items-center justify-between border-t-[0.0625rem] border-solid hover:mr-[0.625rem] hover:ml-[1.25rem] hover:rounded-lg hover:border-transparent hover:py-4 hover:px-[0.625rem]">
              <div className="item flex">
                <AvatarIcon />
                <div className="ml-3 flex flex-col">
                  <div className="flex items-end">
                    <span className="text-header-primary font-primary text-base font-semibold leading-[1.1]">
                      Bassism
                    </span>
                    <span className="text-header-secondary font-primary hidden text-sm font-medium leading-4 group-hover:block">
                      #6301
                    </span>
                  </div>
                  <span className="font-primary text-header-secondary text-sm font-medium leading-5">
                    Online
                  </span>
                </div>
              </div>
              <div className="ml-2 flex">
                <div className="bg-secondary group-hover:bg-tertiary text-interactive-normal hover:text-interactive-hover group-hover:active:bg-modifier-active active:text-interactive-active flex h-9 w-9 items-center justify-center rounded-[50%]">
                  <Icon.FriendMessage className="h-5 w-5" />
                </div>
                <div className="bg-secondary group-hover:bg-tertiary text-interactive-normal hover:text-interactive-hover group-hover:active:bg-modifier-active active:text-interactive-active ml-[0.625rem] flex h-9 w-9 items-center justify-center rounded-[50%]">
                  <Icon.FriendMore className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-modifier-accent hidden min-w-[22.5rem] max-w-[26.25rem] flex-[0_1_30%] border-l-[0.0625rem] border-solid lg:flex">
          x
        </div>
      </div>
    </div>
  );
}

export default FriendList;
