import AvatarIcon from '@/components/AvatarIcon.component';
import { PrivateChannelParticipantEntity } from '@/interfaces/domain';

interface ChatSecondaryViewProps {
  participants: PrivateChannelParticipantEntity[];
}

const ChatSecondaryView: React.FC<ChatSecondaryViewProps> = ({
  participants,
}) => {
  return (
    <div className="scrollbar-2 scrollbar-thumb-rounded scrollbar-thumb-border hover-scrollbar-thumb flex w-60 flex-none flex-col overflow-y-scroll bg-secondary -webkit-scrollbar-thumb:min-h-[2.5rem] -webkit-scrollbar-thumb:bg-transparent">
      <label className="pt-6 pr-2 pl-4 font-display text-xs font-semibold uppercase tracking-[0.015625rem] text-channel-default">
        Members—
        {participants.length}
      </label>
      {participants.map((participant) => (
        <div
          key={participant.id}
          className="text-interactive group ml-2 flex h-11 flex-none cursor-pointer items-center rounded-[0.25rem] px-2 py-[0.0625rem] hover:bg-modifier-hover"
        >
          <AvatarIcon src={participant.avatar} />
          <label className="ml-3 mt-[0.0625rem] cursor-pointer truncate font-primary text-base font-medium leading-5 text-channel-default group-hover:text-interactive-hover">
            {participant.username}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ChatSecondaryView;
