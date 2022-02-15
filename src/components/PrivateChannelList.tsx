import { useEffect } from "react";
import AvatarIcon from "./AvatarIcon";
import Icon from "./Icon";

interface props {
    className?: string,
    privateChannelOnClick: Function,
}

interface PrivateChannel {
    participants: string[]
    avatarSrc?: string
}

function PrivateChannelList({ className = "", privateChannelOnClick }: props) {
    const privateChannels: PrivateChannel[] = [
        { participants: ['sadsadasd| Elexir Wizard', 'Jackson Wong'] },
        { participants: ['Jay'] },
        { participants: ['Alex'] },
        { participants: ['Sam'] },
        { participants: ['Jeremy', 'Kelvin'] },
        { participants: ['Sam', 'Lucas', 'Ming Fong', 'Desmond', 'Mun Haw'] },
        
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
        { participants: ['Sam'] },
    ];

    useEffect(() => {
        privateChannelOnClick(privateChannels[0]);
    }, []);

    return (
        <div className={className}>
            <div className="flex-none h-12 w-60 flex shadow-low-elevation">
                <button className="rounded-[0.25rem] bg-tertiary flex-auto m-[0.55rem] px-[0.375rem] text-muted text-left text-sm font-primary">Find or start a conversation</button>
            </div>
            <div className="pt-2 flex flex-col overflow-y-scroll -webkit-scrollbar:w-2 -webkit-scrollbar:h-2 -webkit-scrollbar-thumb:bg-clip-padding -webkit-scrollbar-thumb:border-2 -webkit-scrollbar-thumb:border-solid -webkit-scrollbar-thumb:border-transparent -webkit-scrollbar-thumb:rounded -webkit-scrollbar-thumb:bg-transparent hover:-webkit-scrollbar-thumb:bg-scrollbar-thin-thumb -webkit-scrollbar-thumb:min-h-[2.5rem]">
                <div className="flex-none rounded-[0.25rem] h-[2.625rem] my-[0.0625rem] flex items-center justify-start ml-[0.5rem]  text-channel-default hover:text-interactive-hover hover:bg-modifier-hover cursor-pointer active:bg-[rgba(79,84,92,0.24)] active:text-white">
                    <Icon name="friends" className="w-6 h-6 ml-3" />
                    <label className="ml-4 font-medium font-primary">Friends</label>
                </div>
                <div className="flex-none rounded-[0.25rem] h-[2.625rem] my-[0.0625rem] flex items-center justify-start ml-[0.5rem] text-channel-default hover:text-interactive-hover hover:bg-modifier-hover cursor-pointer active:bg-[rgba(79,84,92,0.24)] active:text-white">
                    <Icon name="nitro" className="w-6 h-6 ml-3" />
                    <label className="ml-4 font-medium font-primary">Nitro</label>
                </div>
                <div className="flex-none flex items-center justify-between pt-[1.125rem] pr-[0.5rem] pb-[0.25rem] pl-[1.125rem] h-10 text-channel-default hover:text-interactive-hover">
                    <label className="text-xs tracking-[0.015625rem] h-[1.125rem] font-semibold font-display cursor-default">DIRECT MESSAGES</label>
                    <Icon name="dm-plus" className="w-4 h-4 cursor-pointer" />
                </div>
                {privateChannels.map((privateChannel, index) => (
                    <div key={index}
                        className="flex-none rounded-[0.25rem] h-[2.625rem] flex items-center justify-start ml-[0.5rem] my-[0.0625rem] px-2  text-channel-default hover:text-interactive-hover hover:bg-modifier-hover cursor-pointer active:bg-[rgba(79,84,92,0.24)] active:text-white group"
                        onClick={() => privateChannelOnClick(privateChannel)}>
                        <AvatarIcon src={privateChannel.avatarSrc ? privateChannel.avatarSrc : undefined} />
                        <div className="ml-3 flex-1 flex flex-col truncate">
                            <label className="text-base leading-5 font-medium font-primary cursor-pointer truncate">{privateChannel.participants.join(", ")}</label>
                            {privateChannel.participants.length > 1 &&
                                <label className="mt-[-0.125rem] text-xs font-medium font-primary cursor-pointer truncate">{privateChannel.participants.length} Members</label>
                            }
                        </div>

                        <Icon name="cross" className="flex-none text-channel-default hover:text-interactive-hover active:text-interactive-active hidden group-hover:block w-4 h-4 ml-auto mr-[0.125rem]" />
                    </div>
                ))}
            </div>
            <div className="flex-none h-[3.3125rem] bg-secondary-alt mt-auto flex items-center px-2">
                <AvatarIcon />
                <span className="ml-2 mr-1 w-[5.25rem] font-primary flex flex-col justify-center">
                    <label className="text-header-primary text-sm leading-[1.125rem] font-semibold truncate">GhostShadow</label>
                    <label className="text-header-secondary text-xs leading-[0.8125rem] font-medium">#9005</label>
                </span>
                <div className="flex-1 flex justify-around">
                    <button className="w-8 h-8 text-interactive-normal hover:bg-modifier-hover hover:text-interactive-hover rounded-[0.25rem]">
                        <Icon name="mute" className="mx-auto" />
                    </button>
                    <button className="w-8 h-8 text-interactive-normal hover:bg-modifier-hover hover:text-interactive-hover rounded-[0.25rem]">
                        <Icon name="deafen" className="mx-auto" />
                    </button>
                    <button className="w-8 h-8 text-interactive-normal hover:bg-modifier-hover hover:text-interactive-hover rounded-[0.25rem]">
                        <Icon name="setting" className="mx-auto" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PrivateChannelList;
