import "../css/components/Footer.css"

export default function Footer() {
    return(
        <div className="footer">
            <div>
                <p>Gamify</p>
                <p>555 555 555 MVA</p>
                <p><a href="tel:+4755555555">55 55 55 55</a></p>
            </div>
            <div>
                <p><a href="/login">Logg inn</a></p>
                <p><a href="/register">Register</a></p>
                <p><a href="/">About us</a></p>
            </div>
            <div>
                <p><a href="/">Contact us</a></p>
                <p><a href="/games">See our new games</a></p>
                <p><a href="/">Join our newsletter</a></p>
            </div>
        </div>
    )
}