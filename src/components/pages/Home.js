import React from 'react';

const Home = () => {
    return (
        <div style={{padding: '40px', textAlign: 'center'}}>
            <h1>Welcome to University Center</h1>
            <p>Manage your students, mentors, and lessons in one place.</p>

            <div className="contacts-section" style={{marginTop: '50px'}}>
                <h2>Our Contacts</h2>
                <p>Email: support@university.com</p>
                <p>Phone: +1 234 567 890</p>
            </div>
        </div>
    );
};

export default Home;