import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function isLoggedIn() {
    let token = cookies.get("Isowatch-TOKEN");
    return (
        token ? true : false
    )
}

export function getId() {
    let id = cookies.get("Isowatch-userID")
    return (
        id ? id : null
    )
}

export function getName() {
    let name = cookies.get("Isowatch-name")
    return (
        name ? name : null
    )
}

export function getToken() {
    let token = cookies.get("Isowatch-TOKEN");
    return (
        token ? token : null
    )
}

export function handleLogout() {
    cookies.remove("Isowatch-TOKEN", { path:"/" })
    cookies.remove("Isowatch-ID", { path:"/" })
    cookies.remove("Isowatch-name", { path:"/" })
}