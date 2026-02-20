 # TeacherWorld Application Refactoring Plan

## 1. Karnataka Map Integration
- [x] Add interactive map component with bounds: minLat=11.5, maxLat=18.5, minLng=74.0, maxLng=78.5, defaultCenter=(14.0,76.25)
- [x] Include location markers for institutions/teachers
- [x] Integrate map into: Job Post, Edit Job (completed), Job Details, Institution Dashboard, Institution Profile, Teacher Profile, Interview Scheduled page

## 2. Zoom API Integration
- [x] Integrate Zoom meeting creation and linking (enhanced with recordings, registrants, participants, instant meetings)
- [x] Add to interview scheduling flow
- [x] Display on interview pages (institution + teacher)
- [x] Only visible to institution that created the interview
- [x] Teacher sees link only if interview belongs to them
- [x] Add "Join Interview" UI button

## 3. Interview Logic Fix
- [ ] Filter interviews by institution → teacher relationship
- [ ] Only show interviews when institution scheduled for that teacher
- [ ] Dynamic refresh after schedule/update
- [ ] Fix DB relations

## 4. OTP System + Email System Rewrite
- [ ] Realistic OTP, expires in 5 minutes
- [ ] Hashed OTP storage
- [ ] Clean validation flow
- [ ] HTML + plain text email templates
- [ ] Email body MUST include: Teacher World, Institution Name, Teacher Name, Purpose, Zoom link if included

## 5. UI/UX Upgrade
- [ ] Apply modern UI to interview pages, job pages, dashboards, profile pages, map sections
- [ ] Add spacing, alignment, color palette, responsiveness, animations

## 6. Edit Job Post Fix
- [ ] Every field must update correctly in DB
- [ ] Fix map-based location update
- [ ] Show confirmation messages
- [ ] Make it stable and bug-free

## 7. Institution View → Teacher Profile
- [ ] Add ability for institutions to view teacher full profiles
- [ ] View/download resumes
- [ ] See teacher map location
- [ ] View skills, experience, qualifications

## 8. Full Codebase Rewrite
- [ ] Improve folder structure
- [ ] Rewrite backend routes + controllers cleanly
- [ ] Add missing validation + error handling
- [ ] Fix all console errors
- [ ] Fix API failures
- [ ] Clean state management on frontend
- [ ] Optimize imports & remove dead code

## 9. Add Missing Logic
- [ ] Implement any incomplete modules
- [ ] Document assumptions
