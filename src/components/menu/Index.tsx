
import {
	DesktopOutlined, HddOutlined, HomeOutlined, ScheduleOutlined, SettingOutlined, UserOutlined, YoutubeOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

const { Sider } = Layout;
const { SubMenu } = Menu;



function MenuCollapsible(props: { selected: string[] }) {

	const { status } = useSession()

	const [collapsed, setCollapsed] = useState<boolean>()

	const toggleCollapsed = () => {
		setCollapsed(!collapsed)
	}
	return (
		<Sider collapsible collapsed={ collapsed } onCollapse={ toggleCollapsed }>
			<div style={ { color: 'white', textAlign: 'center', margin: '19px' } }>RMP</div>
			<Menu theme="dark" selectedKeys={ props.selected } mode="inline">
				<Menu.Item key="1" icon={ <HomeOutlined /> }>
					<Link href={ '/' }>
						Inicio
					</Link>
				</Menu.Item>
				{ status === 'authenticated' && (
					<>
						<Menu.Item key="2" icon={ <DesktopOutlined /> }>
							<Link href={ '/command' }>
								Comando
							</Link>
						</Menu.Item>
						<SubMenu key="sub1" icon={ <ScheduleOutlined /> } title="Rotinas">
							<Menu.Item key="3">
								<Link href={ '/routines/kanban' }>
									Kanban
								</Link>
							</Menu.Item>
							<Menu.Item key="4">
								<Link href={ '/routines/financial' }>
									Financeiro
								</Link>
							</Menu.Item>
						</SubMenu>
						<Menu.Item key="5" icon={ <HddOutlined /> }>
							<Link href={ '/status' }>
								Status
							</Link>
						</Menu.Item>
						<Menu.Item key="6" icon={ <SettingOutlined /> }>
							<Link href={ '/server' }>
								Servidor
							</Link>
						</Menu.Item>
					</>
				) }

			</Menu>
		</Sider>
	)
}

export default MenuCollapsible
