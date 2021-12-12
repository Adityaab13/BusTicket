import React, { useState, useEffect } from 'react';

export default function InquiryForm({ history }) {

        let [InquiryInfo, setInquiryInfo] = useState({});
        const handleEvent = (e, fields) => {
            let fieldsValue = e.target.value;
            setInquiryInfo({...InquiryInfo, [fields]:fieldsValue})
        }

        const submitData = (e) => {
            debugger;
            e.preventDefault();
            alert('firstname:' + InquiryInfo.firstname + '\n lastname:' + InquiryInfo.lastname + '\n email:' + InquiryInfo.email + '\n PhoneNumber:' + InquiryInfo.contact);
        }

        return ( 
            <div className="rdc">
            <div className="form-group inline"></div>
            <div className="main-container">
                <div className="form my-4 justify-content-center row">
            <div className="col-6">
                <form onSubmit = {(e) => submitData(e)}>
                    <div className="row m-0">
                        <div className="col-12 mb-3">
                        <input type="text" placeholder="First Name" onChange={(e) => handleEvent(e, "firstname")} className="form-control sgnUp"/>
                        </div>
                        <div className="col-12 mb-3">
                            <input placeholder="Last Name" id="lastname" onChange={(e) => handleEvent(e, "lastname")} className="form-control sgnUp"/>
                        </div>
                        <div className="col-12 mb-3">
                            <input placeholder="Email" id="email" onChange={(e) => handleEvent(e, "email")} className="form-control sgnUp"/>
                        </div>
                        <div className="col-12 mb-3">
                            <input placeholder="Contact Number" id="contact" onChange={(e) => handleEvent(e, "contact")} className="form-control sgnUp"/>
                        </div>
                       
                        <div className="col-12 my-4 text-center">
                        <button className='btn btn-success' type="submit" value="Submit" >
                                SUBMIT
                        </button>
                        </div>
                    </div>
                </form>
            </div>
        </div> 
            </div>
        </div>
        )
}