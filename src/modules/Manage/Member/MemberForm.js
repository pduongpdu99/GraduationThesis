import React from 'react';
import './member-form.css';

import FirebaseAPI from '../../FirebaseAPI';

class MemberForm extends React.Component {
    render() {
        return (
            <div className='member-form _0'>
                <div className='member-box'>
                    <div className='item-group'>
                        <div className='title-label'><strong>Họ và tên</strong></div>
                        <div className='group'>
                            <div className='field'>
                                <input type='text' className='input-field lastname' placeholder='Nhập họ'/>
                                <div className='under-background-line'/>
                                <div className='under-hightlight-line'/>
                            </div>
                            <div className='field'>
                                <input type='text' className='input-field firstname' placeholder='Nhập tên'/>
                                <div className='under-background-line'/>
                                <div className='under-hightlight-line'/>
                            </div>
                        </div>
                    </div>
                    <div className='item-group'>
                        <div className='title-label'><strong>Địa chỉ email</strong></div>
                        <div className='group'>
                            <div className='field'>
                                <input type='text' className='input-field email' placeholder='Nhập họ'/>
                                <div className='under-background-line'/>
                                <div className='under-hightlight-line'/>
                            </div>
                        </div>
                    </div>
                    <div className='item-group'>
                        <div className='title-label'><strong>Cấp</strong></div>
                        <div className='group'>
                            <div className='field'>
                                <select className='select level'>
                                    <option>Trường</option>
                                    <option>Lớp</option>
                                    <option>Khoa</option>
                                </select>
                                <div className='under-background-line'/>
                                <div className='under-hightlight-line'/>
                            </div>
                        </div>
                    </div>
                    <div className='item-group'>
                        <div className='title-label'><strong>Vai trò</strong></div>
                        <div className='group'>
                            <div className='field'>
                                <select className='select rule' style={{width: "95%"}}>
                                    <option>halfmanager</option>
                                    <option>manager</option>
                                    <option>member</option>
                                </select>
                                <div className='under-background-line'/>
                                <div className='under-hightlight-line'/>
                            </div>
                            <div className='field'>
                                <select className='select scope' style={{width: "95%"}}>
                                    <option>chidoan</option>
                                    <option>lienchidoan</option>
                                    <option>truong</option>
                                </select>
                                <div className='under-background-line'/>
                                <div className='under-hightlight-line'/>
                            </div>
                        </div>
                    </div>
                    <div className='item-group'>
                        <div className='title-label'><strong>Đơn vị (khoa, lớp, trường)</strong></div>
                        <div className='group'>
                            <div className='field'>
                                <select className='select unit'>
                                    <option>Khoa Công nghệ thông tin</option>
                                    <option>Khoa Kỹ thuật công nghệ</option>
                                    <option>Khoa Hóa - sinh - môi trường</option>
                                    <option>Khoa Sư phạm tự nhiên</option>
                                    <option>Khoa Sư phạm xã hội</option>
                                    <option>Khoa Giáo dục thể chất</option>
                                </select>
                                <div className='under-background-line'/>
                                <div className='under-hightlight-line'/>
                            </div>
                        </div>
                    </div>
                    <div className='item-group'>
                        <div className='group'> 
                            <div className='field'>
                                <button className='custom-button' onClick={UpdateEvent} style={{right: 180}}>Cập nhật</button>
                            </div>
                            <div className='field'>
                                <button className='custom-button delete' onClick={DeleteEvent} >Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dark-background' onClick={memberFormAction}></div>
            </div>
        );
    }
}

function DeleteEvent(e) {
    let element = e.target;
    let target = 'member-box';
    while(element.className.trim() !== target.trim())
    {
        element = element.parentNode;
    }

    let inputDataset = element.getElementsByTagName('input');
    inputDataset = Array.from(inputDataset);
    let selectDataset = element.getElementsByTagName('select');
    selectDataset = Array.from(selectDataset);

    let classNames = inputDataset.concat(selectDataset).map(element => element.className);
    let valueDataset = inputDataset.concat(selectDataset).map(element => element.value);
    let keys = classNames.map(name => name.split(' ')[1]);

    let data = {};
    for(let index =0; index < keys.length; index++)
    {
        let key = keys[index];
        data[key] = valueDataset[index];
    }
    
    data['fullname'] = `${data['lastname']} ${data['firstname']}`;
    let index = localStorage.getItem('index-member');
    if(index !== undefined) {
        FirebaseAPI.collection.memberRemove(parseInt(index));
        document.getElementsByClassName('dark-background')[0].click();
        setTimeout(()=>window.location.reload(), 3000);
    } else {
        alert('Thông tin xóa không phù hợp');
    }
}

function UpdateEvent(e) {
    let element = e.target;
    let feature = element.innerText.toLowerCase();
    let target = 'member-box';
    while(element.className.trim() !== target.trim())
    {
        element = element.parentNode;
    }

    let inputDataset = element.getElementsByTagName('input');
    inputDataset = Array.from(inputDataset);
    let selectDataset = element.getElementsByTagName('select');
    selectDataset = Array.from(selectDataset);

    let classNames = inputDataset.concat(selectDataset).map(element => element.className);
    let valueDataset = inputDataset.concat(selectDataset).map(element => element.value);
    let keys = classNames.map(name => name.split(' ')[1]);

    let data = {};
    for(let index =0; index < keys.length; index++)
    {
        let key = keys[index];
        data[key] = valueDataset[index];
    }
    
    data['fullname'] = `${data['lastname']} ${data['firstname']}`;

    if(isValid(valueDataset)) {
        if(feature === ('tạo')) {
            FirebaseAPI.collection.memberAppend(data);
        } else {
            let index = localStorage.getItem('index-member');
            FirebaseAPI.collection.memberUpdate(data, parseInt(index));
        }
        document.getElementsByClassName('dark-background')[0].click();
        setTimeout(()=>window.location.reload(), 3000);
    } else {
        alert('Có ít nhất một field chưa có thông tin');
    }
}

function memberFormAction() {
    let classname = 'member-form';

    let element = document.getElementsByClassName(`${classname}`)[0];
    let fullClassname = element.getAttribute('class');

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

function isValid(args) {
    return Math.min(...args.map(element => element !== '')) !== 0;
}

export default MemberForm;