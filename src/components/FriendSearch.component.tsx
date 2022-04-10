import axios from 'axios';
import { useEffect, useState } from 'react';
import friendAPI from '../apis/friend';
import { FriendItem } from '../interfaces';

function FriendSearch() {
  const [friendTag, setFriendTag] = useState<string>('');
  const [placeholderContent, setPlaceholderContent] = useState<string>('#0000');
  const [formMessage, setFormMessage] = useState<{
    content: JSX.Element | null;
    isSuccess: boolean | null;
  }>({ content: null, isSuccess: null });

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
    if (formMessage.isSuccess === null) return 'focus-within:border-text-link';
    if (formMessage.isSuccess) return 'focus-within:border-status-positive';
    return 'focus-within:border-status-danger';
  };

  return (
    <div className="border-modifier-accent flex flex-shrink-0 flex-col border-b-[0.0625rem] border-solid py-[1.25rem] px-[1.875rem]">
      <label className="font-display text-header-primary mb-2 text-base font-semibold uppercase leading-5">
        Add Friend
      </label>
      <label className="text-header-secondary font-primary text-sm font-normal">
        You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!
      </label>
      <div
        className={`${borderColor()} bg-deprecated-text-input-bg border-deprecated-text-input-border relative mt-4 flex items-center rounded-lg border-[0.0625rem] border-solid px-3`}
      >
        <input
          maxLength={37}
          className="text-normal font-primary placeholder:text-muted mr-4 h-12 min-w-0 flex-1 bg-transparent py-1 text-base font-medium leading-5 tracking-[0.04rem] outline-none placeholder:font-normal placeholder:tracking-[0.04rem]"
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
          <label className="text-interactive-muted font-primary pointer-events-none absolute top-[15px] left-[12px] text-base font-medium leading-5 tracking-[0.04rem]">
            <span className="pointer-events-none text-transparent">
              {friendTag}
            </span>
            {placeholderContent}
          </label>
        )}
        <button
          className="font-primary text-header-primary bg-brand-experiment h-8 min-h-[2rem] min-w-[3.75rem] truncate rounded-[0.1875rem] px-4 py-[0.125rem] text-sm font-medium leading-4"
          onClick={async () => {
            if (!friendTag) return;
            const index = friendTag.indexOf('#');
            if (index < 0) return;
            let discriminator = friendTag.slice(index);
            if (discriminator.length !== 5) return;
            const username = friendTag.slice(0, index);
            setFormMessage({ content: null, isSuccess: true });
            try {
              const response = await friendAPI.post<FriendItem>(
                `/${username}/${discriminator.slice(1)}`
              );

              if (response.status === 201) {
                setFormMessage({
                  content: (
                    <label className="text-positive">
                      Success! Your friend request to
                      <strong> {friendTag} </strong>was sent.
                    </label>
                  ),
                  isSuccess: true,
                });

                setFriendTag('');
              }
            } catch (err) {
              if (axios.isAxiosError(err)) {
                setFormMessage({
                  content: (
                    <label className="text-danger">
                      Hm, didn't work. Double check that the capitalization,
                      spelling, any spaces, and numbers are correct.
                    </label>
                  ),
                  isSuccess: false,
                });
              } else {
                throw err;
              }
            }
          }}
        >
          Send Friend Request
        </button>
      </div>
      <div className={`font-primary mt-2 text-sm font-normal`}>
        {formMessage.content}
      </div>
    </div>
  );
}

export default FriendSearch;
