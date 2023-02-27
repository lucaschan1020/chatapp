interface ChatDividerProps {
  content?: string;
}

function ChatDivider({ content }: ChatDividerProps) {
  return (
    <div className="mt-6 mb-2 ml-4 mr-[0.875rem] flex h-0 items-center justify-center border-t-[0.0625rem] border-solid border-modifier-accent text-center">
      <span className="mt-[0.0625rem] rounded-lg bg-primary py-[0.125rem] px-1 font-primary text-xs font-semibold leading-[0.8125rem] text-muted">
        {content}
      </span>
    </div>
  );
}

export default ChatDivider;
