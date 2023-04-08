import FriendList from '@/features/Friends/components/FriendList.component';
import FriendSearch from '@/features/Friends/components/FriendSearch.component';

interface FriendMainViewProps {
  selectedIndex: number;
}

const FriendMainView: React.FC<FriendMainViewProps> = ({ selectedIndex }) => {
  return (
    <>
      <div className="flex-rest-x flex flex-col overflow-y-hidden">
        {selectedIndex < 4 && <FriendList index={selectedIndex} />}
        {selectedIndex === 4 && <FriendSearch />}
      </div>
      <div className="hidden min-w-[22.5rem] max-w-[26.25rem] flex-[0_1_30%] lg:flex">
        <div className="scrollbar-2 scrollbar-thumb-border scrollbar-thumb-rounded ml-[0.125rem] flex flex-col overflow-y-scroll border-l-[0.0625rem] border-solid border-modifier-accent pr-2 pt-4 pb-4 pl-4 -webkit-scrollbar-thumb:min-h-[2.5rem] -webkit-scrollbar-thumb:bg-scrollbar-thin-thumb">
          <label className="mt-2 mb-4 font-display text-xl font-bold leading-6 text-header-primary">
            Active Now
          </label>
          <div className="flex flex-col p-4 text-center">
            <label className="mb-1 font-display text-base font-semibold leading-5 text-header-primary">
              It's quiet for now...
            </label>
            <label className="font-primary text-sm leading-[1.125rem] text-interactive-normal">
              When a friend starts an activity—like playing a game or hanging
              out on voice—we'll show it here!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendMainView;
