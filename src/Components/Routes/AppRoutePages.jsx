import React from 'react'
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Journal from '../Journalling/Journal'
import GroundingToolLibrary from '../GroundingTools/GroundingToolLibrary'

import MoodTracker from '../Mood Tracker/MoodTracker'
import GuidedBreathing from '../GroundingTools/GuidedBreathing'


import SensoryExercises from '../GroundingTools/SensoryExercises'
import Workspace from '../Journalling/Workspace'
import ProtectedRoute from './ProtectedRoute'
import AccountPage from '../First-Interface/AccountPage'
import SupportPage from '../Support/SupportPage'
import AllNotes from '../Journalling/AllNotes'
import AllAlters from '../Alters/AllAlters'
import EditProfile from '../Profile/EditProfile'
import CreateAlter from '../Alters/CreateAlter'
import HelpPage from '../Support/HelpPage'








export default function AppRoutePages() {
  return (
    
  <Routes>
  <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
  <Route path="/account" element={<AccountPage/>}/>
  <Route path="/dashboard" element={<Dashboard/>}/>
  <Route path="/support" element={<ProtectedRoute><SupportPage/></ProtectedRoute>}/>
  <Route path="/support/help-page" element={<ProtectedRoute><HelpPage/></ProtectedRoute>}/>
  <Route path="/moodtracker" element={<ProtectedRoute><MoodTracker/></ProtectedRoute>}/>
  <Route path="/journal" element={<ProtectedRoute><Journal/></ProtectedRoute>}/>
  <Route path="/journal/workspace" element={<ProtectedRoute><Workspace/></ProtectedRoute>}/>
  <Route path="/journal/all-notes" element={<ProtectedRoute><AllNotes/></ProtectedRoute>}/>
  <Route path="/grounding-tool-library" element={<ProtectedRoute><GroundingToolLibrary/></ProtectedRoute>}/>
  <Route path="/grounding-tool-library/guided-breathing" element={<ProtectedRoute><GuidedBreathing/></ProtectedRoute>}/>
  <Route path="/grounding-tool-library/sensory-exercise" element={<ProtectedRoute><SensoryExercises/></ProtectedRoute>}/>
  <Route path="/profile" element={<ProtectedRoute><EditProfile/></ProtectedRoute>}/>
  <Route path="/system-profiles" element={<ProtectedRoute><AllAlters/></ProtectedRoute>}/>
  <Route path="/system-profiles/add-alter" element={<ProtectedRoute><CreateAlter/></ProtectedRoute>}/>
  </Routes>
  )
}
