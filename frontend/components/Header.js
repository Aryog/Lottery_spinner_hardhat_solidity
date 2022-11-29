import { ConnectButton, connectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="border-b-3 text-3xl">
            Decentralized Lottery
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
