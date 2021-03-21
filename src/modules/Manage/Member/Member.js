import React from 'react';
import './member.css';
import MemberForm from './MemberForm';

import FirebaseAPI from '../../FirebaseAPI';
import editLogo from '../../../icons/edit.jpg';

// declare 
let memberList = [];
let rule_convention = {
    'manager': 'Bí Thư',
    'halfmanager': 'Ban chấp hành',
};
let scope_convention = {
    'lienchidoan': 'Khoa',
    'chidoan':'Lớp'
};

function normalize(convention, x) {
    if (Object.keys(convention).includes(x) !== true) {
        x = (x === 'member')?'':'';
    } else {
        x = convention[x];
    }
    return x;
}

function nameAvatarProcess(name) {
    let strSplit = name.split(' ');
    let length = strSplit.length;
    let key = "";
    if(length <= 1) {
        key = name.slice(0,2);
    } else {
        let a = strSplit[0][0];
        let b = strSplit[strSplit.length-1][0];
        key = a + b;
    }
    return key;
}


function actionForm() {
    let classname = 'member-form';
    let element = document.getElementsByClassName(`${classname}`)[0];
    let fullClassname = element.className;

    if(fullClassname.includes('_1')) {
        fullClassname = fullClassname.replaceAll(/_1/g,'_0');
        element.setAttribute('class', fullClassname);
        return;
    } else {
        fullClassname = fullClassname.replaceAll(/_0/g,'_1');
        element.setAttribute('class', fullClassname);
        return;
    }
}

function memberUpdateAction(e) {
    let target = e.target;
    let theName = '';
    while(target.className.includes('member-box') === false)
    {
        if(target.className.includes("top"))
        {
            theName = target.innerText;
        }
        target = target.parentNode;
    }

    target = target.parentNode;
    let childrens = target.children;

    console.log(theName)

    console.log(childrens);
    for(let element of Array.from(childrens))
    {
        if(element.getElementsByClassName('top')[0].innerText === theName)
        {
            localStorage.setItem('index-member', Array.from(childrens).indexOf(element));
            break;
        } else continue;
    }
    actionForm();
}

function memberFormAction() {
    document.getElementsByClassName('custom-button')[0].innerHTML = 'Tạo';

    let _ = document.getElementsByClassName('custom-button');
    let x = _[1];
    let y = _[0];

    x.style.display = 'none';
    y.style.right = '20px';

    actionForm();
}

async function getMemberList() {
    memberList = await FirebaseAPI.collection.readAll('google-rule');
    return memberList;
}
getMemberList();

function nameColorCreate(name) {
    
}

class MemberComponent extends React.Component{
    state = {};
    componentWillMount() {
        let isTimeout = false;
        let times = setInterval(()=>{
            if(memberList.length !== undefined) {
                let index=0;
                let result = [];

                for(let member of memberList) {
                    let rule = normalize(rule_convention, member.rule);
                    let scope = normalize(scope_convention, member.scope);
                    let fullname = (member.fullname+"");
                    let unit = member.unit;

                    if((fullname+"") === "undefined")
                        fullname = 'User';

                    let rule_scope = (rule +" " + scope).trim();
                    isTimeout = true;
                    result.push((
                        <div className='member-box' key={index++}>
                            <div className='top'>
                                <div id='avatar-curcle'>
                                    {nameAvatarProcess(fullname)}
                                </div>
                                <div 
                                    id='edit-button' 
                                    onClick={memberUpdateAction}>
                                    <img 
                                        alt='i-dont-know' 
                                        src={editLogo} 
                                        style={{width: "50%", height:"50%", display:'inline-block'}}
                                    />
                                </div>
                            </div>
                            <div className='bot'>
                                <div className='title-text' style={{marginTop:10}}>
                                    {fullname}
                                    <div style={{fontWeight:'bold', fontSize:13}}>({rule_scope})</div>
                                </div>
                                <div className='describe-text'>
                                    {unit}
                                </div>
                            </div>
                        </div>
                        ));
                }
                this.setState({memberElements: result});
                if(isTimeout === true) clearInterval(times);
            }
        },1000);
    }

    render() {
        let pageCSS = {
            marginTop   : "var(--header-height)",
            position    : 'relative',
            width       : '95%',
            background  : 'white',
            left        : '50%',
            transform   : 'translateX(-50%)'
        };

        return (
            <div className='member-page'>
                <div style={pageCSS}>
                    {this.state.memberElements}
                </div>

                <div className='additional-box' onClick={()=>memberFormAction()}>
                    <span style={{position: 'relative', top:-2}}>+</span>
                </div>
                <MemberForm/>
            </div>
        )
    }
}

export default MemberComponent;