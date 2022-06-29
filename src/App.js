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
import Registration from "./components/Registration/Registration";
import CreateProduct from './components/Product/CreateProduct';

function App() {
    const [cookies, setCookie] = useCookies(['cart', 'order', 'authData'], );
    const [activePage, setActivePage] = useState(sessionStorage.getItem('page') || 'Каталог');
    const [activeUser, setActiveUser] = useState(sessionStorage.getItem('user') || 'defaultUser')

    let content = null;
    let navigation = < Navigation page = {
        activePage
    }
    coocki = {
        {
            cookies,
            setCookie
        }
    }
    repage = {
        changePage
    }
    logOut = {
        logOut
    }
    />;

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
        case 'Регистрация':
            content = <Registration cookies={{cookies, setCookie}} setActiveUser={{activeUser, changeActiveUser} }/>
            break;
        case 'ДобавлениеКарточки':
            content = <CreateProduct cookies={{cookies, setCookie}} />
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