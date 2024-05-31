import { configureStore } from "@reduxjs/toolkit";
import { issueListing } from "./issueListingSlice";
import { AddIssueDataValue } from "./addIssueSlice";
import { getIssueAssignees } from "./GetAssignData";
import { issueDetailsData } from "./issueDetailSlice";
import { CommentApiCall } from "./commentSlice";

export const store = configureStore({
    reducer: {
        issue: issueListing.reducer,
        addissue: AddIssueDataValue.reducer,
        getAssign: getIssueAssignees.reducer,
        detailIssue : issueDetailsData.reducer,
        commentApi : CommentApiCall.reducer,

    }
})