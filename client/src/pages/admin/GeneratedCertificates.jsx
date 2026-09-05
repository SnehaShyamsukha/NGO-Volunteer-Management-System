import {
useEffect,
useState
} from "react";


import {
toast
} from "react-toastify";


import {
getCertificates
} from "../../services/certificateService.js";



const GeneratedCertificates = ()=>{


const [certificates,setCertificates]=useState([]);



const load=async()=>{

try{


const res =
await getCertificates();


setCertificates(
res.data || []
);


}
catch(error){

toast.error(
"Failed loading certificates"
);

}

};



useEffect(()=>{

load();

},[]);




return(

<div className="container">


<h2 className="mb-4">

Generated Certificates

</h2>



<table className="table table-bordered">


<thead className="table-dark">

<tr>

<th>
Volunteer
</th>

<th>
Event
</th>

<th>
Certificate ID
</th>

<th>
Download
</th>

</tr>

</thead>




<tbody>


{
certificates.map(cert=>(


<tr key={cert._id}>


<td>

{cert.volunteer?.name}

</td>



<td>

{cert.event?.title}

</td>



<td>

{cert.certificateNumber}

</td>




<td>


<a

className="btn btn-success btn-sm"

href={`http://localhost:5000/${cert.pdfPath}`}

target="_blank"

>

Download PDF

</a>


</td>



</tr>


))
}



</tbody>



</table>



</div>

);


};


export default GeneratedCertificates;