'use client';

interface MenuItemProps {
    label: string,
    onCLick: () => void
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    return (
        <>
            <div onClick={props.onCLick} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                {props.label}
            </div>
        </>
    )
}

export default MenuItem