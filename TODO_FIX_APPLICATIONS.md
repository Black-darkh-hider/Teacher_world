 u# TODO: Fix Institution Applications Not Showing

## Issues Identified:
1. Frontend using wrong API endpoint for fetching applications
2. Wrong endpoint for updating application status
3. Status names mismatch between frontend and backend

## Tasks:
- [x] Update fetchApplications to use '/api/applications/institution/applications'
- [x] Update updateApplicationStatus to use '/api/applications/${applicationId}' with PATCH method
- [x] Change status checks from 'pending' to 'applied'
- [x] Update getStatusColor to handle 'applied' instead of 'pending'
- [x] Test the fix
