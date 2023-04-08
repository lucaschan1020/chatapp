import Icon from '@/components/Icon.component';
import { NavLink } from 'react-router-dom';

const PrivateChannelMenu: React.FC = () => {
  return (
    <>
      <NavLink to="/channels/@me" end>
        {({ isActive }) => (
          <div
            className={`${
              isActive
                ? 'bg-modifier-active text-interactive-active'
                : 'text-channel-default'
            } my-[0.0625rem] ml-[0.5rem] flex h-[2.625rem] flex-none cursor-pointer items-center justify-start rounded-[0.25rem] hover:bg-modifier-hover hover:text-interactive-hover`}
          >
            <Icon.Friends className="ml-3 h-6 w-6" />
            <label className="ml-4 cursor-pointer font-primary font-medium">
              Friends
            </label>
          </div>
        )}
      </NavLink>
      <div className="my-[0.0625rem] ml-[0.5rem] flex h-[2.625rem] flex-none cursor-pointer items-center justify-start rounded-[0.25rem] text-channel-default hover:bg-modifier-hover hover:text-interactive-hover active:bg-modifier-active active:text-interactive-active">
        <Icon.Nitro className="ml-3 h-6 w-6" />
        <label className="ml-4 cursor-pointer font-primary font-medium">
          Nitro
        </label>
      </div>
      <div className="flex h-10 flex-none items-center justify-between pt-[1.125rem] pr-[0.5rem] pb-[0.25rem] pl-[1.125rem] text-channel-default hover:text-interactive-hover">
        <label className="h-[1.125rem] cursor-default font-display text-xs font-semibold uppercase tracking-[0.015625rem]">
          Direct Messages
        </label>
        <Icon.DMPlus className="h-4 w-4 cursor-pointer" />
      </div>
    </>
  );
};

export default PrivateChannelMenu;
