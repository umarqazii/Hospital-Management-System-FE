import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "src/components/ui/dropdown-menu"
  import { Label } from "./label";
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

interface Patient {
  user_id: string;
  email: any;
  mobile_no: any;
  patient_id: string;
  full_name: string;
  gender: string;
  doctors_name: string;
  mobile_number: string;
  joining_date: string;
  date_of_birth: string;
  city: string;
  country: string;
  image_url: string;
  department: string;
  id: string;
}

const Assignments: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [doctors_name, setDoctors_name] = useState<any>("");
    const [patient_name, selectedPatient_name] = useState<any>("");
    const [doctor_id, setDoctorId] = useState<any>("");
    const [patient_id, setPatientId] = useState<any>("");
    const [consultancy_rate, setConsultancyRate] = useState<any>("");
  
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
  
    useEffect(() => {
      axios.get('http://localhost:8080/patients/all-patients-without-pagination')
        .then((response) => {
          // Ensure response.data is an array
          if (Array.isArray(response.data)) {
            setPatients(response.data);
          } else {
            console.error("Unexpected response format:", response.data);
          }
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const handleDoctorSelect = (value: string) => setDoctors_name(value);
  
    const handlePatientSelect = (value: string) => selectedPatient_name(value);

    const handleDoctorId = (value: string) => setDoctorId(value);
    const handlePatientId = (value: string) => setPatientId(value);
    const handleConsultancyRate = (value: string) => setConsultancyRate(value);

    //display selected doctor id and patient id in console
    useEffect(() => {
      console.log("Doctor ID: ", doctor_id);
      console.log("Patient ID: ", patient_id);
      console.log("Consultancy Rate: ", consultancy_rate);
        console.log("Doctor Name: ", doctors_name);
        console.log("Patient Name: ", patient_name);
    }, [doctor_id, patient_id, consultancy_rate, patient_name, doctors_name]);
  
    return (
      <div className="flex items-center justify-center w-full  py-4">
        {/* dropdown menu to display all patients  */}
        <div className="grid items-center mr-5">
        <DropdownMenu>
          <DropdownMenuTrigger className="col-span-1 h-8 border border-gray-300 rounded-md bg-white px-2 text-left">
            {/* if doctor name is not selected, Display Select Doctor, if selected, display doctor's name */}
            <Label>{doctors_name || "Select Doctor"}</Label>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Doctor</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => handleDoctorSelect("Select")}>Select</DropdownMenuItem>
            {doctors.map((doctor) => (
              <DropdownMenuItem key={doctor.doctor_id} onSelect={() => {handleDoctorId(doctor.doctor_id); handleDoctorSelect(`Dr. ${doctor.first_name} ${doctor.last_name}`); handleConsultancyRate(doctor.consultancy_rate)}}>
                Dr. {doctor.first_name} {doctor.last_name} - Rs. {doctor.consultancy_rate}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
            <p> &larr; Assign to  &#8594;</p>

        {/* dropdown menu to display all doctors */}
        <div className="grid items-center ml-5">
        <DropdownMenu>
          <DropdownMenuTrigger className="col-span-1 h-8 border border-gray-300 rounded-md bg-white px-2 text-left">
            {/* if patient name is not selected, Display Select Patient, if selected, display patient's name */}
            <Label>{patient_name || "Select Patient"}</Label>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Patient</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => handlePatientSelect("Select")}>Select</DropdownMenuItem>
            {patients.map((patient) => (
                <DropdownMenuItem key={patient.patient_id} onSelect={() => {handlePatientId(patient.patient_id); handlePatientSelect(patient.full_name)} }>
                {patient.full_name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
            </div>
      </div>
    );
  };
  
  export default Assignments;
  