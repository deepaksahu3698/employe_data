import React from "react";
const Employee_data=()=>{
    const[E_details,setEdetails]=React.useState([])
    const[loading,setLoading]=React.useState(false)
    const[error,setError]=React.useState(false)
const [E_data,setData]=React.useState({
    E_name:"",
    age:"",
    address:"",
    dept:"",
    salary:"",
    ismarried:false



})
const{E_name,age,address,salary,ismarried,dept}=E_data
const handelchange=(e)=>{
// console.log(e.target.value)
let{name,value,checked,type}=e.target
value = type === "checkbox" ? checked : value;
setData({...E_data,[name]:value})

}
// console.log(E_data)
const handlesubmit=(e)=>{
    e.preventDefault();
    fetch(`http://localhost:3003/E-data`,{
        method:"POST",
        body:JSON.stringify(E_data),
        headers:{
            "content-type":"application/json"
        }
    })
    .then((res)=>res.json())
    .then((res)=>get_item())
    .then((err)=>console.log("error"))
 

}
const get_item=()=>{
    setLoading(true)
    fetch(`http://localhost:3003/E-data`)
    .then((res)=>res.json())
    .then((res)=>{
        setEdetails(res)
        
    })
    .catch((err)=>{
        setError(true)
    })
    .finally(()=>{
        setLoading(false)
    })
}
// console.log(E_details)
React.useEffect(()=>{
    get_item()
},[])

const deletedata=(id)=>{
    let res=fetch(`http://localhost:3003/E-data/${id}`,{
        method:"DELETE"
    })
    get_item(res)
    
}
   
return loading?(<h1>Loading....</h1>):error?(<h1>Something went woring</h1>) :(



//     Name
// Age
// Address
// Department ( select tag )
// Salary
// marital state ( check box )
    <>
    <h3>Enter Employe Details</h3>                         
        <form action="" onSubmit={handlesubmit}>
    <div>
<label htmlFor="">Enter the employe name</label>
<input type="text" name="E_name" value={E_name} placeholder="Enter the name" onChange={handelchange}/>
    </div>
    <br />

    <div>
<label htmlFor="">Enter the employe Age</label>
<input type="number" name="age" value={age} placeholder="Enter the age" onChange={handelchange} />
    </div>
    <br />

    <div>
<label htmlFor="">Enter the employe Address</label>
<input type="text" name="address" value={address} placeholder="Enter the Address" onChange={handelchange} />
    </div>
    <br />
    
    <div>
<label htmlFor="">Select the employe Department</label>
<select name="dept" value={dept} id="" onChange={handelchange}>
    <option value="NONE">Select Dept</option>
    <option value="It">It</option>
    <option value="Math">Math</option>
    <option value="English">English</option>
    <option value="Physice">Physice</option>
    <option value="Biology">Biology</option>
</select>
    </div>
    <br />

    <div>
<label htmlFor="">Enter the employe Salary</label>
<input type="number" name="salary" value={salary} placeholder="Enter the Salary" onChange={handelchange}/>
    </div>
    <br />

    <div>
<label htmlFor="">marital state</label>
<input type="checkbox" name="ismarried" checked={ismarried} id="" onChange={handelchange}/>
    </div>
    <br />
    <input type="submit" value="Submit Data" name="Submit Data" />
    </form>
    <div>
<h3>Employe Details</h3>
<table className="table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Dept.</th>
            <th>Address</th>
            <th>marital status</th>
            <th>salary</th>
            <th>Delete</th>

        </tr>

    </thead>
    <tbody>
        {
            E_details.map((e)=>(
            //   console.log(e)

            <tr key={e.id}>
                <td>{e.E_name}</td>
                <td>{e.age}</td>
                <td>{e.dept}</td>
                <td>{e.address}</td>
                <td>{e.ismarried===true?"married":"unmarried"}</td>
                <td>{e.salary}</td>
                <td><button onClick={()=>deletedata(e.id)}>Delete</button></td>
            </tr>
            ))
        }

    </tbody>
</table>
</div>
</>


    )
}
export default Employee_data