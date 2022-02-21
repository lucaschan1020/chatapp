interface ServerListProps {
  className?: string;
}

function ServerList({ className = '' }: ServerListProps) {
  return <div className={className}></div>;
}

export default ServerList;
