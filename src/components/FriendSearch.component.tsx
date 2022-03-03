function FriendSearch() {
  return (
    <div className="border-modifier-accent flex flex-shrink-0 flex-col border-b-[0.0625rem] border-solid py-[1.25rem] px-[1.875rem]">
      <label className="font-display text-header-primary mb-2 text-base font-semibold uppercase leading-5">
        Add Friend
      </label>
      <label className="text-header-secondary font-primary text-sm font-normal">
        You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!
      </label>
      <div className="bg-deprecated-text-input-bg border-deprecated-text-input-border focus-within:border-text-link mt-4 flex items-center rounded-lg border-[0.0625rem] border-solid px-3">
        <input
          maxLength={37}
          className="text-normal font-primary mr-4 h-12 flex-1 bg-transparent py-1 text-base font-medium leading-5 tracking-[0.04rem] outline-none"
        ></input>
        <button className="font-primary text-header-primary bg-brand-experiment h-8 min-h-[2rem] min-w-[3.75rem] rounded-[0.1875rem] px-4 py-[0.125rem] text-sm font-medium leading-4">
          Send Friend Request
        </button>
      </div>
    </div>
  );
}

export default FriendSearch;
