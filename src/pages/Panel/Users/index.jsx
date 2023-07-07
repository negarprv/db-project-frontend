import { Route, Routes } from "react-router-dom"
import { UsersList } from './List'
import { AddNewUserPage } from './add'

export const UsersPage = () => {
  return (
    <div className="users">
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/add" element={<AddNewUserPage />} />
      </Routes>
    </div>
  )
}