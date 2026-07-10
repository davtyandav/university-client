import React from 'react';
import "../../styles/footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="max-w-xs">
                    <h2 className="footer-title">Our College</h2>
                    <p className="footer-text">
                        Modern education and innovative programs for your future.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="footer-title">Quick Links</h2>
                    <ul className="footer-links">
                        <li>Home</li>
                        <li>Programs</li>
                        <li>Admissions</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className="text-right">
                    <h2 className="footer-title">Contact</h2>
                    <p className="footer-text">info@college.com | +374 00 000000</p>
                    <p className="footer-text">Yerevan, Armenia</p>
                </div>
            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} Our College. All rights reserved.
            </div>
        </footer>
    );
}
