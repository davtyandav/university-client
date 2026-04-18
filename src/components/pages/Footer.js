import "../../styles/footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div>
                    <h2 className="footer-title">Our College</h2>
                    <p className="footer-text">
                        We provide modern education,
                        innovative programs and a strong
                        foundation for students to build their future.
                    </p>
                </div>
                <div>
                    <h2 className="footer-title">Quick Links</h2>
                    <ul className="footer-links">
                        <li>Home</li>
                        <li>Programs</li>
                        <li>Admissions</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div>
                    <h2 className="footer-title">Contact</h2>
                    <p className="footer-text">Email: info@college.com</p>
                    <p className="footer-text">Phone: +374 00 000000</p>
                    <p className="footer-text">Yerevan, Armenia</p>
                </div>

            </div>
            <div className="footer-bottom">
                © {new Date().getFullYear()} Our College. All rights reserved.
            </div>

        </footer>
    );
}