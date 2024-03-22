import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import RadioComponent from './RadioComponent';
import LastFmComponent from './LastFmComponent';
import ProfilePage from './ProfilePage'; // Import ProfilePage component
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [radioData, setRadioData] = useState(null);

    // Check if user is already logged in from cookies or local storage
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            localStorage.setItem('user', JSON.stringify(codeResponse)); // Save user data in local storage
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                    fetchRadioData();
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const fetchRadioData = () => {
        axios.get('https://api.radio.com/data')
            .then((response) => {
                setRadioData(response.data);
            })
            .catch((error) => console.log('Radio Data Fetch Error:', error));
    };

    const logOut = () => {
        localStorage.removeItem('user'); // Remove user data from local storage on logout
        googleLogout();
        setProfile(null);
        setUser(null);
        setRadioData(null);
    };

    useEffect(() => {
        const homepage = document.getElementById('homepage');
        if (homepage) {
            homepage.style.background = '#f4f4f4';
            homepage.style.padding = '120px';
            homepage.style.borderRadius = '10px';
            homepage.style.margin = '100px';
        }
    }, []);

    return (
        <div className="landing-page">
            <div className="content">
                <div id="homepage">
                    <h1>Welcome to Our Local Music</h1>
                    <p>Explore the amazing features!</p>

                    {profile ? (
                        <>
                            <ProfilePage profile={profile} logOut={logOut} /> {/* Render ProfilePage */}
                            {radioData && <RadioComponent data={radioData} />}
                        </>
                    ) : (
                        <div className="login-container">
                            <button
    id="login-btn"
    onClick={login}
    style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 20px',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '5px',
        cursor: 'pointer'
    }}
>
    <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google Logo"
        style={{
            width: '20px',
            height: '20px',
            marginRight: '10px'
        }}
    />
    Sign in with Google 
</button>
                            <p>Don't have an account? <a href="/login.js">Sign up</a></p>
                            
    <img 
        src="https://png2.cleanpng.com/sh/f475450e4b717fa776179ff75519f777/L0KzQoS3VMIyN5JsjZH9cnHxg8HokvVvfF5yjeVyYz3xf8XsTcY1PGMAS6ZrZEDoQ4a9TsEzOmc1TKI9MUa7QoGBVMY5O2k6Tag3cH7q/transparent-music-note-6442934bd0e356.1226040416820846838556.png" 
        alt="home" 
        style={{ width: '800px', height: '800px', position: 'absolute', top: '40%', left: '80%', transform: 'translate(-50%, -50%)' }}
    /><img 
        src="https://png2.cleanpng.com/sh/78a54f876cea0ff257af9608550377f6/L0KzQYm3VsIzN5dskpH0aYP2gLBuTfxqd58yjJ98aHn1hH7Dif9vNZV3fdNtbHBme8S0kvF0fJJreeRyLUXlQrW9WfE4PWprUKMDLkGzQ4e5VcI0OWY3Uak5Mki1Q4S9WMUveJ9s/kisspng-lion-t-shirt-zion-dreadlocks-rastafari-5b2d69a759f818.1036252315297028233685.png" 
        alt="home" 
        style={{ width: '800px', height: '800px', position: 'absolute', top: '40%', left: '80%', transform: 'translate(-50%, -50%)' }}
    />
    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
export { RadioComponent, LastFmComponent };