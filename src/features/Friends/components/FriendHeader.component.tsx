import Icon from '@/components/Icon.component';
import TabItem from '@/features/Friends/components/TabItem.component';

interface FriendHeaderProps {
  selectedIndex: number;
  tabItemSelected: (selectedIndex: number) => void;
}

const FriendHeader: React.FC<FriendHeaderProps> = ({
  selectedIndex,
  tabItemSelected,
}) => {
  return (
    <>
      <div className="flex-rest-x flex">
        <div className="mx-2 text-muted">
          <Icon.Friends className="h-6 w-6" />
        </div>
        <div className="font-display font-semibold text-header-primary">
          Friends
        </div>
        <div className="ml-4 mr-2 h-6 w-[0.0625rem] bg-modifier-accent"></div>
        <div className="flex flex-1">
          <TabItem
            index={0}
            isSelected={selectedIndex === 0}
            onClick={tabItemSelected}
          >
            Online
          </TabItem>
          <TabItem
            index={1}
            isSelected={selectedIndex === 1}
            onClick={tabItemSelected}
          >
            All
          </TabItem>
          <TabItem
            index={2}
            isSelected={selectedIndex === 2}
            onClick={tabItemSelected}
          >
            Pending
          </TabItem>
          <TabItem
            index={3}
            isSelected={selectedIndex === 3}
            onClick={tabItemSelected}
          >
            Blocked
          </TabItem>
          <TabItem
            index={4}
            isSelected={selectedIndex === 4}
            onClick={tabItemSelected}
            backgroundColor="bg-interactive-green-normal active:bg-modifier-active"
            color="text-interactive-active"
            selectedBackgroundColor="bg-inherit hover:bg-modifier-hover active:bg-modifier-active"
            selectedColor="text-interactive-green-normal"
          >
            Add Friend
          </TabItem>
        </div>
      </div>
      <div className="flex">
        <div className="text-interactive mx-2 cursor-pointer">
          <Icon.GroupDM />
        </div>
        <div className="mx-2 h-6 w-[0.0625rem] bg-modifier-accent"></div>
        <div className="text-interactive mx-2 cursor-pointer">
          <Icon.DMInbox />
        </div>
        <div className="text-interactive mx-2 cursor-pointer">
          <Icon.Help />
        </div>
      </div>
    </>
  );
};

export default FriendHeader;
