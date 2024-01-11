import Markdown from './pages/layout/markdown'
import Permission from './pages/layout/resource/permission'
import UserManage from './pages/layout/resource/user'
import About from './pages/layout/about'
import AddArt from './components/article/AddArt'
import Message from './pages/layout/message'
import Gollery from './pages/layout/gollery'
import AddGollery from './components/gollery/addGollery'
import Others from './pages/layout/others'
import ChinaMap from './pages/layout/echarts/china'
import Role from './pages/layout/resource/role'
const route = [
    {
        element: <Markdown />,
        path: "markdown",
        pid: "1001"
    },
    {
        element: <AddArt />,
        path: "addArt",
        pid: "100101"
    },
    {
        element: <About />,
        path: "about",
        pid: "1002"
    },
    {
        element: <Message />,
        path: "message",
        pid: "1003"
    },
    {
        element: <Gollery />,
        path: "gollery",
        pid: "1004"
    },
    {
        element: <AddGollery />,
        path: "addGollery",
        pid: "100404"
    },
    {
        element: <ChinaMap />,
        path: "echarts/chinaMap",
        pid: "1005"
    },
    {
        element: <Others />,
        path: "others",
        pid: "1006"
    },
    {
        element: <Role />,
        path: "resource/role",
        pid: "100701"
    },
    {
        element: <Permission />,
        path: "resource/permission",
        pid: "100702"
    },
    {
        element: <UserManage />,
        path: "resource/user",
        pid: "100703"
    },
]
export default route