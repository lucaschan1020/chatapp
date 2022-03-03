import AvatarIcon from './AvatarIcon.component';
import Icon from './Icon.component';

enum PageEnum {
  Online,
  All,
  Pending,
  Blocked,
}

interface FriendListProps {
  index: number;
}

function FriendList({ index }: FriendListProps) {
  return (
    <>
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
      <div className="font-display text-header-secondary mt-4 mr-5 mb-2 ml-[1.875rem] text-xs font-semibold uppercase tracking-[0.015625rem]">
        {PageEnum[index]} — 8
      </div>
      <div className="-webkit-scrollbar-thumb:min-h-[2.5rem] scrollbar-track scrollbar-4 -webkit-scrollbar-thumb:bg-scrollbar-thin-thumb scrollbar-thumb-rounded-lg scrollbar-thumb-border mt-2 flex flex-1 flex-col overflow-x-hidden overflow-y-scroll pb-2">
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
            <div className="bg-secondary group-hover:bg-tertiary text-interactive group-hover:active:bg-modifier-active active:text-interactive-active flex h-9 w-9 items-center justify-center rounded-[50%]">
              <Icon.FriendMessage className="h-5 w-5" />
            </div>
            <div className="bg-secondary group-hover:bg-tertiary text-interactive group-hover:active:bg-modifier-active active:text-interactive-active ml-[0.625rem] flex h-9 w-9 items-center justify-center rounded-[50%]">
              <Icon.FriendMore className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FriendList;
