import logo from "../images/react.jpg"

function Header(){
    return <div className="app-header">
        <img src={logo} alt="" className="app-header__logo" />
        <h1 className="app-header__title">The React Quiz</h1>
    </div>
}

export default Header;