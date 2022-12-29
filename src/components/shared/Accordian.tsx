import { useState } from "react";

type Accordian = {
    children: React.ReactNode;
    title: string;
};

const Accordian: React.FC<Accordian> = ({ children, title }) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    return (
        <div className="border border-solid p-2">
            <div
                className="border-b text-left text-xl font-bold"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {title}
            </div>
            {isCollapsed ? null : <>{children}</>}
        </div>
    );
};

export default Accordian;
