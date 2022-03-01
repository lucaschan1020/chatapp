import { useAppDispatch, useAppSelector } from '../hooks';
import { ChangeFriendListSelectedIndex } from '../state/reducers/ViewStateSlice';

interface TabItemProps {
  index: number;
  color?: string;
  backgroundColor?: string;
  selectedColor?: string;
  selectedBackgroundColor?: string;
  children: React.ReactNode;
}

function TabItem({
  index,
  color = 'text-interactive-normal hover:text-interactive-hover active:text-interactive-active',
  backgroundColor = 'bg-inherit hover:bg-modifier-hover active:bg-modifier-active',
  selectedColor = 'text-interactive-active hover:text-interactive-active',
  selectedBackgroundColor = 'bg-modifier-selected',
  children,
}: TabItemProps) {
  const FriendListSelectedIndex = useAppSelector(
    (state) => state.ViewState.FriendListSelectedIndex
  );
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${
        index === FriendListSelectedIndex
          ? `${selectedColor} ${selectedBackgroundColor}`
          : `${color} ${backgroundColor}`
      } font-primary mx-2 min-w-[2.5rem] cursor-pointer select-none rounded py-[0.125rem] px-2 text-center text-base font-medium leading-5`}
      onClick={(e) => {
        dispatch(ChangeFriendListSelectedIndex(index));
      }}
    >
      {children}
    </div>
  );
}
export default TabItem;
