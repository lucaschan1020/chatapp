import useAddFriend from '@/hooks/use-add-friend.hook';
import { useEffect, useState } from 'react';

function FriendSearch() {
  const [friendTag, setFriendTag] = useState<string>('');
  const [addedFriendTag, setAddedFriendTag] = useState<string>('');
  const [placeholderContent, setPlaceholderContent] = useState<string>('#0000');

  const {
    mutate: addFriend,
    isSuccess: isSuccessAddFriend,
    isError: isErrorAddFriend,
  } = useAddFriend();

  useEffect(() => {
    const index = friendTag.indexOf('#');
    if (index < 0) {
      setPlaceholderContent('#0000');
      return;
    }
    const endings = friendTag.slice(index);
    setPlaceholderContent('#0000'.slice(endings.length));
  }, [friendTag]);

  const borderColor = () => {
    if (isSuccessAddFriend) return 'focus-within:border-status-positive';
    if (isErrorAddFriend) return 'focus-within:border-status-danger';
    return 'focus-within:border-text-link';
  };

  return (
    <div className="flex flex-shrink-0 flex-col border-b-[0.0625rem] border-solid border-modifier-accent py-[1.25rem] px-[1.875rem]">
      <label className="mb-2 font-display text-base font-semibold uppercase leading-5 text-header-primary">
        Add Friend
      </label>
      <label className="font-primary text-sm font-normal text-header-secondary">
        You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!
      </label>
      <div
        className={`${borderColor()} relative mt-4 flex items-center overflow-x-hidden rounded-lg border-[0.0625rem] border-solid border-deprecated-text-input-border bg-deprecated-text-input-bg px-3`}
      >
        <input
          maxLength={37}
          className="mr-4 h-12 min-w-0 flex-1 bg-transparent py-1 font-primary text-base font-medium leading-5 tracking-[0.04rem] text-normal outline-none placeholder:font-normal placeholder:tracking-[0.04rem] placeholder:text-muted"
          placeholder="Enter a Username#0000"
          value={friendTag}
          onChange={(e) => {
            const text = e.target.value;
            const index = text.indexOf('#');
            if (index < 0) setFriendTag(text);
            const length = text.slice(index).length;
            if (
              length === 1 ||
              (!isNaN(text[text.length - 1] as any) && length <= 5)
            )
              setFriendTag(text);
          }}
        />
        {friendTag.length !== 0 && (
          <label className="pointer-events-none absolute top-[15px] left-[12px] font-primary text-base font-medium leading-5 tracking-[0.04rem] text-interactive-muted">
            <span className="pointer-events-none text-transparent">
              {friendTag}
            </span>
            {placeholderContent}
          </label>
        )}
        <button
          className="h-8 min-h-[2rem] min-w-[3.75rem] truncate rounded-[0.1875rem] bg-brand-experiment px-4 py-[0.125rem] font-primary text-sm font-medium leading-4 text-header-primary"
          onClick={async () => {
            if (!friendTag) return;
            const index = friendTag.indexOf('#');
            if (index < 0) return;
            let discriminator = friendTag.slice(index);
            if (discriminator.length !== 5) return;
            const username = friendTag.slice(0, index);

            addFriend({
              username,
              discriminator: parseInt(discriminator.slice(1)),
            });
            setAddedFriendTag(friendTag);
            setFriendTag('');
          }}
        >
          Send Friend Request
        </button>
      </div>
      <div className={`mt-2 font-primary text-sm font-normal`}>
        {isErrorAddFriend && (
          <label className="text-danger">
            Hm, didn't work. Double check that the capitalization, spelling, any
            spaces, and numbers are correct.
          </label>
        )}
        {isSuccessAddFriend && (
          <label className="text-positive">
            Success! Your friend request to
            <strong> {addedFriendTag} </strong>was sent.
          </label>
        )}
      </div>
    </div>
  );
}

export default FriendSearch;
