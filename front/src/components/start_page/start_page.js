import { Link } from "react-router-dom"
import Footer from "../footer/footer"
import "./start_page.css"
import { Theme } from "../theme/theme"

function StartPage(props){
    return (
        <div className="startPage">
            <header>
                <div className="startPageHeader">
                    <div className="logoContainer titleText">SHOP NAME</div>
                    <nav>
                        <div className="navElement">
                            <Link className="regularText aText" to="/registration">SIGN UP</Link>
                        </div>
                        <div className="navElement">
                            <Link className="regularText aText" to="/login">LOG IN</Link>
                        </div>
                        <div className="navElement">
                            <Theme/>
                        </div>
                    </nav>
                </div>
            </header>
            <main>{props.element}</main>
            <footer>
                <div className="startPageFooter"></div>
            </footer>
        </div>
    )
}

export default StartPage