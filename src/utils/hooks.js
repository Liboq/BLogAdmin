
import { useSelector } from 'react-redux';
const usePermission = () => {
    const state = useSelector(state => state)
    const hasPermission = (params) => {
        return state.Roles.role.includes(+params)
    }
    return {
        hasPermission
    }
}
export default usePermission