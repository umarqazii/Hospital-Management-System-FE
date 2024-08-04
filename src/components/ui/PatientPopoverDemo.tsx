import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu"

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
    // Add other fields as necessary
  }

export function PatientPopoverDemo() {
  const [full_name, setFull_name] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [mobile_no, setMobile_no] = useState("");
  const [gender, setGender] = useState("");
  const [date_of_birth, setDateOfBirth] = React.useState<Date>();
  const [joining_date, setJoiningDate] = React.useState<Date>();
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [image_url, setImageURL] = useState<string | null>();
  const [file, setFile] = useState<File | null>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const handleGenderSelect = (value: string) => {
    setGender(value);
  };

  const handleCitySelect = (value: string) => setCity(value);
  const handleCountrySelect = (value: string) => setCountry(value);

  const upload = () => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      axios
        .post("http://localhost:8080/upload/image", formData)
        .then((res) => {
          console.log(res);
          toast.success('Upload Successful')
          const filename = res.data.filename;
          setImageURL(`http://localhost:8080/uploads/images/${filename}`);
          console.log(image_url);
        })
        .catch((err) => {
          console.error(err);
          toast.error('Upload Failed')
        });
    }
  };

//get all the doctors

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


  //send Doctor's data to the backend
  const addPatient = () => {
    const data = {
        full_name: full_name,
        username: username,
        email: email,
        pass: pass,
        mobile_no: mobile_no,
        gender: gender,
        date_of_birth: date_of_birth ? format(date_of_birth, "yyyy-MM-dd") : null,
        joining_date: joining_date ? format(joining_date, "yyyy-MM-dd") : null,
        department: department,
        city: city,
        country: country,
        image_url: image_url,

    //   firstName: firstName,
    //   lastName: lastName,
    //   gender: gender,
    //   bloodGroup: bloodGroup,
    //   dateOfBirth: dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : null,
    //   startDate: startdate ? format(startdate, "yyyy-MM-dd") : null,
    //   department: department,
    //   experience: experience,
    //   pictureurl: pictureurl,
    };
    axios
      .post("http://localhost:8080/patients/add", data)
      .then((res) => {
        console.log(res);
        toast.success('Patient Added Successfully')
        //reload the page
        //window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        toast.error('Patient Addition Failed');
      });
  }



  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="mt-1">Add Patient</Button>
      </PopoverTrigger>
      <PopoverContent className="w-max">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add Patient</h4>
            <p className="text-sm text-muted-foreground">
              Enter Patient's Information
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={full_name}
                onChange={(e) => setFull_name(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="lastname">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-2 h-8"
                type="email"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={pass}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-2 h-8"
                type="password"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="mobile_no">Mobile No</Label>
              <Input
                id="mobile_no"
                value={mobile_no}
                onChange={(e) => setMobile_no(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
             {/* City Selection */}
      <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="city">City</Label>
        <DropdownMenu>
          <DropdownMenuTrigger className="col-span-1 h-8 border border-gray-300 rounded-md bg-white px-2 text-left">
            {city}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select City</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => handleCitySelect("Select")}>Select</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleCitySelect("Islamabad")}>Islamabad</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleCitySelect("Rawalpindi")}>Rawalpindi</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleCitySelect("Lahore")}>Lahore</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleCitySelect("Karachi")}>Karachi</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleCitySelect("Peshawar")}>Peshawar</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleCitySelect("Quetta")}>Quetta</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleCitySelect("Multan")}>Multan</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleCitySelect("Faisalabad")}>Faisalabad</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Country Selection */}
      <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="country">Country</Label>
        <DropdownMenu>
          <DropdownMenuTrigger className="col-span-1 h-8 border border-gray-300 rounded-md bg-white px-2 text-left">
            {country}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Country</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => handleCountrySelect("Select")}>Select</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleCountrySelect("Pakistan")}>Pakistan</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      
                      <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="gender">Gender</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="col-span-1 h-8 border border-gray-300 rounded-md bg-white px-2 text-left">
                    {gender}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Select Gender</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => handleGenderSelect("Select")}>Select</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleGenderSelect("M")}>M</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleGenderSelect("F")}>F</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleGenderSelect("Neither")}>Neither</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="dob">Date of Birth</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date_of_birth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date_of_birth ? (
                      format(date_of_birth, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date_of_birth}
                    onSelect={setDateOfBirth}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="startdate">Joining Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !joining_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {joining_date ? (
                      format(joining_date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={joining_date}
                    onSelect={setJoiningDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="Department">Department</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="col-span-1 h-8 border border-gray-300 rounded-md bg-white px-2 text-left">
                    {department}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Select Department</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setDepartment("Select")}>Select</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDepartment("Cardiology")}>Cardiology</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDepartment("Dermatology")}>Dermatology</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDepartment("Endocrinology")}>Endocrinology</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDepartment("Gastroenterology")}>Gastroenterology</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDepartment("Hematology")}>Hematology</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDepartment("Infectious Disease")}>Infectious Disease</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDepartment("Nephrology")}>Nephrology</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDepartment("Neurology")}>Neurology</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDepartment("Oncology")}>Oncology</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDepartment("Pediatrics")}>Pediatrics</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDepartment("Pulmonology")}>Pulmonology</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDepartment("Rheumatology")}>Rheumatology</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDepartment("Urology")}>Urology</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-4">
          <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
          <Button className="mt-1" onClick={upload}>
            Upload Picture
          </Button>
          <Button className="mt-1" onClick={addPatient}>Add Patient</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
