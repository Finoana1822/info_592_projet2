export const useAuth = () => {
    const token = localStorage.getItem('token') as string
    if (token) {
        return true;
    } else {
        return false
    }
};