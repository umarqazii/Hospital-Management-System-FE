import React, { useState } from "react";
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";


export function PopoverDemo() {
  //const { toast } = useToast();
  const [dateOfBirth, setDateOfBirth] = React.useState<Date>();
  const [startdate, setStartDate] = React.useState<Date>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [experience, setExperience] = useState("");
  const [consultancy_rate, setConsultancy_rate] = useState("");
  const [pictureurl, setPictureURL] = useState<string | null>();
  const [file, setFile] = useState<File | null>();

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
          setPictureURL(`http://localhost:8080/uploads/images/${filename}`);
          console.log(pictureurl);
        })
        .catch((err) => {
          console.error(err);
          toast.error('Upload Failed')
        });
    }
  };


  //send Doctor's data to the backend
  const addDoctor = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      bloodGroup: bloodGroup,
      dateOfBirth: dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : null,
      startDate: startdate ? format(startdate, "yyyy-MM-dd") : null,
      department: department,
      experience: experience,
      consultancy_rate: consultancy_rate,
      pictureurl: pictureurl,
    };
    axios
      .post("http://localhost:8080/doctors/add", data)
      .then((res) => {
        console.log(res);
        toast.success('Doctor Added Successfully')
        //reload the page
        //window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        toast.error('Doctor Addition Failed');
      });
  }



  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="mt-1">Add Doctor</Button>
      </PopoverTrigger>
      <PopoverContent className="w-max">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add Doctor</h4>
            <p className="text-sm text-muted-foreground">
              Enter Doctor's Information
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="bloodgrp">Blood Group</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="col-span-1 h-8 w-full border border-gray-300 rounded-md bg-white px-2 text-left">
                      {bloodGroup}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuLabel>Select Blood Group</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => setBloodGroup("Select")}>Select</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setBloodGroup("A+")}>A+</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setBloodGroup("A-")}>A-</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setBloodGroup("B+")}>B+</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setBloodGroup("B-")}>B-</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setBloodGroup("O+")}>O+</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setBloodGroup("O-")}>O-</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setBloodGroup("AB+")}>AB+</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setBloodGroup("AB-")}>AB-</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="gender">Gender</Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="col-span-1 h-8 w-full border border-gray-300 rounded-md bg-white px-2 text-left">
                          {gender}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                          <DropdownMenuLabel>Select Gender</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onSelect={() => setGender("Select")}>Select</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => setGender("M")}>M</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => setGender("F")}>F</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => setGender("Neither")}>Neither</DropdownMenuItem>
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
                      !dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfBirth ? (
                      format(dateOfBirth, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={setDateOfBirth}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="startdate">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !startdate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startdate ? (
                      format(startdate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startdate}
                    onSelect={setStartDate}
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
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="consultancy_rate">Consultancy Rate</Label>
              <Input
                id="consultancy_rate"
                value={consultancy_rate}
                onChange={(e) => setConsultancy_rate(e.target.value)}
                className="col-span-2 h-8"
              />
              </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-4">
          <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
          <Button className="mt-1" onClick={upload}>
            Upload Picture
          </Button>
          <Button className="mt-1" onClick={addDoctor}>Add Doctor</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
