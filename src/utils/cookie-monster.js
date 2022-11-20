import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function isLoggedIn() {
    let token = cookies.get("Isowatch-TOKEN");
    return (
        token ? true : false
    )
}

export function getName() {
    let name = cookies.get("Isowatch-name")
    return (
        name ? name : null
    )
}

export function handleLogout() {
    cookies.remove("Isowatch-TOKEN", { path:"/" })
    cookies.remove("Isowatch-ID", { path:"/" })
    cookies.remove("Isowatch-name", { path:"/" })
}