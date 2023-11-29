import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { FaRegEdit } from "react-icons/fa";

const Groups = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedSubgroup, setSelectedSubgroup] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedAdditionalOption, setSelectedAdditionalOption] = useState("");
  const [customOptions, setCustomOptions] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [additionalOptionList, setAdditionalOptionList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState("");
  const [details, setDetails] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [groupList, setGroupList] = useState(["Asset", "Equity", "Expenditure", "Income", "Liability"])
  const [subgroupList, setSubgroupList] = useState(["Fixed Asset", "Current Asset"])

  const groups = ["Asset", "Equity", "Expenditure", "Income", "Liability"];

  const subgroups = {
    Asset: ["Fixed Asset", "Current Asset"],
    // Add subgroups for other groups as needed
  };



  useEffect(() => {
    // Load data from localStorage on component mount
    const storedGroupList = JSON.parse(localStorage.getItem('groupList')) || ['Asset', 'Equity', 'Expenditure', 'Income', 'Liability'];
    const storedSubgroupList = JSON.parse(localStorage.getItem('subgroupList')) || ['Fixed Asset', 'Current Asset', 'Intangible Asset'];
    const storedOptionList = JSON.parse(localStorage.getItem('optionList')) || [];
    const storedAdditionalOptionList = JSON.parse(localStorage.getItem('additionalOptionList')) || [];

    setGroupList(storedGroupList);
    setSubgroupList(storedSubgroupList);
    setOptionList(storedOptionList);
    setAdditionalOptionList(storedAdditionalOptionList);
  }, []);

//   useEffect(() => {
//     // Check if there is data in local storage
//     const storedFormData = localStorage.getItem('formData');

//     if (storedFormData) {
//       // Parse the stored JSON string to an object
//       const formData = JSON.parse(storedFormData);

//       // Set the form fields with the retrieved data
//       setSelectedGroup(formData.selectedGroup || '');
//       setSelectedSubgroup(formData.selectedSubgroup || '');
//       setSelectedOption(formData.selectedOption || '');
//       setSelectedAdditionalOption(formData.selectedAdditionalOption || '');
//       setCustomOptions(formData.customOptions || []);
//       setOptionList(formData.optionList || []);
//       setAdditionalOptionList(formData.additionalOptionList || []);
//     }
//   }, []); 
  const saveToLocalStorage = () => {
    // Save data to localStorage
    localStorage.setItem('groupList', JSON.stringify(groupList));
    localStorage.setItem('subgroupList', JSON.stringify(subgroupList));
    localStorage.setItem('optionList', JSON.stringify(optionList));
    localStorage.setItem('additionalOptionList', JSON.stringify(additionalOptionList));


    setSelectedGroup("");
    setSelectedSubgroup("");
    setSelectedOption("");
    setSelectedAdditionalOption("");
    setCustomOptions([]);
    setModalInput("");
    setDetails("");

    Swal.fire({
        title: 'Stored in Local Storage!',
        text: 'Form data has been added to local storage.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    //   handleClearForm();
  };

//   const handleAddToLocalStorage = () => {
//     const formData = {
//       selectedGroup,
//       selectedSubgroup,
//       selectedOption,
//       selectedAdditionalOption,
//       customOptions,
//       optionList,
//       additionalOptionList,
//     };

//     // Convert the form data to a JSON string and store it in local storage
//     localStorage.setItem('formData', JSON.stringify(formData));

//     // Show SweetAlert popup after storing in local storage
//     Swal.fire({
//       title: 'Stored in Local Storage!',
//       text: 'Form data has been added to local storage.',
//       icon: 'success',
//       confirmButtonText: 'OK',
//     });
//     handleClearForm();
//   };

  const handleGroupChange = (e) => {
    const selectedGroup = e.target.value;
    setSelectedGroup(selectedGroup);
    setSelectedSubgroup("");
    setSelectedOption("");
    setSelectedAdditionalOption("");
  };

  const handleSubgroupChange = (e) => {
    const selectedSubgroup = e.target.value;
    setSelectedSubgroup(selectedSubgroup);
    setSelectedOption("");
    setSelectedAdditionalOption("");
  };

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedOption(selectedOption);
    setSelectedAdditionalOption("");
  };

  const handleAdditionalOptionChange = (e) => {
    const selectedAdditionalOption = e.target.value;
    setSelectedAdditionalOption(selectedAdditionalOption);
  };

  const handleAddOption = (index) => {
    setIsModalOpen(true);
    setIsDeleting(false); // Set to false when adding an option
  };

  const handleDeleteOption = () => {
    if (
      selectedGroup ||
      selectedSubgroup ||
      selectedOption ||
      selectedAdditionalOption
    ) {
      // Check if any selection is made before proceeding with the deletion
      setIsModalOpen(true);
      setIsDeleting(true); // Set to true when deleting an option
      // Clear input values and details
      setModalInput("");
      setDetails("");
    } else {
      // Optionally, you can show a message or take other actions if nothing is selected
      console.log("No option selected for deletion");
    }
  };
 

  const handleModalSubmit = () => {
    if (!modalInput || (isDeleting && !details && details !== "")) {
      alert("Please fill in all required fields.");
      return;
    }
    if (isDeleting) {
      // Handle the deletion logic here (remove the selected option from the lists)
      const updatedCustomOptions = customOptions.filter(
        (option) => option !== modalInput
      );
      const updatedOptionList = optionList.filter(
        (option) => option !== modalInput
      );
      const updatedAdditionalOptionList = additionalOptionList.filter(
        (option) => option !== modalInput
      );

      setCustomOptions(updatedCustomOptions);
      setOptionList(updatedOptionList);
      setAdditionalOptionList(updatedAdditionalOptionList);

      // Show SweetAlert popup after deletion
      Swal.fire({
        title: "Deleted!",
        text: `Option ${modalInput} has been deleted.`,
        icon: "success",
        confirmButtonText: "OK",
      });

      console.log("Deleting option:", modalInput);
    } else {
        // Handle the addition logic here
        if (modalInput) {
          setCustomOptions([...customOptions, modalInput]);
    
          if (selectedSubgroup && selectedSubgroup !== "Custom") {
            if (!selectedOption) {
              setOptionList([...optionList, modalInput]);
            } else {
              setAdditionalOptionList([...additionalOptionList, modalInput]);
            }
          } else if (selectedOption) {
            setAdditionalOptionList([...additionalOptionList, modalInput]);
          } else {
            console.error(
              "Cannot add an option without selecting the previous option."
            );
          }
    
          // Show SweetAlert popup after addition
          Swal.fire({
            title: 'Added!',
            text: `Option ${modalInput} has been added.`,
            icon: 'success',
            confirmButtonText: 'OK',
          });
    
          console.log(`Details for ${modalInput}: ${details}`);
        }
      }

    setIsModalOpen(false);
    setModalInput("");
    setDetails(""); // Clear details after submitting
  };

  const handleClearForm = () => {
    setSelectedGroup("");
    setSelectedSubgroup("");
    setSelectedOption("");
    setSelectedAdditionalOption("");
    setCustomOptions([]);
    setOptionList([]);
    setAdditionalOptionList([]);

    // Show SweetAlert popup after clearing the form
    Swal.fire({
      title: 'Cleared!',
      text: 'The form has been cleared.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };



  return (
    <div className="m-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Group:
        </label>
        <select
          className="mt-1 p-2 border rounded-md w-full"
          value={selectedGroup}
          onChange={handleGroupChange}
        >
          <option value="">Select a group</option>
          {groupList.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        center
        styles={{
            modal: {
              width: "75%", // Adjust the width as needed
              height: "auto", // Auto-adjust the height based on content
            },
          }} // Pass the styles to the Modal component
      >
        <div className="p-4">
          <label className="block text-sm font-medium text-gray-700">
            {isDeleting ? "Delete Option" : <div className="flex items-center"><FaRegEdit className="mr-2" />Write Account Group Name:</div>}
          </label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={modalInput}
            onChange={(e) => setModalInput(e.target.value)}
            required // Make the field required
          />

          {/* Conditionally render details input only when adding an option */}
          {!isDeleting && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mt-4">
              <div className="flex items-center" ><FaRegEdit className=''/> <span className="ml-2">Write Description:</span></div>
              </label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-md w-full"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required // Make the field required
              />
            </div>
          )}

          <div className="mt-4 flex items-center justify-end">
            <button
              className={`px-4 py-2 text-white ${
                isDeleting ? "bg-red-500" : "bg-blue-500"
              } rounded-md mr-2`}
              onClick={handleModalSubmit}
            >
              {isDeleting ? "Confirm Deletion" : "Submit"}
            </button>
            <button
              className="px-4 py-2 text-white bg-red-500 rounded-md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {selectedGroup && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Subgroup:
          </label>
          <div className="flex items-center">
            <select
              className="mt-1 p-2 border rounded-md w-full"
              value={selectedSubgroup}
              onChange={handleSubgroupChange}
            >
              <option value="">Select an option</option>
              {subgroupList.map((subgroup) => (
                <option key={subgroup} value={subgroup}>
                  {subgroup}
                </option>
              ))}
            </select>
            {selectedSubgroup && (
              <FaPlus
                className="ml-2 cursor-pointer text-blue-500"
                onClick={() => handleAddOption(1)}
              />
            )}
            {customOptions.length > 0 && (
              <FaTrash
                className="ml-2 cursor-pointer text-red-500"
                onClick={handleDeleteOption}
              />
            )}
          </div>
        </div>
      )}

      {selectedSubgroup && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Subgroup:
          </label>
          <div className="flex items-center">
            <div className="flex-grow">
              <select
                className="mt-1 p-2 border rounded-md w-full"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="">Select an option</option>
                {optionList.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-2">
              <button
                className="cursor-pointer text-blue-500 rounded-md"
                onClick={() => handleAddOption(0)} // Pass index 0 for "Select Option"
              >
                <FaPlus></FaPlus>
              </button>
            </div>
            {selectedOption && (
              <FaTrash
                className="ml-2 cursor-pointer text-red-500"
                onClick={handleDeleteOption}
              />
            )}
          </div>
        </div>
      )}

      {selectedOption && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Subgroup:
          </label>
          <div className="flex items-center">
            <div className="flex-grow">
              <select
                className="mt-1 p-2 border rounded-md w-full"
                value={selectedAdditionalOption}
                onChange={handleAdditionalOptionChange}
              >
                <option value="">Select an option</option>
                {additionalOptionList.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-2">
              <button
                className=" cursor-pointer text-blue-500 rounded-md"
                onClick={() => handleAddOption(1)} // Pass index 1 for "Select Additional Option"
              >
                <FaPlus></FaPlus>
              </button>
            </div>
            {selectedAdditionalOption && (
              <FaTrash
                className="ml-2 cursor-pointer text-red-500"
                onClick={handleDeleteOption}
              />
            )}
          </div>
        </div>
      )}

      <div className="mb-4 flex items-center justify-end">
      <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md mr-2"
          onClick={saveToLocalStorage}
          style={{
            backgroundImage: "linear-gradient(to right,  #3481ed, #6499e3)",
            // Adjust the gradient colors as needed
          }}
        >
          Add Data
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
          onClick={handleClearForm}
          style={{
            backgroundImage: "linear-gradient(to right,  #3481ed, #6499e3)",
            // Adjust the gradient colors as needed
          }}
        >
          Clear Form
        </button>
      </div>
    </div>
  );
};

export default Groups;