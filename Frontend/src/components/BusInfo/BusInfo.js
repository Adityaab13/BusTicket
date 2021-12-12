import React, { useState, useEffect } from 'react'
import * as BusInfoFunc from './BusInfoFunc'
import * as BusListFunc from '../BusList/BuslistFunction'
import jwt_decode from 'jwt-decode';
import StarRatingComponent from 'react-star-rating-component';


export default function Routeselector() {
    const [obj, setObj] = useState([])

    useEffect(() => {
        BusInfoFunc.Get().then(busInfo => {
            if (busInfo && busInfo.data && busInfo.data.bus && busInfo.data.bus.length > 0) {

                setObj(busInfo.data.bus);
            }
        });
    }, [])


    const ratingPost = (rating, o) => {

        const tok = sessionStorage.getItem('authToken')
        const decoded = jwt_decode(tok)
        console.log(rating)
        console.log(o)

        BusListFunc.addReview({ bId: o._id, rating: rating, userId: decoded.doc._id }).then(res => {
            if (res && res.data && res.data.success) {
                o.overAllReview = res.data.overAllReview;
                setObj(obj.map(el => (el._id === o._id ? Object.assign({}, el, o) : el)));
            }
            console.log(res);
        })
    };

    return (
        <div className="rdc">
            <div className="form-group inline"></div>
            <div className="main-container">
                {obj.map(item => (
                    <div class="card buslist">
                        <div class="row ml-3">
                            <div class="col-6 col-sm-4 mt-2 font-weight-bold ">Agency name</div>
                            <div class="col-6 col-sm-4 mt-2 font-weight-bold ">route </div>
                            <div class="col-6 col-sm-4 mt-2 font-weight-bold ">reviews</div>
                            <div class="w-100 d-none d-md-block"></div>
                            <div class="col-6 col-sm-4 mb-4">{item.companyName}</div>
                            <div class="col-6 col-sm-4 mb-4">{item.startCity} to {item.destination} </div>
                            <div class="col-6 col-sm-4 mb-4">

                                <StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={item.overAllReview ? item.overAllReview : 0}
                                    onStarClick={(e) => ratingPost(e, item)}
                                />

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
