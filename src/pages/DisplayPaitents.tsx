import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { toast } from 'sonner';
import Modal from "src/components/ui/Modal";

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  date_of_birth: string;
  user_status: string;
  date_of_visit: string;
  image_url: string;
  // Add other fields as necessary
}

const DisplayPatients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8080/patients/all')
      .then((response) => {
        setPatients(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getPatient = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/patients/get-patient/${id}`);
      console.log(response.data);
      setSelectedPatient(response.data[0]);
      setOpen(true);
    } catch (error) {
      console.error(error);
      toast.error('Failed to get patient details');
    }
  };

  const deletePatient = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/patients/delete/${id}`);
      toast.success('Delete Successful');
      setPatients(patients.filter(patient => patient.id !== id));
    } catch (error) {
      console.error(error);
      toast.error('Delete Failed');
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
        <h1 className="text-center text-2xl font-bold text-[#005D90]">Patients</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-5 p-5">
        {patients.map(patient => (
          <Card
            key={patient.id}
            className="Card transition-shadow duration-300 hover:shadow-xl"
            style={{
              width: '18rem',
              background: 'white',
              padding: '0px',
              margin: '10px',
              border: '2px solid lightgrey',
              borderRadius: '5px',
            }}
          >
            <img
              src={patient.image_url}
              alt="not found"
              style={{
                height: 'auto'
              }}
            />
            <CardContent className="flex flex-col p-2">
              <CardHeader>
                <CardTitle className="text-[#005D90]">
                  {`${patient.first_name} ${patient.last_name}`}
                </CardTitle>
              </CardHeader>
              <div className="flex justify-between">
                <CardDescription className="text-base text-grey">
                  {`${patient.user_status}`}
                </CardDescription>
                <div className="flex space-x-2">
                  <button
                    onClick={() => getPatient(patient.id)}
                    className="bg-white text-[#005D90] hover:bg-[#005D90] hover:text-white font-bold py-1 px-3 rounded border border-[#005D90]"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => deletePatient(patient.id)}
                    className="bg-white text-[#005D90] hover:bg-red-500 hover:text-white font-bold py-1 px-3 rounded border border-[#005D90]"
                  >
                    Delete
                  </button>
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
                          src={selectedPatient?.image_url}
                          alt={`${selectedPatient?.first_name} ${selectedPatient?.last_name}`}
                          style={{
                            width: "250px",
                            height: "200px",
                            borderRadius: "5px",
                            marginRight: "20px",
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
                            {`${selectedPatient?.first_name} ${selectedPatient?.last_name}`}
                          </h1>
                          <p style={{ fontSize: "18px", color: "#888" }}>
                            {selectedPatient?.user_status}
                          </p>
                          <p>
                            <i className="fa fa-phone" aria-hidden="true"></i>{" "}
                            {selectedPatient?.phone_number}
                          </p>
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
                            Patient Information
                          </h2>
                          <p>
                            <strong>Patient ID:</strong> {selectedPatient?.id}
                          </p>
                          <p>
                            <strong>Age:</strong>{" "}
                            {selectedPatient?.date_of_birth
                              ? calculateAge(selectedPatient.date_of_birth)
                              : "N/A"}{" "}
                            Years Old
                          </p>
                          <p>
                            <strong>Gender:</strong> {selectedPatient?.gender}
                          </p>
                          <p>
                            <strong>Date of Birth:</strong>{" "}
                            {selectedPatient?.date_of_birth
                              ? formatDate(selectedPatient.date_of_birth)
                              : "N/A"}
                          </p>
                          <p>
                            <strong>Date of Visit:</strong>{" "}
                            {selectedPatient?.date_of_visit
                              ? formatDate(selectedPatient.date_of_visit)
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default DisplayPatients;

