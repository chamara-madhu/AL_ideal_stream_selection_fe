import { useState } from "react";
import { VENUE_TYPES_OPTIONS } from "../../../constants/base";
import FormInput from "../fields/FormInput";
import TypeOrSelect from "../fields/TypeOrSelect";
import Button from "../buttons/Button";
import axios from "axios";

const initialState = {
  name: "",
  venueType: "",
  nameErr: "",
  venueTypeErr: "",
};

const CreateGigModal = ({ isOpen, onClose, title, setGigs }) => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
      [name + "Err"]: "",
    }));
  };

  const isValid = () => {
    let nameErr = "";
    let venueTypeErr = "";

    if (!form.name) {
      nameErr = "Name is required.";
    }

    if (!form.venueType) {
      venueTypeErr = "Venue type is required.";
    }

    if (nameErr || venueTypeErr) {
      setForm((prev) => ({
        ...prev,
        nameErr: nameErr,
        venueTypeErr: venueTypeErr,
      }));

      return false;
    }

    return true;
  };

  const handleCreateGig = () => {
    if (!isValid()) return;
    setIsLoading(true);

    axios
      .post(`http://localhost:3000/api/gigs`, {
        name: form.name,
        venueType: form.venueType.value,
      })
      .then((res) => {
        setIsLoading(false);
        onClose();
        setGigs((prev) => ([
          ...prev,
          res.data,
        ]))
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const handleReset = () => {
    setForm(initialState);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000003d]">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 hover:cursor-pointer"
        >
          ✕
        </button>

        {/* Title */}
        {title && (
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        )}

        {/* Modal content */}
        <div>
          <form className="flex w-full flex-col gap-6">
            <FormInput
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              isRequired
              placeholder="E.g. John Pub"
              error={form.nameErr}
            />
            <TypeOrSelect
              label="Venue Type"
              name="venueType"
              onChange={handleChange}
              value={form.venueType}
              options={VENUE_TYPES_OPTIONS}
              placeholder="Eg. Pub"
              error={form.venueTypeErr}
              isClearable
              showRequiredLabel
            />

            <div className="flex gap-2">
              <Button
                label={"Submit"}
                isLoading={isLoading}
                handleBtn={handleCreateGig}
              />
              <Button label="Reset" color="secondary" handleBtn={handleReset} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGigModal;
