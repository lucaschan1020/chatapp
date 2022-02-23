interface ChatDividerProps {
  content?: string;
}

function ChatDivider({ content }: ChatDividerProps) {
  return (
    <div className="border-modifier-accent mt-6 mb-2 ml-4 mr-[0.875rem] flex h-0 items-center justify-center border-t-[0.0625rem] border-solid text-center">
      <span className="bg-primary text-muted font-primary mt-[0.0625rem] rounded-lg py-[0.125rem] px-1 text-xs font-semibold leading-[0.8125rem]">
        {content}
      </span>
    </div>
  );
}

export default ChatDivider;
