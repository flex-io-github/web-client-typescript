import * as React from 'react';

import { Nav } from 'office-ui-fabric-react/lib/Nav';

class SidebarMenu extends React.Component {
    
    _onClickHandler2(e: React.MouseEvent<HTMLElement>) {
        return false;
    }

    render() {
        return (
            <div className='ms-NavExample-LeftPane'>
                <Nav
                    groups={
                        [
                            {
                                links:
                                [
                                    {
                                        name: 'Home',
                                        url: '/',
                                        links: [{
                                            name: 'Login',
                                            url: '/login',
                                            key: 'key1'
                                            },
                                            {
                                            name: 'Register',
                                            url: '/Register',
                                            key: 'key2'
                                        }],
                                        isExpanded: true
                                    },
                                    { name: 'Employees', url: '/employees', key: 'key3', isExpanded: true },
                                    { name: 'Pages', url: 'http://msn.com', key: 'key4' },
                                    {
                                        name: 'Edit',
                                        url: 'http://cnn.com',
                                        onClick: this._onClickHandler2,
                                        icon: 'Edit',
                                        key: 'key8'
                                    }
                                ]
                            }
                        ]
                    }
                    expandedStateText={'expanded'}
                    collapsedStateText={'collapsed'}
                    selectedKey={'key3'}
                />
            </div>
        );
    }
}

export default SidebarMenu