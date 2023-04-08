import ChatHeader from '@/features/Chat/components/ChatHeader.component';
import ChatMainView from '@/features/Chat/components/ChatMainView.component';
import MainViewLayout from '@/features/Main/components/MainViewLayout.component';
import useGetPrivateChannel from '@/hooks/use-get-private-channel.hook';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ChatViewContainer: React.FC = () => {
  const [viewMemberList, setViewMemberList] = useState(false);
  const { privateChannelId } = useParams();

  const { data: privateChannel } = useGetPrivateChannel(privateChannelId);

  if (privateChannel === undefined)
    return <MainViewLayout>Failed to load...</MainViewLayout>;

  let headerName = 'Loading...';
  let isGroup = false;
  if (privateChannel.isGroup) {
    headerName = privateChannel.privateChannelName;
    isGroup = true;
  } else {
    headerName = Object.values(privateChannel.participants)[0].username;
  }

  return (
    <MainViewLayout
      header={
        <ChatHeader
          name={headerName}
          isGroup={isGroup}
          onMemberIconClick={() => setViewMemberList((v) => !v)}
        />
      }
    >
      <ChatMainView
        privateChannel={privateChannel}
        viewMemberList={viewMemberList}
      />
    </MainViewLayout>
  );
};

export default ChatViewContainer;
