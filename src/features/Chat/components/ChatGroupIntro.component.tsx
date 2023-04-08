interface ChatGroupIntroProps {
  name: string;
}

const ChatGroupIntro: React.FC<ChatGroupIntroProps> = ({ name }) => {
  return (
    <label className="font-primary text-base leading-5 text-header-secondary">
      Welcome to the beginning of the
      <strong className="font-semibold">{` ${name} `}</strong>
      group.
    </label>
  );
};

export default ChatGroupIntro;
