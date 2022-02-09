interface props {
    className?: string,
    children? : string
}

function Notice({className = "", children = "test"}: props) {
    return (
        <p className={"text-center h-9 rounded-tl-lg " + className} style={{backgroundColor: "hsl(197, 100%, 32.5%)"}}>{children}</p>
    )
}

export default Notice;