import AvatarIcon from '@/components/AvatarIcon.component';
import Icon from '@/components/Icon.component';
import React from 'react';

interface PrivateChannelNavigateButtonProps {
  isActive: boolean;
  icon?: string;
  title: string;
  description?: string;
}

const PrivateChannelNavigateButton: React.FC<
  PrivateChannelNavigateButtonProps
> = ({ isActive, icon, title, description }) => {
  return (
    <div
      className={`${
        isActive
          ? 'bg-modifier-active text-interactive-active'
          : 'text-channel-default'
      } group my-[0.0625rem] ml-[0.5rem] flex h-[2.625rem] flex-none cursor-pointer items-center justify-start rounded-[0.25rem] px-2 hover:bg-modifier-hover hover:text-interactive-hover`}
    >
      <AvatarIcon src={icon} />
      <div className="ml-3 flex flex-1 flex-col truncate">
        <label className="cursor-pointer truncate font-primary text-base font-medium leading-5">
          {title}
        </label>
        {description && (
          <label className="mt-[-0.125rem] cursor-pointer truncate font-primary text-xs font-medium">
            {description}
          </label>
        )}
      </div>

      <Icon.Cross className="ml-auto mr-[0.125rem] hidden h-4 w-4 flex-none text-channel-default hover:text-interactive-hover active:text-interactive-active group-hover:block" />
    </div>
  );
};

export default PrivateChannelNavigateButton;
