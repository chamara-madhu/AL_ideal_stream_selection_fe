import { useEffect, useState } from "react";
import { VENUE_TYPES_OPTIONS } from "../../../constants/base";
import TypeOrSelect from "../fields/TypeOrSelect";
import Button from "../buttons/Button";
import axios from "axios";

const initialState = {
  gig: "",
  gigErr: "",
};

const AddSongsToGigModal = ({ isOpen, onClose, title, selectedSongs }) => {
  const [form, setForm] = useState(initialState);
  const [gigs, setGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/gigs")
      .then((res) => {
        setGigs(res.data.map((el) => {
          return {
            label: el.name,
            value: el._id
          }
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
      [name + "Err"]: "",
    }));
  };

  const isValid = () => {
    let gigErr = "";

    if (!form.gig) {
      gigErr = "Gig is required.";
    }

    if (gigErr ) {
      setForm((prev) => ({
        ...prev,
        gigErr: gigErr,
      }));

      return false;
    }

    return true;
  };

  const handleAddSongsToGig = () => {
    if (!isValid()) return;
    setIsLoading(true);

    axios
      .put(`http://localhost:3000/api/gigs/${form.gig._id}/add-songs`, {
        songsIDs: selectedSongs,
      })
      .then((res) => {
        setIsLoading(false);
        onClose();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const handleReset = () => {
    setForm(initialState);
  };

  if (!isOpen) return null;

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
        <p className="mb-5 text-gray-500">{selectedSongs.length} songs have been selected.</p>


        {/* Modal content */}
        <div>
          <form className="flex w-full flex-col gap-6">
            <TypeOrSelect
              label="Gig"
              name="gig"
              onChange={handleChange}
              value={form.gig}
              options={gigs}
              error={form.gigErr}
              isClearable
              showRequiredLabel
            />

            <div className="flex gap-2">
              <Button
                label={"Save"}
                isLoading={isLoading}
                handleBtn={handleAddSongsToGig}
              />
              <Button label="Reset" color="secondary" handleBtn={handleReset} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSongsToGigModal;
