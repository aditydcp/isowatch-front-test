import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function isLoggedIn() {
    let token = cookies.get("TOKEN");
    return (
        token ? true : false
    )
}

export function handleLogout() {
    cookies.remove("TOKEN", { path:"/" })
}