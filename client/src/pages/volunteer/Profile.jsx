import {
    useEffect,
    useState
} from "react";

import {
    Card,
    Button,
    ProgressBar,
    Form,
    Modal
} from "react-bootstrap";

import {
    toast
} from "react-toastify";

import {

    getProfile,

    updateProfile,

    uploadProfilePhoto,

    changePassword

} from "../../services/profileService.js";


import ProfileSection,{

    InfoRow,

    TagList

} from "../../components/ProfileSection.jsx";





const Profile =()=>{


const [user,setUser]=useState(null);


const [showEdit,setShowEdit]=useState(false);


const [showPassword,setShowPassword]=useState(false);


const [form,setForm]=useState({});


const [passwordForm,setPasswordForm]=useState({

    currentPassword:"",
    newPassword:"",
    confirmPassword:""

});





const loadProfile=async()=>{

    try{

        const response =
        await getProfile();


        setUser(
            response.data
        );


        setForm(
            response.data
        );


    }
    catch(error){

        console.log(error);

        toast.error(
            "Failed loading profile"
        );

    }

};






useEffect(()=>{

    loadProfile();

},[]);







const handlePhotoUpload=async(e)=>{


    try{


        const file =
        e.target.files[0];


        if(!file)
            return;



        await uploadProfilePhoto(
            file
        );


        toast.success(
            "Profile photo updated"
        );


        loadProfile();


    }
    catch(error){


        toast.error(
            "Photo upload failed"
        );


    }


};







const handleUpdate=async()=>{


    try{


        await updateProfile(
            form
        );


        toast.success(
            "Profile updated"
        );


        setShowEdit(false);


        loadProfile();


    }
    catch(error){


        toast.error(
            "Update failed"
        );


    }


};








const handlePasswordChange=async()=>{


    try{


        if(
            passwordForm.newPassword !==
            passwordForm.confirmPassword
        ){

            toast.error(
                "Passwords do not match"
            );

            return;

        }



        await changePassword({

            currentPassword:
            passwordForm.currentPassword,


            newPassword:
            passwordForm.newPassword

        });



        toast.success(
            "Password changed successfully"
        );


        setShowPassword(false);


        setPasswordForm({

            currentPassword:"",
            newPassword:"",
            confirmPassword:""

        });


    }
    catch(error){


        toast.error(

            error.response?.data?.message ||
            "Password change failed"

        );


    }


};







if(!user){


return(

<div className="text-center mt-5">


<div className="spinner-border text-success"/>


<p>
Loading Profile...
</p>


</div>

);


}







const completion =
user.profileCompletion || 0;







return(


<div className="container-fluid">


<h2 className="fw-bold mb-4">

👤 My Profile

</h2>





<div className="row g-4">





<div className="col-md-4">


<Card

className="shadow border-0 p-4 text-center"

style={{

borderRadius:"20px"

}}

>



{

user.profilePhoto ?

<img

src={
`http://localhost:5000/${user.profilePhoto}`
}

alt="profile"

style={{

width:"130px",

height:"130px",

borderRadius:"50%",

objectFit:"cover",

margin:"auto"

}}

/>


:

<div

style={{

fontSize:"80px"

}}

>

👤

</div>


}






<h3 className="fw-bold mt-3">

{user.name}

</h3>



<p className="text-muted">

Volunteer

</p>





<Form.Group>


<Form.Control

type="file"

accept="image/*"

onChange={
handlePhotoUpload
}

/>


</Form.Group>






<hr/>





<h6>

Profile Completion

</h6>



<ProgressBar

now={completion}

label={`${completion}%`}

className="mb-3"

/>





<Button

variant="success"

onClick={()=>setShowEdit(true)}

>

Edit Profile

</Button>





</Card>


</div>







<div className="col-md-8">







<ProfileSection

title="Personal Information"

icon="👤"

>


<InfoRow

label="Email"

value={user.email}

/>



<InfoRow

label="Certificate Name"

value={user.certificateName}

/>



<InfoRow

label="Phone"

value={user.phone}

/>



<InfoRow

label="Address"

value={user.address}

/>



<InfoRow

label="City"

value={user.city}

/>



<InfoRow

label="State"

value={user.state}

/>



</ProfileSection>







<ProfileSection

title="Professional Details"

icon="🎓"

>


<InfoRow

label="Education"

value={user.education}

/>




<InfoRow

label="Occupation"

value={user.occupation}

/>




<InfoRow

label="Experience"

value={user.experience}

/>



</ProfileSection>
<ProfileSection

title="Volunteer Details"

icon="🌱"

>


<InfoRow

label="Availability"

value={user.availability}

/>




<h6 className="fw-bold mt-3">

Skills

</h6>


<TagList

items={user.skills}

/>





<h6 className="fw-bold mt-3">

Interests

</h6>


<TagList

items={user.interests}

/>





<h6 className="fw-bold mt-3">

Languages

</h6>


<TagList

items={user.languages}

/>



</ProfileSection>








<ProfileSection

title="Contribution Summary"

icon="🏆"

>


<div className="row text-center">


<div className="col-md-4">


<h3>

{user.totalHours || 0}

</h3>


<p>

Hours

</p>


</div>





<div className="col-md-4">


<h3>

{user.totalEvents || 0}

</h3>


<p>

Events

</p>


</div>





<div className="col-md-4">


<h3>

{user.totalCertificates || 0}

</h3>


<p>

Certificates

</p>


</div>



</div>


</ProfileSection>








<ProfileSection

title="Security Settings"

icon="🔒"

>


<p className="text-muted">

Update your account password securely.

</p>



<Button

variant="outline-success"

onClick={()=>setShowPassword(true)}

>

Change Password

</Button>



</ProfileSection>






</div>


</div>









{/* EDIT PROFILE MODAL */}



<Modal

show={showEdit}

onHide={()=>setShowEdit(false)}

>


<Modal.Header closeButton>


<Modal.Title>

Edit Profile

</Modal.Title>


</Modal.Header>





<Modal.Body>




<Form.Control

className="mb-3"

placeholder="Name"

value={
form.name || ""
}

onChange={
e=>
setForm({

...form,

name:e.target.value

})

}

/>





<Form.Control

className="mb-3"

placeholder="Certificate Name"

value={
form.certificateName || ""
}

onChange={
e=>
setForm({

...form,

certificateName:e.target.value

})

}

/>





<Form.Control

className="mb-3"

placeholder="Phone"

value={
form.phone || ""
}

onChange={
e=>
setForm({

...form,

phone:e.target.value

})

}

/>





<Form.Control

className="mb-3"

placeholder="Education"

value={
form.education || ""
}

onChange={
e=>
setForm({

...form,

education:e.target.value

})

}

/>





<Form.Control

className="mb-3"

placeholder="Occupation"

value={
form.occupation || ""
}

onChange={
e=>
setForm({

...form,

occupation:e.target.value

})

}

/>





<Form.Control

className="mb-3"

placeholder="Experience"

value={
form.experience || ""
}

onChange={
e=>
setForm({

...form,

experience:e.target.value

})

}

/>



</Modal.Body>






<Modal.Footer>


<Button

variant="secondary"

onClick={()=>setShowEdit(false)}

>

Cancel

</Button>




<Button

variant="success"

onClick={handleUpdate}

>

Save Changes

</Button>



</Modal.Footer>


</Modal>









{/* CHANGE PASSWORD MODAL */}



<Modal

show={showPassword}

onHide={()=>setShowPassword(false)}

>


<Modal.Header closeButton>


<Modal.Title>

Change Password

</Modal.Title>


</Modal.Header>





<Modal.Body>



<Form.Control

type="password"

className="mb-3"

placeholder="Current Password"

value={
passwordForm.currentPassword
}

onChange={
e=>
setPasswordForm({

...passwordForm,

currentPassword:e.target.value

})

}

/>





<Form.Control

type="password"

className="mb-3"

placeholder="New Password"

value={
passwordForm.newPassword
}

onChange={
e=>
setPasswordForm({

...passwordForm,

newPassword:e.target.value

})

}

/>





<Form.Control

type="password"

placeholder="Confirm New Password"

value={
passwordForm.confirmPassword
}

onChange={
e=>
setPasswordForm({

...passwordForm,

confirmPassword:e.target.value

})

}

/>



</Modal.Body>







<Modal.Footer>


<Button

variant="secondary"

onClick={()=>setShowPassword(false)}

>

Cancel

</Button>





<Button

variant="success"

onClick={handlePasswordChange}

>

Update Password

</Button>



</Modal.Footer>



</Modal>






</div>


);



};






export default Profile;