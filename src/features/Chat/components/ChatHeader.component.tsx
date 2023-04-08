import Icon from '@/components/Icon.component';

interface ChatHeaderProps {
  name: string;
  isGroup: boolean;
  onMemberIconClick: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  isGroup,
  onMemberIconClick,
}) => {
  return (
    <>
      <div className="flex items-center overflow-hidden">
        <div className="mx-2 text-muted">
          <Icon.Alias />
        </div>
        <div className="whitespace-nowrap font-display text-base font-semibold leading-5 text-header-primary">
          {name}
        </div>
      </div>
      <div className="ml-auto flex">
        <div className="text-interactive mx-2 cursor-pointer">
          <Icon.AudioCall />
        </div>
        <div className="text-interactive mx-2 cursor-pointer">
          <Icon.VideoCall />
        </div>
        <div className="text-interactive mx-2 cursor-pointer">
          <Icon.Pin />
        </div>
        <div className="text-interactive mx-2 cursor-pointer">
          <Icon.AddMember />
        </div>
        {isGroup && (
          <div
            className="text-interactive mx-2 cursor-pointer"
            onClick={() => onMemberIconClick()}
          >
            <Icon.Members />
          </div>
        )}
        <div className="mx-2 flex text-normal">
          <input
            className="h-6 w-[7.25rem] flex-1 rounded-l bg-tertiary pl-[0.375rem] font-primary text-sm font-medium leading-5 outline-none transition-[width] duration-[250ms] placeholder:text-muted focus:w-[13.25rem] placeholder-not-shown:w-[13.25rem]"
            placeholder="Search"
            type="text"
          />
          <div className="flex h-6 w-7 cursor-text items-center justify-center rounded-r bg-tertiary px-[0.125rem] text-muted">
            <Icon.MagnifyingGlass />
          </div>
        </div>
        <div className="text-interactive mx-2 cursor-pointer">
          <Icon.DMInbox />
        </div>
        <div className="text-interactive mx-2 cursor-pointer">
          <Icon.Help />
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
