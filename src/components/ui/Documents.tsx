import React from "react";
import { Footnote, Tailwind } from "@fileforge/react-print";

const Documents = ({ doctor_name, patient_name, equipment_details, medical_details, consultancy_rate, equipment_total, medical_total, hospital_fee, total }: { doctor_name: string, patient_name: string, equipment_details: any[], medical_details: any[], consultancy_rate: number, equipment_total: number, medical_total: number, hospital_fee: number, total: number }) => {
  return (
    <>
      <Tailwind>
        <main className="text-gray-700 p-8">
          <h1 className="text-4xl font-bold text-gray-800">Hospital Invoice</h1>
          <img
            className="w-1/5 rounded-xl my-8 h-auto mx-auto"
            src="fileforge_cover.png"
            alt="React for documents"
          />

          <section className="my-4">
            <h2 className="text-2xl font-semibold">Invoice</h2>
            <div className="mt-2">
              <p><strong>Doctor:</strong> {doctor_name}</p>
              <p><strong>Patient:</strong> {patient_name}</p>
            </div>
          </section>

          <section className="my-4">
            <h3 className="text-xl font-semibold">Equipment Details</h3>
            <table className="w-full text-left mt-2">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 pr-5">Item</th>
                  <th className="pb-2 pr-5">Quantity</th>
                  <th className="pb-2 pr-5">Unit Price</th>
                  <th className="pb-2 pr-5">Total</th>
                </tr>
              </thead>
              <tbody>
                {equipment_details.map((detail, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-1 pl-11">{detail.item}</td>
                    <td className="py-1 pl-11">{detail.quantity}</td>
                    <td className="py-1 pl-11">Rs. {detail.unitPrice}</td>
                    <td className="py-1 pl-11">Rs. {detail.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="my-4">
            <h3 className="text-xl font-semibold">Medicines Details</h3>
            <table className="w-full text-left mt-2">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 pr-5">Item</th>
                  <th className="pb-2 pr-5">Quantity</th>
                  <th className="pb-2 pr-5">Unit Price</th>
                  <th className="pb-2 pr-5">Total</th>
                </tr>
              </thead>
              <tbody>
                {medical_details.map((detail, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-1 pl-11">{detail.item}</td>
                    <td className="py-1 pl-11">{detail.quantity}</td>
                    <td className="py-1 pl-11">Rs. {detail.unitPrice}</td>
                    <td className="py-1 pl-11">Rs. {detail.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="my-4">
            <h3 className="text-xl font-semibold">Summary</h3>
            
            <div className="flex justify-between mt-2">
              <p>Consultancy Rate:</p>
              <p>Rs. {consultancy_rate}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>Hospital Fee:</p>
              <p>Rs. {hospital_fee}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>Equipment Total:</p>
              <p>Rs. {equipment_total}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>Medical Total:</p>
              <p>Rs. {medical_total}</p>
            </div>
            <div className="flex justify-between mt-2 font-bold border-t pt-2">
              <p>Total Amount:</p>
              <p>Rs. {total}</p>
            </div>
          </section>
        </main>
      </Tailwind>
    </>
  );
};

export default Documents;
