import React, { memo, useEffect, useState } from "react";
import { issuelistingData } from "../redux/issueListingSlice";
import { useDispatch, useSelector } from "react-redux";
import { Chip, Link } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const Listing = ({ title }) => {
  const { issueData, isLoading } = useSelector((state) => state.issue);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(issueData.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(issuelistingData());
  }, []);

  const handleRoute = (person) => {
    navigate(`/issue_details/${person.id}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = issueData?.data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  };

  return (
    <div className="m-4">
      <Button>{title}</Button>{" "}
      <div>
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="border-2 border-gray-300 rounded-md p-2 w-80"
          onChange={handleSearch}
        />
      </div>
      {filteredData ? (
        <>
          <table className="w-full mt-3 border p-3">
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <th className="p-2">id</th>
                <th className="p-2">Title</th>
                <th className="p-2">Due Date</th>
                <th className="p-2">Assigne</th>
                <th className="p-2">Label</th>
                <th className="p-2">Status</th>
                <th className="p-2">Comments</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((person) => (
                <tr
                  key={person.id}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <td className="p-2 text-center">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {person.id}
                    </p>
                  </td>
                  <td className="p-2 text-center">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {person.title}
                    </p>
                  </td>
                  <td className="p-2 text-center">
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {person.due_date}
                    </p>
                  </td>
                  <td className="p-2 text-center">
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {person.full_name}
                    </p>
                  </td>
                  <td className="p-2 text-center">
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      <Chip label={person.label} />
                    </p>
                  </td>
                  <td className="p-2 text-center">
                    <p className="mt-1 truncate text-xs leading-5 text-green-500">
                      {person?.status === "Open" ? (
                        <>
                          <p>{person.status}</p>
                        </>
                      ) : (
                        <>
                          <p className="text-red-600">{person.status}</p>
                        </>
                      )}
                    </p>
                  </td>
                  <td className="p-2 text-center">
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {person.description}
                    </p>
                  </td>
                  <td className="p-2 text-center">
                    <p
                      className="mt-1 truncate text-xs leading-5 text-gray-500"
                      onClick={() => handleRoute(person)}
                    >
                      <ArrowForwardIosIcon />
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <table className="w-full mt-3 border p-3">
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <th className="p-2">id</th>
                <th className="p-2">Title</th>
                <th className="p-2">Due Date</th>
                <th className="p-2">Assigne</th>
                <th className="p-2">Label</th>
                <th className="p-2">Status</th>
                <th className="p-2">Comments</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                <>
                  {issueData?.data?.map((person) => (
                    <tr
                      key={person.id}
                      style={{
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <td className="p-2 text-center">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {person.id}
                        </p>
                      </td>
                      <td className="p-2 text-center">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {person.title}
                        </p>
                      </td>
                      <td className="p-2 text-center">
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {person.due_date}
                        </p>
                      </td>
                      <td className="p-2 text-center">
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {person.full_name}
                        </p>
                      </td>
                      <td className="p-2 text-center">
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          <Chip label={person.label} />
                        </p>
                      </td>
                      <td className="p-2 text-center">
                        <p className="mt-1 truncate text-xs leading-5 text-green-500">
                          {person?.status === "Open" ? (
                            <>
                              <p>{person.status}</p>
                            </>
                          ) : (
                            <>
                              <p className="text-red-600">{person.status}</p>
                            </>
                          )}
                        </p>
                      </td>
                      <td className="p-2 text-center">
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {person.description}
                        </p>
                      </td>
                      <td className="p-2 text-center">
                        <p
                          className="mt-1 truncate text-xs leading-5 text-gray-500"
                          onClick={() => handleRoute(person)}
                        >
                          <ArrowForwardIosIcon />
                        </p>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  <div>Loading...</div>
                </>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

const Button = memo(() => {
  return (
    <div>
      <Link href="/add_ticket">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
          New Ticket
        </button>
      </Link>
    </div>
  );
});

export default Listing;
