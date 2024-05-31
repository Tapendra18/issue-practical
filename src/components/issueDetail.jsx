import React, { memo, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CloseIssue,
  DeleteIssue,
  fetchIssueDetails,
} from "../redux/issueDetailSlice";
import { UpdateIssueData } from "../redux/addIssueSlice";
import { DeleteComment, GetComment, fetchComment } from "../redux/commentSlice";

const IssueDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { issueDetails, isLoading } = useSelector((state) => state.detailIssue);
  const { commentData } = useSelector((state) => state.commentApi);

  useEffect(() => {
    dispatch(GetComment({ issue_id: id }));
  }, []);

  useEffect(() => {
    if (issueDetails.data) {
      setEditableFields({
        title: { editing: false, value: issueDetails.data.title },
        description: { editing: false, value: issueDetails.data.description },
        due_date: { editing: false, value: issueDetails.data.due_date },
        status: { editing: false, value: issueDetails.data.status },
        assignee_id: { editing: false, value: issueDetails.data.assignee_id },
        label: { editing: false, value: issueDetails.data.label },
      });
    }
  }, [issueDetails.data]);
  // State to manage editable fields and edited values
  const [editableFields, setEditableFields] = useState({
    title: { editing: false, value: issueDetails?.data?.title },
    description: { editing: false, value: issueDetails?.data?.description },
    due_date: { editing: false, value: issueDetails?.data?.due_date },
    status: { editing: false, value: issueDetails?.data?.status },
    assignee_id: { editing: false, value: issueDetails?.data?.assignee_id },
    label: { editing: false, value: issueDetails?.data?.label },
  });

  useEffect(() => {
    dispatch(fetchIssueDetails({ issue_id: id }));
  }, []);

  // Toggle edit mode for a specific field
  const toggleEditMode = (field) => {
    setEditableFields({
      ...editableFields,
      [field]: {
        ...editableFields[field],
        editing: !editableFields[field].editing,
        value: issueDetails?.data[field], // Initialize with current value
      },
    });
  };

  // Handle input changes in edit mode
  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setEditableFields((prevFields) => ({
      ...prevFields,
      [field]: {
        ...prevFields[field],
        value: value,
      },
    }));
  };

  const EDIT = Boolean(id);

  // Save changes for a specific field
  const handleSaveChanges = (field) => {
    const data = new FormData();
    data.append("title", editableFields?.title?.value);
    data.append("description", editableFields?.description?.value);
    data.append("due_date", editableFields?.due_date?.value);
    data.append("status", editableFields?.status?.value);
    data.append("assignee_id", editableFields?.assignee_id?.value);
    data.append("label", editableFields?.label?.value);
    if (EDIT) {
      data.append("issue_id", id);
    }
    dispatch(UpdateIssueData(data));
    setTimeout(() => {
      dispatch(fetchIssueDetails({ issue_id: id }));
    }, [2000]);
    // Exit edit mode
    toggleEditMode(field);
  };

  const handleDeleteIssue = async () => {
    await dispatch(DeleteIssue({ id: id }));
    navigate("/");
  };

  const handleCLoseIssue =  () => {
     dispatch(CloseIssue({ id: id, status: "Close" }));
    navigate("/");
  };

  const handleDeleteComment = async (ids) => {
    console.log(id, "Delete comment");
    await dispatch(DeleteComment({ id: ids }));
    setTimeout(() => {
      dispatch(GetComment({ issue_id: id }));
    }, 1000);

    console.log("Delete comment");
  };

  return (
    <div className="m-6">
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Issue Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and application.
          </p>
        </div>
        {!isLoading ? (
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {/* Render fields with edit and save functionality */}
              <RenderField
                label="issue title"
                field="title"
                value={issueDetails?.data?.title && issueDetails?.data?.title}
                editableField={editableFields["title"]}
                toggleEditMode={toggleEditMode}
                handleInputChange={handleInputChange}
                handleSaveChanges={handleSaveChanges}
              />
              <RenderField
                label="description"
                field="description"
                value={issueDetails?.data?.description}
                editableField={editableFields["description"]}
                toggleEditMode={toggleEditMode}
                handleInputChange={handleInputChange}
                handleSaveChanges={handleSaveChanges}
              />
              <RenderField
                label="due date"
                field="due_date"
                type={"date"}
                value={issueDetails?.data?.due_date}
                editableField={editableFields["due_date"]}
                toggleEditMode={toggleEditMode}
                handleInputChange={handleInputChange}
                handleSaveChanges={handleSaveChanges}
              />

              <RenderField
                label="assignee_id"
                field="assignee_id"
                value={issueDetails?.data?.assignee?.map((assigne) => {
                  return <>{assigne}</>;
                })}
                editableField={editableFields["assignee_id"]}
                toggleEditMode={toggleEditMode}
                handleInputChange={handleInputChange}
                handleSaveChanges={handleSaveChanges}
              />
              <RenderField
                label="label"
                field="label"
                value={issueDetails?.data?.label}
                editableField={editableFields["label"]}
                toggleEditMode={toggleEditMode}
                handleInputChange={handleInputChange}
                handleSaveChanges={handleSaveChanges}
              />
              {/* Render other fields similarly */}
            </dl>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          <Comment />
        </h3>
      </div>

      <div>
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          get Comment
        </h3>

        {commentData?.data?.map((item, index) => (
          <div
            key={index}
            style={{
              borderBottom: "1px solid black",
              paddingBottom: "15px",
            }}
          >
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              {item?.comment}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              issue by : {item?.full_name}
            </p>
            <button
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => handleDeleteComment(item?.id)}
            >
              delete comment
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleCLoseIssue}
        >
          Close issue
        </button>
        <button
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleDeleteIssue}
        >
          delete issue
        </button>
      </div>
    </div>
  );
};

// Component to render each field with edit functionality
const RenderField = ({
  label,
  field,
  value,
  editableField,
  toggleEditMode,
  handleInputChange,
  handleSaveChanges,
  type,
}) => (
  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-sm font-medium leading-6 text-gray-900">{label}</dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      {editableField?.editing ? (
        <input
          type={type}
          value={editableField?.value}
          onChange={(e) => handleInputChange(e, field)}
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      ) : (
        <>
          {value}
          <button
            onClick={() => toggleEditMode(field)}
            className="ml-2 text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
          >
            Edit
          </button>
        </>
      )}
      {editableField.editing && (
        <button
          onClick={() => handleSaveChanges(field)}
          className="ml-2 text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
        >
          Save
        </button>
      )}
    </dd>
  </div>
);

const Comment = memo(() => {
  const { id } = useParams();
  const [commentAdd, setCommentAdd] = useState();
  console.log(commentAdd);
  const dispatch = useDispatch();
  const { issueDetails, isLoading } = useSelector((state) => state.detailIssue);

  const handleCommentAdd = (e) => {
    const { name, value } = e.target;
    setCommentAdd((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSaveComment = () => {
    const data = new FormData();
    data.append("comment", commentAdd?.comment);
    data.append("issue_id", id);
    data.append("type", "tag");
    data.append("assign_id", issueDetails.data.assignee_id);

    dispatch(fetchComment(data));

    setTimeout(() => {
      dispatch(GetComment({ issue_id: id }));
    }, 1000);
  };

  return (
    <>
      {!isLoading ? (
        <>
          <div>
            <div className="sm:col-span-3">
              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Comment
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  autoComplete="comment"
                  className="block w-2/4 sm:col-span-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-6"
                  onChange={handleCommentAdd}
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleSaveComment}
                className="ml-2 text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
              >
                Save
              </button>
            </div>
          </div>
        </>
      ) : (
        <>isLoading...</>
      )}
    </>
  );
});

export default IssueDetail;
