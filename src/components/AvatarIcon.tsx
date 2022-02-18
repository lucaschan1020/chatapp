interface props {
  className?: string;
  src?: string;
  width?: string;
  height?: string;
}

function AvatarIcon({
  className = "",
  src = "/images/default-avatar.png",
  width = "w-8",
  height = "h-8",
}: props) {
  return (
    <img
      src={src}
      className={`rounded-full ${width} ${height} ${className}`}
      alt="avatar"
    ></img>
  );
}

export default AvatarIcon;
