"use client"
import { useState, useEffect } from "react"

export default function Page() {
    const [form, setForm] = useState({
        url: "",
        una: "",
        pas: ""
    });
    const [passwords, setPasswords] = useState([]);
    const getpasswords = async () => {
        let req = await fetch("http://localhost:3000/");
        let data = await req.json();
        setPasswords(data);
    }
    useEffect (() => {
        getpasswords();
    },[]);

    const handlechange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const newpass = [...passwords, form];
        setPasswords(newpass);
        let res = fetch ("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(form)});
        getpasswords();
        setForm({
            url: "",
            una: "",
            pas: ""
        });
    }
    const handledelete = async (index) => {
        await fetch("http://localhost:3000/"+index, {method: "DELETE"});
        getpasswords();
    }
    return <>
        <div id="head" style={{ color: "#00ADB5" }}>{"<Password Manager/>"}</div>
        <div id="body">
            <div id="up">
                <div id="titl">Your Own Password Manager</div>
                <form id="Forms" onSubmit={handlesubmit}>
                    <textarea name="url" className="info" placeholder="Enter Website URL" value={form.url} onChange={handlechange}></textarea>
                    <textarea name="una" className="info" placeholder="Enter Username" value={form.una} onChange={handlechange}></textarea>
                    <textarea name="pas" className="info" placeholder="Enter Password" value={form.pas} onChange={handlechange}></textarea>
                    <button id="savebutton" type="submit">Save</button>
                </form>
            </div>
            <div id="do">
                <div id="tite">Your Passwords</div>
                <div id="displayarea">
                    <table>
                        <thead>
                            <tr>
                                <th>Site</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwords.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.url}</td>
                                    <td>{item.una}</td>
                                    <td>{item.pas}</td>
                                    <td><button onClick={() => handledelete(item._id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div id="foot" style={{ color: "#00ADB5" }}>{"<Password Manager/>"} <br/> Created With ❤️ From Varang</div>
    </>
}