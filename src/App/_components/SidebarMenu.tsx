import * as React from 'react';
import '../_styles/SidebarMenu.css';

// import { Nav } from 'office-ui-fabric-react/lib/Nav';
// import { INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';

// export type SidebarMenuState = {
//     groups: string;
//     expanded: string;
//     collapsed: string;
// }
function SidebarMenu() {
    return (
        <div className="sidenav">
            <a href="/login">Login</a>
            <a href="/Register">Register</a>
            <a href="#clients">Clients</a>
            <a href="#contact">Contact</a>
        </div>
    );
}


// export const SidebarMenu: React.SFC<SidebarMenuState> = ({groups, expanded = "collapsed", collapsed = "collapsed"}) => (
//     <div className="SidebarMenu">
//         {/* <Nav groups={groups} expandedStateText={expanded} collapsedStateText={collapsed} /> */}
//     </div>
// )




export default SidebarMenu