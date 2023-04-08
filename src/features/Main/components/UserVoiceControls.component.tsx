import AvatarIcon from '@/components/AvatarIcon.component';
import Icon from '@/components/Icon.component';
import useUser from '@/hooks/use-user.hook';
import leadingZero from '@/utilities/leading-zero';

const UserVoiceControls = () => {
  const { data: user } = useUser();
  return (
    <>
      <AvatarIcon src={user?.avatar} />
      <span className="ml-2 mr-1 flex w-[5.25rem] flex-col justify-center font-primary">
        <label className="truncate text-sm font-semibold leading-[1.125rem] text-header-primary">
          {user?.name}
        </label>
        <label className="text-xs font-medium leading-[0.8125rem] text-header-secondary">
          #{leadingZero(user?.discriminator ?? 0, 4)}
        </label>
      </span>
      <div className="flex flex-1 justify-around">
        <button className="text-interactive h-8 w-8 rounded-[0.25rem] hover:bg-modifier-hover">
          <Icon.Mute className="mx-auto" />
        </button>
        <button className="text-interactive h-8 w-8 rounded-[0.25rem] hover:bg-modifier-hover">
          <Icon.Deafen className="mx-auto" />
        </button>
        <button className="text-interactive h-8 w-8 rounded-[0.25rem] hover:bg-modifier-hover">
          <Icon.Setting className="mx-auto" />
        </button>
      </div>
    </>
  );
};

export default UserVoiceControls;
