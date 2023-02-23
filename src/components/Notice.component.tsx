interface NoticeProps {
  className?: string;
  children?: string;
}

function Notice({ className = '', children = 'test' }: NoticeProps) {
  return (
    <p
      className={
        'h-9 rounded-tl-lg text-center font-primary text-sm font-medium leading-9 text-white' +
        className
      }
      style={{ backgroundColor: 'hsl(197, 100%, 32.5%)' }}
    >
      {children}
    </p>
  );
}

export default Notice;
