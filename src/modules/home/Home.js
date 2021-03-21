import React from 'react';

function isAllow(username, password) {
    let isUsername = false;
    let isPassword = false;

    isUsername = username === 'phamduong';
    isPassword = password === '123';

    return isUsername === true && isPassword === true;
}

function signin() {
    let usernameIndex = 'username';
    let passwordIndex = 'password';
    let usernameField = document.getElementById(usernameIndex);
    let passwordField = document.getElementById(passwordIndex);

    let allow = isAllow(usernameField.value, passwordField.value);
    if(allow) {
        localStorage.setItem('login', true);
        window.location.href='/';
    } 
}

class Home extends React.Component {
    render() {
        return (
            <div className='home-page'>
                <div className='login-element'>
                    <div className='box'>
                        <div style={{
                            position: 'relative',
                            transform: 'translate(-50%,-50%)'
                        }} method='post'>
                            <div className='login-title'>Đăng nhập</div>
                            <div className='form-group'>
                                <div style={{width:100, fontWeight:'bold'}}>Tài khoản:</div>
                                <input 
                                type='text' 
                                id='username'
                                placeholder='Nhập tài khoản'/>
                            </div>
                            <div className='form-group'>
                                <div style={{width:100, fontWeight:'bold'}}>Mật khẩu:</div>
                                <input 
                                type='password' 
                                id='password'
                                placeholder='Nhập mật khẩu'/>
                            </div>
                            <div>
                                <button className='login-btn' onClick={signin}>Đăng nhập</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Home;