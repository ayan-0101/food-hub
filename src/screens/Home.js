import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import carousel1 from '../media/carousel_image_01.jpg'
import carousel2 from '../media/carousel_image_02.jpg'
import carousel3 from '../media/carousel_image_03.jpg'

const Home = () => {

    const [foodcat, setFoodcat] = useState([])
    const [foodItem, setFoodItem] = useState([])
    const [search, setSearch] = useState('')

    const loadData = async () => {
        let response = await fetch('http://localhost:5000/api/foodData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setFoodItem(response[0])
        setFoodcat(response[1])

    }
    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div><Navbar /></div>

            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="2000" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=> setSearch(e.target.value)}/>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src={carousel1} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={carousel2} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={carousel3} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className='container'>
                {
                    foodcat.length !== 0
                        ? foodcat.map((data, index) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        foodItem.length !== 0
                                            ? foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search)) 
                                            .map((filterItems) => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                        <Card
                                                            foodItem={filterItems}
                                                            options={filterItems.options[0]}
                                                            
                                                        />
                                                    </div>
                                                )
                                            }
                                            )
                                            : <div>No Data Found</div>
                                    }
                                </div>
                            )
                        })
                        : <div>No Data Found</div>
                }
            </div>
            <div><Footer /></div>
        </div>
    )
}

export default Home
