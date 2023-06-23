import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminHomePage = () => {
    const [totalUserCount, setTotalUserCount] = useState(0);
    const [totalProductCount, setTotalProductCount] = useState(0);

    const getCounts = async () => {
        try {
            const user = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-user-count`);
            const product = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-product-count`);
            setTotalUserCount(user.data.totalUserCount);
            setTotalProductCount(product.data.totalProductCount);
        } catch (err) {
            toast.error(err.response.message)
        }
    }

    useEffect(() => {
        getCounts();
    }, []);

    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="row">
                <main role="main" className="">
                    <div className="pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h1 text-center">Admin Dashboard</h1>
                    </div>
                    <div className="row d-flex justify-content-center text-center">
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-header h3">Total Users</div>
                                <div className="card-body">
                                    <p className="card-title fs-4">Number of Total Users = <b>{totalUserCount}</b></p>
                                    <p className="card-text">The total number of Customers will display here.</p>
                                    <Link to={'/admin/view-users'} className="btn btn-primary fw-bold">View Users</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-header h3">Total Products</div>
                                <div className="card-body">
                                    <p className="card-title fs-4">Number of Total Products = <b>{totalProductCount}</b></p>
                                    <p className="card-text">The total number of Products will display here.</p>
                                    <Link to={'/admin/view-products'} className="btn btn-primary fw-bold">View Products</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminHomePage;