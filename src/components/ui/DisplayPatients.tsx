import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'sonner';
import Modal from "src/components/ui/Modal";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "src/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination";

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

const DisplayPatients: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const itemsPerPage = 3;

    useEffect(() => {
        fetchPatients(currentPage);
    }, [currentPage]);

    const fetchPatients = async (page: number) => {
        try {
            const response = await axios.get(`http://localhost:8080/patients/all`, {
                params: {
                    page,
                    limit: itemsPerPage
                }
            });
            setPatients(response.data.patients);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch patients');
        }
    };
    const getPatient = async (id: string) => {
        console.log(id);
        try {
            const response = await axios.get(`http://localhost:8080/patients/get-patient/${id}`);
            const email = response.data.rows1[0].email;
            const selectedPatient = { ...response.data.rows[0], email };
            setSelectedPatient(selectedPatient);
            console.log(selectedPatient);
            setOpen(true);
        } catch (error) {
            console.error(error);
            toast.error('Failed to get patient details');
        }
    };

    const deletePatient = async (id: string) => {
        try {
            const response = await axios.delete(`http://localhost:8080/patients/delete/${id}`);
            console.log(response.data);
            toast.success('Delete Successful');
            fetchPatients(currentPage); // Refresh the current page after deletion
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
            <div className="flex flex-col items-center justify-center p-5">
                <Table className="min-w-full bg-white border-collapse">
                    <TableCaption>A list of patients in the hospital.</TableCaption>
                    <TableHeader >
                        <TableRow>
                            <TableHead className="border px-4 py-2 font-bold">Serial No.</TableHead>
                            <TableHead className="border px-4 py-2 font-bold">Patient Name</TableHead>
                            <TableHead className="border px-4 py-2 font-bold">Gender</TableHead>
                            <TableHead className="border px-4 py-2 font-bold">Phone Number</TableHead>
                            <TableHead className="border px-4 py-2 font-bold">Date</TableHead>
                            <TableHead className="border px-4 py-2 font-bold">Time</TableHead>
                            <TableHead className="border px-4 py-2 font-bold">User Status</TableHead>
                            <TableHead className="border px-4 py-2 font-bold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patients.map((patient, index) => (
                            <TableRow key={patient.id}>
                                <TableCell className="border px-4 py-2">{String((currentPage - 1) * itemsPerPage + index + 1).padStart(6, '0')}</TableCell>
                                <TableCell className="border px-4 py-2">{patient.full_name}</TableCell>
                                <TableCell className="border px-4 py-2">{patient.gender}</TableCell>
                                <TableCell className="border px-4 py-2">{patient.mobile_no}</TableCell>
                                <TableCell className="border px-4 py-2">{formatDate(patient.joining_date)}</TableCell>
                                <TableCell className="border px-4 py-2">{new Date(patient.joining_date).toLocaleTimeString()}</TableCell>
                                <TableCell className="border px-4 py-2 text-green-500">Active</TableCell>
                                <TableCell className="border px-4 py-2 flex justify-between items-center">
                                    <button
                                        onClick={() => getPatient(patient.user_id)}
                                        className="bg-white text-[#005D90] hover:bg-[#005D90] hover:text-white border border-[#005D90] font-bold py-2 px-4 rounded"
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={() => deletePatient(patient.user_id)}
                                        className="bg-white text-red-500 hover:bg-red-500 hover:text-white border border-red-500 font-bold py-2 px-4 rounded"
                                    >
                                        Delete
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination className="mt-4">
                    <PaginationContent>
                        {currentPage > 1 && (
                            <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
                        )}
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    isActive={currentPage === index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {currentPage < totalPages && (
                            <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
                        )}
                    </PaginationContent>
                </Pagination>
            </div>

            {selectedPatient && (
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
                                src={selectedPatient.image_url}
                                alt={`${selectedPatient.full_name}`}
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    borderRadius: "5px",
                                    marginRight: "20px",
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
                                    {selectedPatient.full_name}
                                </h1>
                                <p>
                                    <i className="fa fa-phone" aria-hidden="true"></i> {selectedPatient.mobile_no}
                                </p>
                                <p>
                                    <i className="fa fa-envelope" aria-hidden="true"></i> {selectedPatient.email}
                                </p>
                                <p>
                                    <i className="fa fa-map-marker" aria-hidden="true"></i> {selectedPatient.city}, {selectedPatient.country}
                                </p>
                                <p>
                                    <i className="fa fa-star" aria-hidden="true"></i> 2 reviews <span style={{ color: "#ffc107" }}>★ 4.5</span>
                                </p>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                width: "100%",
                                marginTop: "20px",
                                borderTop: "1px solid #ccc",
                                paddingTop: "20px",
                            }}
                        >
                            <div style={{ flex: 1, minWidth: "200px", marginBottom: "10px" }}>
                                <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Basic Info</h2>
                                <p>Department: {selectedPatient.department}</p>
                                <p>Patient ID: {selectedPatient.patient_id}</p>
                                <p>Joining Date: {selectedPatient.joining_date}</p>
                            </div>
                            <div style={{ flex: 1, minWidth: "200px", marginBottom: "10px" }}>
                                <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Personal Info</h2>
                                <p>Gender: {selectedPatient.gender}</p>
                                <p>Birthday: {selectedPatient.date_of_birth}</p>
                                <p>Age: {calculateAge(selectedPatient.date_of_birth)}</p>
                            </div>
                            <div style={{ flex: 1, minWidth: "200px", marginBottom: "10px" }}>
                                <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Medical Info</h2>
                                <p>Patient has a heart condition</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default DisplayPatients;
