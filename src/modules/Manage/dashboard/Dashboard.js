import React from 'react';
import './dashboard.css';

import tv from './tv.png';
import sk from './sk.png';


function LeftComponent() {
    return (<div className='left'>
        <ul className='left-component'>
            <li className='item'>Dashboard</li>
            <li className='item'>Thành viên</li>
            <li className='item'>Sự kiện</li>
            <hr style={{margin:0}}/>
            <li className='item danger'>Đăng xuất</li>
        </ul>
    </div>)
}

function RightComponent() {
    return (
    <div className='right'>
        <div className='right-component' id='right-component'>
            <div className='box-component'>
                <div className='image-element'>
                    <img src={tv} alt='thanh-vien.png' style={{width:'100%', height: '80%'}} />
                </div>
                <a href='/member' className='label-element'>
                    <span>Thành viên</span>
                </a>
            </div>
            <div className='box-component'>
                <div className='image-element'>
                    <img src={sk} alt='su-kien.png' style={{width:'100%', height: '80%'}} />
                </div>
                <a href='/event' className='label-element'>
                    <span>Sự kiện</span>
                </a>
            </div>
        </div>
    </div>);
}

class Dashboard extends React.Component {
    render() {
        return (<div className='dashboard-page'>            
            <LeftComponent/>
            <RightComponent/>
        </div>)
    }
}


export default Dashboard;