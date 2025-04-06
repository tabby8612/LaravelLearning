import { ForwardRefExoticComponent, RefAttributes, SVGProps, useState } from 'react';

type IconType = ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>>;

type Props = {
    tabName: string;
    curTab: boolean;
    Icon: IconType;
    items: {
        name: string;
        param: string;
    }[];
};

export default function SidebarTab({ tabName, curTab, Icon, items }: Props) {
    const [isActive, setIsActive] = useState(false);

    const currentParam = window.location.pathname;

    return (
        <>
            <div
                id={tabName}
                className="mt-2 text-white shadow-2xs"
                onClick={() => {
                    // tabFn(tabName);
                    setIsActive(!isActive);
                }}
            >
                <div className={`${curTab ? 'active' : ''} flex cursor-pointer gap-2 p-2 pl-5 align-middle hover:bg-amber-400 hover:text-black`}>
                    <Icon className="size-4 self-center" />
                    <h1 className="size-6">{tabName[0].toUpperCase() + tabName.slice(1)} </h1>
                </div>
            </div>
            {/* className="hover:text-primary-text m-1 cursor-pointer" */}
            {(curTab || isActive) && (
                <div className="font-poppins animate-fade-in-scale flex flex-col gap-2 bg-blue-950 py-5 pl-10 text-sm text-white inset-shadow-sm inset-shadow-black">
                    <ul className="">
                        {items.map((item) => (
                            <li className="hover:text-primary-text m-1 cursor-pointer">
                                <a className={currentParam === item.param ? 'text-primary-text' : ''} href={`${item.param}`}>
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
