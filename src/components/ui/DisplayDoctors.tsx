import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import { toast } from 'sonner';
import Modal from "src/components/ui/Modal";

interface Doctor {
  date_of_birth: any;
  start_date: any;
  gender: any;
  blood_group: any;
  experience: any;
  user_id: any;
  doctor_id: any;
  id: string;
  first_name: string;
  last_name: string;
  department: string;
  image_url: string;
  consultancy_rate: string;
  // Add other fields as necessary
}

const DisplayDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8080/doctors/all')
      .then((response) => {
        setDoctors(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Function that sends a request to get the details of a doctor by id
  const getDoctor = async (id: String) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/doctors/get-doctor/${id}`
      );
      console.log(response.data);
      setSelectedDoctor(response.data[0]);
      setOpen(true);
      // You can handle the response here, such as displaying the details in a modal or separate component
    } catch (error) {
      console.error(error);
      toast.error('Failed to get doctor details')
    }
  };

  const deleteDoctor = async (id: String) => {
    try {
      const response = await axios.delete(`http://localhost:8080/doctors/delete/${id}`);
      console.log(response.data);
      toast.success('Delete Successful')
      //window.location.reload();
      // You can handle the response here, such as displaying the details in a modal or separate component
    } catch (error) {
      console.error(error);
      toast.error('Delete Failed')
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };




  return (
    <>
    <div>
  <h1 className="text-center text-2xl font-bold text-[#005D90]">Doctors</h1>
</div>
<div className="flex flex-wrap gap-5 p-5 justify-center">
  {doctors.map(doctor => (
    <Card
      key={doctor.id}
      className="Card transition-shadow duration-300 hover:shadow-xl"
      style={{
        width: '17rem',
        height: '275px', // Set a fixed height for the card
        background: 'white',
        padding: '0px',
        margin: '0px',
        border: '1px solid lightgrey',
        borderRadius: '5px',
      }}
    >
      <img
        src={doctor.image_url}
        alt="not found"
        style={{
          width: '100%', // Set width to 100% for responsiveness
          height: '160px', // Set a fixed height for consistency
          objectFit: 'cover', // Ensure the image covers the area without stretching
        }}
      />
      <CardContent className="flex flex-col p-2 justify-center" style={{ height: '100px' }}> {/* Adjust height for content */}
        <CardHeader>
          <CardTitle className="text-[#005D90] text-center">
            {`${doctor.first_name} ${doctor.last_name}`}
          </CardTitle>
        </CardHeader>
        <div className="flex justify-between items-center h-full">
          <CardDescription className="text-base text-grey">
            {`${doctor.department}`}
          </CardDescription>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedDoctor(doctor);
                setOpen(true);
              }}
              className="bg-white text-[#005D90] hover:bg-[#005D90] hover:text-white font-bold py-1 px-3 rounded border border-[#005D90] "
            >
              Details
            </button>
            <button
              onClick={() => deleteDoctor(doctor.user_id)}
              className="bg-white text-red-500 hover:bg-red-500 hover:text-white font-bold py-1 px-3 rounded border border-red-500 "
            >
              Delete
            </button>
          </div>
        </div>
      </CardContent>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            maxWidth: "800px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              padding: "20px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <img
              src={selectedDoctor?.image_url}
              alt={`${selectedDoctor?.first_name} ${selectedDoctor?.last_name}`}
              style={{
                width: "250px",
                height: "200px",
                borderRadius: "5px",
                marginRight: "20px",
              }}
            />
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
                {`${selectedDoctor?.first_name} ${selectedDoctor?.last_name}`}
              </h1>
              <p style={{ fontSize: "18px", color: "#888" }}>
                {selectedDoctor?.department} | {selectedDoctor?.experience}
              </p>
              {/* <p style={{ fontSize: "18px", color: "#888" }}>
              {`${selectedDoctor?.consultancy_rate}`}
              </p> */}
              <p style={{ fontSize: "15px", color: "#888", marginTop: '3px', marginBottom: '3px' }}>
                Consultancy Rate: Rs. {selectedDoctor?.consultancy_rate}
              </p>
              {/* <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px', // Space between each row
                    padding: '20px',
                    maxWidth: '500px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <i className="fa fa-phone" aria-hidden="true" style={{ marginRight: '10px' }}></i>
                    <p style={{ margin: 0 }}>+000 111 222 333</p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <i className="fa fa-envelope" aria-hidden="true" style={{ marginRight: '10px' }}></i>
                    <p style={{ margin: 0 }}>infouser@mail.com</p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <i className="fa fa-map-marker" aria-hidden="true" style={{ marginRight: '10px' }}></i>
                    <p style={{ margin: 0 }}>Labaid, Road 04, Dhanmondi, Dhaka 1207</p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <i className="fa fa-star" aria-hidden="true" style={{ marginRight: '10px' }}></i>
                    <p style={{ margin: 0 }}>
                      100+ reviews <span style={{ color: '#ffc107' }}>★ 4.5</span>
                    </p>
                  </div>
                </div> */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="fa fa-phone" aria-hidden="true" style={{ width: '24px', textAlign: 'center' }}></i>
                    <p style={{ marginLeft: '10px' }}>+000 111 222 333</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="fa fa-envelope" aria-hidden="true" style={{ width: '24px', textAlign: 'center' }}></i>
                    <p style={{ marginLeft: '10px' }}>infouser@mail.com</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="fa fa-map-marker" aria-hidden="true" style={{ width: '24px', textAlign: 'center' }}></i>
                    <p style={{ marginLeft: '10px' }}>Labaid, Road 04, Dhanmondi, Dhaka 1207</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="fa fa-star" aria-hidden="true" style={{ width: '24px', textAlign: 'center' }}></i>
                    <p style={{ marginLeft: '10px' }}>
                      100+ reviews <span style={{ color: "#ffc107" }}>★ 4.5</span>
                    </p>
                  </div>
                </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              padding: "20px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <div style={{ flex: 1, paddingRight: "20px" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Doctor Information
              </h2>
              <p>
                <strong>Doctor ID:</strong> {selectedDoctor?.doctor_id}
              </p>
              <p>
                <strong>Age:</strong>{" "}
                {calculateAge(selectedDoctor?.date_of_birth)} Years Old
              </p>
              <p>
                <strong>Blood Group:</strong> {selectedDoctor?.blood_group}
              </p>
              <p>
                <strong>Gender:</strong> {selectedDoctor?.gender}
              </p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {formatDate(selectedDoctor?.date_of_birth)}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {formatDate(selectedDoctor?.start_date)}
              </p>
              
            </div>
            {/* <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Education
              </h2>
              <p>
                • Bachelor’s Degree: The first step is to complete a bachelor’s
                degree, usually in a science-related field such as biology,
                chemistry, or pre-medicine.
              </p>
            </div> */}
          </div>
          <div style={{ width: "100%", padding: "20px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Experience
            </h2>
            <p>
              • Telemedicine Innovation: Dr. Rodriguez spearheaded the
              implementation of telecardiology services, expanding access to
              cardiovascular care in remote areas.
            </p>
          </div>
        </div>
      </Modal>
    </Card>
  ))}
</div>
    </>
  );
};

export default DisplayDoctors;
