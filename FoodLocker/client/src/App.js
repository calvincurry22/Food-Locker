import React from 'react';
import ApplicationViews from "./components/ApplicationViews";
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProvider } from './providers/UserProvider';
import Header from './components/Header';
import TaskProvider from './providers/TaskProvider';
import EmployeeProvider from './providers/EmployeeProvider';
import CredentialProvider from './providers/CredentialProvider';
import AuditProvider from './providers/AuditProvider';
import AuditViolationProvider from './providers/AuditViolationProvider';
import ViolationCategoryProvider from './providers/ViolationCategoryProvider';

function App() {
  return (
    <Router>
      <UserProvider>
        <TaskProvider>
          <EmployeeProvider>
            <CredentialProvider>
              <AuditProvider>
                <AuditViolationProvider>
                  <ViolationCategoryProvider>
                    <Header />
                    <ApplicationViews />
                  </ViolationCategoryProvider>
                </AuditViolationProvider>
              </AuditProvider>
            </CredentialProvider>
          </EmployeeProvider>
        </TaskProvider>
      </UserProvider>
    </Router>
  );
}

export default App;