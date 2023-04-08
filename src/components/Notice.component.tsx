interface NoticeProps {
  className?: string;
  children?: string;
}

const Notice: React.FC<NoticeProps> = ({
  className = '',
  children = 'test',
}) => {
  return (
    <p
      className={
        'min-h-[2.25rem] rounded-tl-lg text-center font-primary text-sm font-medium leading-9 text-white ' +
        className
      }
      style={{ backgroundColor: 'hsl(197, 100%, 32.5%)' }}
    >
      {children}
    </p>
  );
};

export default Notice;
