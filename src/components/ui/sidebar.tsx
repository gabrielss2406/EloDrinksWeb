import { usePathname } from "next/navigation";
import Sidebar from "../shared/Sidebar";

const SidebarWrapper = () => {
    const pathname = usePathname();

    const pagesWithoutSidebar = ['/login'];
    const errorPage = '/_error';

    const shouldRenderSidebar = !pagesWithoutSidebar.includes(pathname) && pathname !== errorPage;

    return shouldRenderSidebar ? <Sidebar /> : null;
};

export default SidebarWrapper;  