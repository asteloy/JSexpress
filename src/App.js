import './App.css';
import {
    useCookies
} from "react-cookie";
import {
    useState
} from "react";
import Navigation from "./components/Nav/Navigation";
import ProductList from "./components/Product/ProductList";
import LogInAction from "./components/LogIn/LogInAction";
import Cart from "./components/Cart/Cart";
import Order from "./components/Order/Order";


function App() {
    const [cookies, setCookie] = useCookies(['cart', 'order', 'authData'], );
    const [activePage, setActivePage] = useState(sessionStorage.getItem('page') || 'Каталог');
    const [activeUser, setActiveUser] = useState(sessionStorage.getItem('user') || 'defaultUser')

    let content = null;
    let navigation = null;
    /* beautify ignore:start */
    switch (activeUser) {
        case 'defaultUser':
            navigation = <Navigation page={activePage} coocki={{cookies, setCookie}} repage={changePage} logOut={logOut}/>
            break;
        case 'fired':
            navigation = <Navigation page={activePage} coocki={{cookies, setCookie}} repage={changePage} logOut={logOut}/>
            break;
        case 'admin':
            navigation = <Navigation page={activePage} coocki={{cookies, setCookie}} repage={changePage} logOut={logOut}/>
            break;
        default:
            navigation = <Navigation page={activePage} coocki={{cookies, setCookie}} repage={changePage} logOut={logOut}/>
            break;
    }
    /* beautify ignore:end */

    /* beautify ignore:start */
    switch (activePage) {
        case 'Каталог':
            content = <ProductList cookies={{cookies, setCookie}}/>
            break;
        case 'Корзина':
            content = <Cart cookies={{cookies, setCookie}}/>
            break;
        case 'Заказы':
            content = <Order {...{cookies, setCookie}}/>
            break;
        case 'Вход':
            content = <LogInAction cookies={{cookies, setCookie}} setActiveUser={{activeUser, changeActiveUser} } logOut={logOut}/>
            break;
        default:
            content = <ProductList cookies={{cookies, setCookie}}/>
            break;
    }
    /* beautify ignore:end */
    function changePage(e) {
        if (e === "Каталог") {
            setActivePage(e);
            return;
        };
        e.preventDefault();
        if (e.target.text === activePage) return
        setActivePage(e.target.dataset.page);
        sessionStorage.setItem('page', e.target.dataset.page)
    }


    function changeActiveUser(role) {
        setActiveUser(role);
        changePage("Каталог");
        sessionStorage.setItem('user', role);
    }


    function logOut() {
        setActiveUser('defaultUser')
        setCookie('authData', undefined, {
            path: '/'
        });
        sessionStorage.setItem('user', cookies.authData.role);
        changePage("Каталог");
    }

    /* beautify ignore:start */
    return (
        <>
            <header>
                {navigation}
            </header>
            <main>
                <div className="container mt-5">
                    <h3>{activePage === 'Каталог' ? 'Каталог' : activePage}</h3>
                    {content}
                </div>
            </main>
        </>
    );
    /* beautify ignore:end */
}

export default App;