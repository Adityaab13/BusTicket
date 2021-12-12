import React, { useState, useEffect } from 'react'
import { FaAngleDoubleDown } from "react-icons/fa";
import './busList.css';
import StarRatingComponent from 'react-star-rating-component';
import * as BusListFunc from './BuslistFunction'
import jwt_decode from 'jwt-decode';
export default function BusList({ value: dataInp }) {

    const [obj, setObj] = useState('')
    const [reset, Setreset] = useState(false)
    const [arrowDown, setArrowDown] = useState(false)
    const [clas, SetClas] = useState(true)

    const [rating, setRating] = useState(1)


    useEffect(() => {
        setObj(dataInp)
    }, [dataInp])


    const handleSubmit = bId => {
        localStorage.setItem("selectedBusId", bId)
        SetClas(false)
        setArrowDown(true)
    }


    const handleReset = (e) => {
        if (clas === false) {
            Setreset(true)
            SetClas(true)
            setArrowDown(false)
        }
        localStorage.removeItem("selectedBusId")
    }
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

    const renderFunction = () => {
        return dataInp.map((bus, idx) => {
            return (
                <div key={idx} className="card mt-5 buslist">
                    <div class="row ml-3">
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">Brand</div>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">From</div>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">To</div>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">Price</div>

                        <div class="w-100 d-none d-md-block"></div>

                        {console.log(bus.seatArray)}
                        <div class="col-6 col-sm-3 mb-4">{bus.companyName}</div>
                        <div class="col-6 col-sm-3 mb-4">{bus.startCity}</div>
                        <div class="col-6 col-sm-3 mb-4">{bus.destination}</div>
                        <div class="col-6 col-sm-3 mb-4">{bus.pricePerSeat}</div>
                        <div className="col-12 mt-n3 mb-3">
                            <div className="row m-0 no-gutters">
                                <div className="col-auto">
                                    Rating:
                                </div>
                                <div className="col pl-2">
                                    <StarRatingComponent
                                        name="rate1"
                                        starCount={5}
                                        value={bus.overAllReview ? bus.overAllReview : 0}
                                        onStarClick={(e) => ratingPost(e, bus)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-sm-4 mb-2 ml-0">
                            <button className={clas ? "btn btn-primary btn-md" : "btn btn-primary btn-md disabled"} onClick={(bId) => { handleSubmit(bus._id) }} >Book Now</button>
                        </div>
                        <div class="col-6 col-sm-4 mb-2 ml-0">
                            <span className={reset ? "badge badge-danger ml-5" : "disabled"} onClick={e => handleReset(e)}>Reset</span>
                        </div>
                    </div>
                </div >
            )
        })

    }


    return (
        <div className="">
            {renderFunction()}
            <div className={arrowDown ? "activeArrow" : "nonActive"}>
                <FaAngleDoubleDown />
            </div>
        </div>

    )
}
