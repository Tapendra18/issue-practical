import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignValue } from "../redux/GetAssignData";
import { Chip, Stack, TextField } from "@mui/material";
import { AddIssueDataApi } from "../redux/addIssueSlice";
import { useNavigate } from "react-router-dom";

const AddData = () => {
  const [inputvalue, setInputValue] = useState({});
  const [assign, setAssignValue] = React.useState({});
  const [inputValueChip, setInputValueChip] = useState("");
  const [chips, setChips] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { assignValue, isLoading } = useSelector((state) => state.getAssign);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValueChip(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValueChip.trim() !== "") {
      event.preventDefault();
      setChips([...chips, inputValueChip.trim()]);
      setInputValueChip("");
    }
  };

  const handleDelete = (chipToDelete) => () => {
    setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  useEffect(() => {
    dispatch(fetchAssignValue());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputvalue,
      [name]: value,
    });
  };

  const handleAssigneChange = (event) => {
    {
      assignValue?.data?.map((value) => {
        if (event.target.value === value?.first_name) {
          setAssignValue(value?.id);
        }
      });
    }
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    if (validateValue()) {
      const data = new FormData();
      data.append("title", inputvalue?.issue_title);
      data.append("description", inputvalue.description);
      data.append("assignee_id", assign);
      data.append("due_date", inputvalue.due_date);
      data.append("attachment", file);
      data.append("label", chips);
      try {
        await dispatch(AddIssueDataApi(data)).unwrap();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateValue = () => {
    let valid = true;
    const newErrors = {};

    if (!inputvalue.issue_title) {
      newErrors.issue_title = "Issue Title is required";
      valid = false;
    }
    if (!inputvalue.description) {
      newErrors.description = "Description is required";
      valid = false;
    }
    // if (!inputvalue.due_date) {
    //   newErrors.due_date = "Due Date is required";
    //   valid = false;
    // }

    // if (!assign.length) {
    //   newErrors.assign = "Assigne is required";
    //   valid = false;
    // }

    // if (!chips.length) {
    //   newErrors.label = "Label is required";
    //   valid = false;
    // }

    setError(newErrors);
    return valid;
  };

  return (
    <div className="m-4">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="issue_title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  issue title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="issue_title"
                    id="issue_title"
                    autoComplete="issue_title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {error?.issue_title && (
                <p className="text-red-500 text-xs mt-1">{error.issue_title}</p>
              )}

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onChange={handleChange}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about issue.
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="due_date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  due date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="due_date"
                    id="due_date"
                    autoComplete="due_date"
                    className="block w-80 sm:col-span-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-6 "
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="assigne"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  assigne
                </label>
                <div className="mt-2">
                  <select
                    id="assigne"
                    name="assigne"
                    autoComplete="assigne-name"
                    onChange={handleAssigneChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {!isLoading ? (
                      <>
                        {assignValue?.data?.map((value, index) => {
                          return (
                            <option key={index}>{value?.first_name}</option>
                          );
                        })}
                      </>
                    ) : (
                      <>is loading....</>
                    )}
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="label"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  label
                </label>
                <div className="mt-2">
                  <TextField
                    label="Enter a label"
                    value={inputValueChip}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    variant="outlined"
                  />
                  <Stack direction="row" spacing={1} mt={2}>
                    {chips.map((chip, index) => (
                      <Chip
                        key={index}
                        label={chip}
                        onDelete={handleDelete(chip)}
                      />
                    ))}
                  </Stack>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              {file?.name}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={handleClickSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddData;
