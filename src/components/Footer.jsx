import "../css/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content">
                <div className="footer__more">
                    <a href="#">
                        <span>Facebook</span>
                    </a>
                    <a href="#">
                        <span>Instagram</span>
                    </a>
                    <a href="#">
                        <span>Pinterest</span>
                    </a>
                </div>
                <div className="footer__line"></div>
                <span>© 2035 by R&C. Powered and secured by <a href="#">Wix.</a></span>
            </div>
        </footer>
    );
}

export default Footer;
