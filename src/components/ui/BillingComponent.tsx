import React, { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import { toast } from "sonner";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { Label } from "./label";

import jsPDF from "jspdf";

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

type OptionType = {
  value: string;
  label: string;
  price: number;
};

const options: OptionType[] = [
  { value: "Ambulance", label: "Ambulance", price: 5000 },
  { value: "Bandage", label: "Bandage", price: 100 },
  {
    value: "Blood Pressure Monitor",
    label: "Blood Pressure Monitor",
    price: 500,
  },
  { value: "Cap", label: "Cap", price: 50 },
  { value: "Catheter", label: "Catheter", price: 200 },
  { value: "Cotton", label: "Cotton", price: 50 },
  { value: "Defibrillator", label: "Defibrillator", price: 1000 },
  { value: "ECG Machine", label: "ECG Machine", price: 2000 },
  { value: "Face Shield", label: "Face Shield", price: 100 },
  { value: "Gloves", label: "Gloves", price: 100 },
  { value: "Gown", label: "Gown", price: 200 },
  { value: "IV Stand", label: "IV Stand", price: 200 },
  { value: "Mask", label: "Mask", price: 50 },
  { value: "Needle", label: "Needle", price: 20 },
  { value: "Nebulizer", label: "Nebulizer", price: 500 },
  { value: "Oxygen Cylinder", label: "Oxygen Cylinder", price: 2000 },
  { value: "Oxygen Mask", label: "Oxygen Mask", price: 300 },
  { value: "PPE Kit", label: "PPE Kit", price: 500 },
  { value: "Plaster", label: "Plaster", price: 200 },
  { value: "Pulse Oximeter", label: "Pulse Oximeter", price: 500 },
  { value: "Sanitizer", label: "Sanitizer", price: 100 },
  { value: "Scalpel", label: "Scalpel", price: 150 },
  { value: "Shoes Cover", label: "Shoes Cover", price: 50 },
  { value: "Stethoscope", label: "Stethoscope", price: 200 },
  { value: "Suction Machine", label: "Suction Machine", price: 1000 },
  { value: "Syringe", label: "Syringe", price: 50 },
  { value: "Thermometer", label: "Thermometer", price: 100 },
  { value: "Ventilator", label: "Ventilator", price: 5000 },
  { value: "Wheelchair", label: "Wheelchair", price: 1000 },
];

const Medicines: OptionType[] = [
  { value: "Aspirin", label: "Aspirin", price: 50 },
  { value: "Amoxicillin", label: "Amoxicillin", price: 200 },
  { value: "Ibuprofen", label: "Ibuprofen", price: 150 },
  { value: "Omeprazole", label: "Omeprazole", price: 300 },
  { value: "Paracetamol", label: "Paracetamol", price: 100 },
  { value: "Simvastatin", label: "Simvastatin", price: 250 },
];

const BillingComponent: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<OptionType[]>(
    []
  );
  const [selectedMedicines, setSelectedMedicines] = React.useState<
    OptionType[]
  >([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors_name, setDoctors_name] = useState<any>("");
  const [patient_name, selectedPatient_name] = useState<any>("");
  const [doctor_id, setDoctorId] = useState<any>("");
  const [patient_id, setPatientId] = useState<any>("");
  const [consultancy_rate, setConsultancyRate] = useState<any>("0");
  const [equipment_total, setEquipmentTotal] = useState<any>("0");
  const [medicine_total, setMedicineTotal] = useState<any>("0");
  const [hospital_fee, setHospitalFee] = useState<any>(1000);
  const hopitalImg = require("./hospital.png");
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toLocaleDateString()
  );
  var [EquipmentDetails, setEquipmentDetails] = useState<
    { item: string; quantity: number; unitPrice: number; total: number }[]
  >([]);
  var [MedicineDetails, setMedicineDetails] = useState<
    { item: string; quantity: number; unitPrice: number; total: number }[]
  >([]);

  interface InvoiceDetails {
    invoice_id: string;
    date: string;
    doctor_name: string;
    patient_name: string;
    equipment_details: {
      item: string;
      quantity: number;
      unitPrice: number;
      total: number;
    }[];
    medical_details: {
      item: string;
      quantity: number;
      unitPrice: number;
      total: number;
    }[];
    consultancy_rate: number;
    hospital_fee: number;
    equipment_total: number;
    medical_total: number;
    total: number;
  }

  function invoiceGenerate({
    invoice_id = "1bf5Df",
    date = new Date().toLocaleDateString(),
    doctor_name = "",
    patient_name = "",
    //initializing the arrays
    equipment_details = [
      { item: "Ambulance", quantity: 1, unitPrice: 5000, total: 5000 },
    ],
    medical_details = [],
    consultancy_rate = 0,
    hospital_fee = 0,
    equipment_total = 0,
    medical_total = 0,
    total = 0,
  }: Partial<InvoiceDetails>) {
    const doc = new jsPDF("portrait", "px", "a4", false);
    const margin = 20;
    let y = margin;

    // Title
    y += 20;
    doc.setFontSize(24);
    doc.text("Hospital Invoice", margin + 150, y);
    y += 30;

    // Image
    const img = new Image();
    img.src = hopitalImg;
    doc.addImage(img, "PNG", margin + 150, y, 100, 100);
    y += 120;

    // Doctor and Patient Details
    // doc.setFontSize(18);
    // doc.text('Invoice', margin, y);
    // y += 20;
    doc.setFontSize(12);
    doc.text(`Doctor: ${doctor_name}`, margin + 30, y);
    doc.text(`Date: ${date}`, margin + 300, y);
    y += 20;
    doc.text(`Patient: ${patient_name}`, margin + 30, y);
    doc.text(`Invoice ID: ${invoice_id}`, margin + 300, y);
    y += 40;

    // Equipment Details
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Equipment Details", margin + 30, y);
    y += 20;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Item", margin + 30, y);
    doc.text("Quantity", margin + 130, y);
    doc.text("Unit Price", margin + 230, y);
    doc.text("Total", margin + 330, y);
    y += 3;
    doc.text(
      "______________________________________________________________________",
      margin + 25,
      y
    );
    y += 15;
    equipment_details.forEach((detail) => {
      doc.text(detail.item, margin + 30, y);
      doc.text(detail.quantity.toString(), margin + 145, y);
      doc.text(`Rs. ${detail.unitPrice}`, margin + 230, y);
      doc.text(`Rs. ${detail.total}`, margin + 330, y);
      y += 15;
    });
    y += 20;

    // Medicines Details
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Medicine Details", margin + 30, y);
    y += 20;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Item", margin + 30, y);
    doc.text("Quantity", margin + 130, y);
    doc.text("Unit Price", margin + 230, y);
    doc.text("Total", margin + 330, y);
    y += 3;
    doc.text(
      "______________________________________________________________________",
      margin + 25,
      y
    );
    y += 15;
    medical_details.forEach((detail) => {
      doc.text(detail.item, margin + 30, y);
      doc.text(detail.quantity.toString(), margin + 145, y);
      doc.text(`Rs. ${detail.unitPrice}`, margin + 230, y);
      doc.text(`Rs. ${detail.total}`, margin + 330, y);
      y += 15;
    });
    y += 25;

    // Summary
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Summary", margin + 30, y);
    doc.setFont("helvetica", "normal");
    y += 3;
    doc.setFontSize(12);
    doc.text(
      "_____________________________________________________",
      margin + 25,
      y
    );
    y += 20;

    doc.text("Consultancy Rate:", margin + 30, y);
    doc.text(`Rs. ${consultancy_rate}`, margin + 230, y);
    y += 15;
    doc.text("Hospital Fee:", margin + 30, y);
    doc.text(`Rs. ${hospital_fee}`, margin + 230, y);
    y += 15;
    doc.text("Equipment Total:", margin + 30, y);
    doc.text(`Rs. ${equipment_total}`, margin + 230, y);
    y += 15;
    doc.text("Medicine Total:", margin + 30, y);
    doc.text(`Rs. ${medical_total}`, margin + 230, y);
    y += 15;
    doc.text(
      "----------------------------------------------------------------------------------------",
      margin + 25,
      y
    );
    y += 15;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Total Amount:", margin + 30, y);
    doc.text(`Rs. ${total}`, margin + 230, y);

    doc.save("hospital_invoice.pdf");
  }

  //function to populate the array with key value pairs, option, unit price, quantity using the selected options
  // returns the array in the format [{item: string, quantity: number, unitPrice: number, total: number}]
  const calculateItemDetails = (selectedOptions: any[]) => {
    const itemDetails: { [key: string]: any } = {};

    selectedOptions.forEach((option) => {
      if (itemDetails[option.value]) {
        itemDetails[option.value].quantity += 1;
        itemDetails[option.value].total += option.price;
      } else {
        itemDetails[option.value] = {
          item: option.label,
          quantity: 1,
          unitPrice: option.price,
          total: option.price,
        };
      }
    });

    // Convert the mapping object into an array
    return Object.values(itemDetails);
  };

  //fetching data of all doctors from backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/doctors/all")
      .then((response) => {
        setDoctors(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //fetching data of all patients from backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/patients/all-patients-without-pagination")
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

  // when doctor is selected from dropdown, set the doctor's name
  const handleDoctorSelect = (value: string) => setDoctors_name(value);

  // when patient is selected from dropdown, set the patient's name
  const handlePatientSelect = (value: string) => selectedPatient_name(value);

  // when doctor is selected from dropdown, set the doctor's id
  const handleDoctorId = (value: string) => setDoctorId(value);

  // when patient is selected from dropdown, set the patient's id
  const handlePatientId = (value: string) => setPatientId(value);

  // when doctor is selected from dropdown, set the doctor's consultancy rate
  const handleConsultancyRate = (value: string) => setConsultancyRate(value);

  // stores the Equipments used by the patient
  const handleChange = (selectedOption: MultiValue<OptionType | null>) => {
    const validOptions = selectedOption.filter(
      (option): option is OptionType => option !== null
    );
    setSelectedOptions([...selectedOptions, ...validOptions]);
  };

  // stores the Medicines used by the patient
  const handleMedicineChange = (
    selectedOption: MultiValue<OptionType | null>
  ) => {
    const validOptions = selectedOption.filter(
      (option): option is OptionType => option !== null
    );
    setSelectedMedicines([...selectedMedicines, ...validOptions]);
  };

  // calculate the total cost of the equipments used by the patient
  // also stores the details of the equipments used by the patient
  const handleSubmit = () => {
    console.log(selectedOptions);
    setEquipmentTotal(
      selectedOptions.reduce((acc, option) => acc + option.price, 0)
    );
    console.log(selectedOptions);
    EquipmentDetails = calculateItemDetails(selectedOptions);
    setEquipmentDetails(EquipmentDetails);
    console.log(EquipmentDetails);
  };

  // calculate the total cost of the medicines used by the patient
  // also stores the details of the medicines used by the patient
  const handleMedicineSubmit = () => {
    console.log(selectedMedicines);

    setMedicineTotal(
      selectedMedicines.reduce((acc, option) => acc + option.price, 0)
    );

    MedicineDetails = calculateItemDetails(selectedMedicines);
    setMedicineDetails(MedicineDetails);
    console.log(MedicineDetails);
  };

  const CalculateGrandTotal = () => {
    const total =
    parseInt(equipment_total) +
      parseInt(medicine_total) +
      parseInt(hospital_fee) +
      parseInt(consultancy_rate);
    //alert("Total Amount: " + (equipment_total + medicine_total + hospital_fee + parseInt(consultancy_rate)));
    alert(
      "Consultancy Charges " +
        consultancy_rate +
        "\n" +
        "Hospital Charges " +
        hospital_fee +
        "\n" +
        "Equipment Charges " +
        equipment_total +
        "\n" +
        "Medicine Charges " +
        medicine_total +
        "\n-------------------------------\n" +
        "Total Amount: " +
        total
    );
  };

  //send data to backend to store the invoice details
  const handleInvoiceSubmit = () => {
    axios
      .post("http://localhost:8080/billing/add", {
        doctor_id: doctor_id,
        patient_id: patient_id,
        consultation_fee: consultancy_rate,
        hospital_charges: hospital_fee,
        equipment_charges: equipment_total,
        medicine_charges: medicine_total,
        total_amount:
          equipment_total +
          medicine_total +
          hospital_fee +
          parseInt(consultancy_rate),
      })
      .then((response) => {
        console.log(response);
        toast.success("Invoice Submitted Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error submitting Invoice");
      });
  };

  //sort selectedOptions (Medical Equipments) alphabetically every second
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedOptions(
        [...selectedOptions].sort((a, b) => a.label.localeCompare(b.label))
      );
    }, 100);
    return () => clearInterval(interval);
  }, [selectedOptions]);

  //sort selectedMedicines alphabetically every second
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedMedicines(
        [...selectedMedicines].sort((a, b) => a.label.localeCompare(b.label))
      );
    }, 100);
    return () => clearInterval(interval);
  }, [selectedMedicines]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className=" w-full flex flex-col items-center border border-gray-400 rounded-xl py-3 shadow-md bg-gray-100">
        <h5 className="text-lg font-semibold mb-4">
          Assign Doctor to a Patient
        </h5>
        <div className="flex items-center justify-center w-full  py-4 ">
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
                <DropdownMenuItem onSelect={() => handleDoctorSelect("Select")}>
                  Select
                </DropdownMenuItem>
                {doctors.map((doctor) => (
                  <DropdownMenuItem
                    key={doctor.doctor_id}
                    onSelect={() => {
                      handleDoctorId(doctor.doctor_id);
                      handleDoctorSelect(
                        `Dr. ${doctor.first_name} ${doctor.last_name}`
                      );
                      handleConsultancyRate(doctor.consultancy_rate);
                    }}
                  >
                    Dr. {doctor.first_name} {doctor.last_name} - Rs.{" "}
                    {doctor.consultancy_rate}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p> &#8614; is Assigned to &#8614;</p>

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
                <DropdownMenuItem
                  onSelect={() => handlePatientSelect("Select")}
                >
                  Select
                </DropdownMenuItem>
                {patients.map((patient) => (
                  <DropdownMenuItem
                    key={patient.patient_id}
                    onSelect={() => {
                      handlePatientId(patient.patient_id);
                      handlePatientSelect(patient.full_name);
                    }}
                  >
                    {patient.full_name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {/* horizontal line */}
      {/* <hr className="w-4/5 border-t-2 border-gray-300 my-4" /> */}

      <div className="flex flex-col items-center  w-full border border-gray-400 rounded-xl py-3 mt-6 shadow-md bg-gray-100">
        <h5 className="text-lg font-semibold mb-4">Medical Equipment Used</h5>
        <Select
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          value={null}
          isMulti
          styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "0.375rem", // Tailwind's rounded-md
              padding: "0.5rem", // Tailwind's p-2
              width: "300px",
            }),
          }}
        />

        <div className="border border-gray-300 p-4 rounded-md flex flex-wrap mt-2 bg-white min-h-[100px] min-w-[70%] max-w-[70%] justify-center">
          {selectedOptions.map((option, index) => (
            <div
              key={index}
              className="bg-gray-100  rounded-sm p-2 m-1 flex items-center h-auto"
            >
              {option.label} - Rs.{option.price}
              <button
                className="bg-transparent text-red-500  ml-2 cursor-pointer hover:text-red-700 hover:bg-gray-300 rounded-sm h-6 w-6 flex items-center justify-center border border-red-200"
                onClick={() =>
                  setSelectedOptions(
                    selectedOptions.filter((_, i) => i !== index)
                  )
                }
              >
                X
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-white text-[#005D90] hover:bg-[#005D90] hover:text-white font-bold py-1 px-3 rounded border border-[#005D90] mt-2"
        >
          Check Equipment Total
        </button>
        <div>
          <p className="mt-4">Total Amount: Rs.{equipment_total}</p>
        </div>
      </div>

      {/* <hr className="w-4/5 border-t-2 border-gray-300 my-4" /> */}

      <div className="flex flex-col items-center  w-full border border-gray-400 rounded-xl py-3 mt-6 shadow-md bg-gray-100">
        <h5 className="text-lg font-semibold mb-4">Medicine Cost</h5>
        <Select
          options={Medicines}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleMedicineChange}
          value={null}
          isMulti
          styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "0.375rem", // Tailwind's rounded-md
              padding: "0.5rem", // Tailwind's p-2
              width: "300px",
            }),
          }}
        />

        <div className="border border-gray-300 p-4 rounded-md flex flex-wrap mt-2 bg-white min-h-[100px] min-w-[70%] max-w-[70%] justify-center">
          {selectedMedicines.map((medicine, index) => (
            <div
              key={index}
              className="bg-gray-100  rounded-sm p-2 m-1 flex items-center h-auto"
            >
              {medicine.label} - Rs.{medicine.price}
              <button
                className="bg-transparent text-red-500  ml-2 cursor-pointer hover:text-red-700 hover:bg-gray-300 rounded-sm h-6 w-6 flex items-center justify-center border border-red-200"
                onClick={() =>
                  setSelectedMedicines(
                    selectedMedicines.filter((_, i) => i !== index)
                  )
                }
              >
                X
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={handleMedicineSubmit}
          className="bg-white text-[#005D90] hover:bg-[#005D90] hover:text-white font-bold py-1 px-3 rounded border border-[#005D90] mt-2"
        >
          Check Medicine Total
        </button>
        <div>
          <p className="mt-4">Total Amount: Rs.{medicine_total}</p>
        </div>
      </div>
      <div className="flex flex-col items-center  w-full border border-gray-400 rounded-xl py-3 mt-6 shadow-md bg-gray-100">
        <h5 className="text-lg font-semibold mb-4">Hospital Fee</h5>
        <p className="text-lg">Rs. {hospital_fee}/-</p>
      </div>

      {/* button to check the individual totals of equipments and medicines */}
      <div className="flex">
        <button
          className="bg-white text-[#005D90] hover:bg-[#005D90] hover:text-white font-bold py-1 px-3 rounded border border-[#005D90] mt-2 mr-2"
          onClick={() => {
            handleSubmit();
            handleMedicineSubmit();
            CalculateGrandTotal();
          }}
        >
          Calculate Grand Total
        </button>

        <button
          className="bg-white text-[#005D90] hover:bg-[#005D90] hover:text-white font-bold py-1 px-3 rounded border border-[#005D90] mt-2 mr-2"
          onClick={handleInvoiceSubmit}
        >
          Submit
        </button>

        <button
          className="bg-white text-[#005D90] hover:bg-[#005D90] hover:text-white font-bold py-1 px-3 rounded border border-[#005D90] mt-2 mr-2"
          onClick={() => {
            invoiceGenerate({
              invoice_id: "1bf5Df",
              date: new Date().toLocaleDateString(),
              doctor_name: doctors_name,
              patient_name: patient_name,
              equipment_details: EquipmentDetails,
              medical_details: MedicineDetails,
              consultancy_rate: parseInt(consultancy_rate),
              hospital_fee: hospital_fee,
              equipment_total: equipment_total,
              medical_total: medicine_total,
              total:
                equipment_total +
                medicine_total +
                hospital_fee +
                parseInt(consultancy_rate),
            });
          }}
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default BillingComponent;
