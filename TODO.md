# TODO: Fix Institution Applications and Dashboard Stats

## Issues to Fix:
1. Applications not displaying correctly in institution dashboard
2. Application status updates not working
3. Missing delete functionality for applications
4. Dashboard not showing application statistics (applied, shortlisted, interviewed, etc.)
5. Profile viewing not working properly

## Tasks:
- [ ] Update Applications.jsx to use correct API endpoints
- [ ] Add delete application functionality with confirmation
- [ ] Update Dashboard.jsx to fetch and display application statistics
- [ ] Fix status color mapping and status checks
- [ ] Test all application management functions
- [ ] Verify profile viewing works

## Completed Tasks:
- [x] Fix seed-test-data.js to match Job model schema (location as string, jobType/employmentType as lowercase enums)
- [x] Fix nearby jobs blank page issue by adding fallback to regular search when geolocation fails
- [x] Add "View Applications" button to institution dashboard for accessing teacher profiles and resumes
