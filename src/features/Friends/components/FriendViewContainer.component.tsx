import FriendHeader from '@/features/Friends/components/FriendHeader.component';
import FriendMainView from '@/features/Friends/components/FriendMainView.component';
import MainViewLayout from '@/features/Main/components/MainViewLayout.component';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { ChangeFriendListSelectedIndex } from '@/state/reducers/ViewStateSlice';

const FriendViewContainer = () => {
  const selectedIndex = useAppSelector(
    (state) => state.ViewState.friendListSelectedIndex
  );
  const dispatch = useAppDispatch();
  const tabItemSelected = (index: number) => {
    dispatch(ChangeFriendListSelectedIndex(index));
  };

  return (
    <MainViewLayout
      header={
        <FriendHeader
          selectedIndex={selectedIndex}
          tabItemSelected={tabItemSelected}
        />
      }
    >
      <FriendMainView selectedIndex={selectedIndex} />
    </MainViewLayout>
  );
};

export default FriendViewContainer;
