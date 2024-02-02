import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import './Expense.css'
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { auth, db, } from './firebase'
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default function AddExpense() {
    const [expenseName, setExpenseName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState(0)
    const [currentUser, setCurrentUser] = useState("");
    useEffect(() => {
        // Firebase Auth listener
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                setCurrentUser(user);
            } else {
                // User is signed out.
                setCurrentUser(null);
            }
        });

        // Cleanup function
        return () => unsubscribe();
    }, []);

    const getCurrentTimeAsNumber = () => {
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentTime.getSeconds().toString().padStart(2, '0');

        const formattedTime = `${hours}${minutes}${seconds}`;
        return formattedTime;
    };

    let data = {};
    const handleSubmit = async (e) => {
        if (expenseName === "") {
            toast.error("Enter your userName")
            e.preventDefault();
        }
        else {
            console.log("Here")
        }
        if (category === "") {
            toast.error("Please provide one of the following category")
            e.preventDefault()
        }
        if (price <= 0) {
            toast.error("Please enter a valid price.")
            e.preventDefault()
        }
        if (expenseName !== "" && category !== "" && price !== 0) {
            e.preventDefault()
            data = {
                "expenseName": expenseName,
                "category": category,
                "price": price.toFixed(2),
            }
            console.log("data")

        }
        try {
            await setDoc(doc(db, currentUser.uid,getCurrentTimeAsNumber()), {
                expenseName:expenseName,
                category:category,
                price:price
            });
            toast.success("maja ayo")
        }
        catch(error) {
            toast.error(error)
        }
        

    }



    return (
        <div>
            <Header />
            <div className="div-center">
                <h1>Add Expense</h1>
            </div>

            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="form-head">Expense Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Example:Walmart"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="form-head">Category</Form.Label>
                    <Form.Select
                        aria-label="Default select example"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option>Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Bills">Bills</option>
                        <option value="Outdoor Expenses">Outdoor Expenses</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Remitance">Remitance</option>
                        <option value="Gas">Gas</option>
                        <option value="Car-Maintainance">Car-Maintainance</option>
                        <option value="Rent">Rent</option>
                        <option value="Bills">Bills</option>
                        <option value="Interest Charged">Interest Charged</option>
                        <option value="Ride">Ride</option>
                        <option value="Others">Others</option>

                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="form-head">Expense Price:$</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Example:14"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
            <Toaster />

        </div>
    )
}