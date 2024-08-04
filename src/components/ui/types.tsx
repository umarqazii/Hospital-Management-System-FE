// types.ts
export interface EquipmentDetails {
    item: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }
  
  export interface MedicineDetails {
    item: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }
  
  export interface InvoiceData {
    doctor_name: any;
    patient_name: any;
    equipment_total: number;
    equipment_details: EquipmentDetails[];
    medicine_total: number;
    medicine_details: MedicineDetails[];
    consultancy_rate: number;
    hospital_fee: number;
    total_amount: number;
  }
  