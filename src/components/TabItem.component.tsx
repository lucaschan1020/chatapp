interface TabItemProps {
  index: number;
  isSelected: boolean;
  onClick: (selectedIndex: number) => void;
  color?: string;
  backgroundColor?: string;
  selectedColor?: string;
  selectedBackgroundColor?: string;
  children: React.ReactNode;
}

function TabItem({
  index,
  isSelected,
  onClick,
  color = 'text-interactive active:text-interactive-active',
  backgroundColor = 'bg-inherit hover:bg-modifier-hover active:bg-modifier-active',
  selectedColor = 'text-interactive-active hover:text-interactive-active',
  selectedBackgroundColor = 'bg-modifier-selected',
  children,
}: TabItemProps) {
  return (
    <div
      className={`${
        isSelected
          ? `${selectedColor} ${selectedBackgroundColor}`
          : `${color} ${backgroundColor}`
      } font-primary mx-2 min-w-[2.5rem] flex-none cursor-pointer select-none rounded py-[0.125rem] px-2 text-center text-base font-medium leading-5`}
      onClick={() => {
        onClick(index);
      }}
    >
      {children}
    </div>
  );
}
export default TabItem;
