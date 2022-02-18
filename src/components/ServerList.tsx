interface props {
  className?: string;
}

function ServerList({ className = "" }: props) {
  return <div className={className}></div>;
}

export default ServerList;
