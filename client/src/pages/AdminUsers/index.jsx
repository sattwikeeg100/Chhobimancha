import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserCard from "../../components/userCard";
import axiosInstance from "../../config/axiosInstance";
import Preloader from "../../components/PreLoader/PreLoader";
import { toast } from "sonner";

const AdminUsers = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [nonAdminUsers, setNonAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load

  const currentUser = useSelector((state) => state.user.userInfo);
  const isOwner = currentUser.isOwner;

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      const tempUserData = response.data;

      const admins = tempUserData.filter(
        (user) => user.isAdmin && !user.isOwner
      );
      const nonAdmins = tempUserData.filter((user) => !user.isAdmin);

      setAdminUsers(admins);
      setNonAdminUsers(nonAdmins);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
      setLoading(false);
    }
    // finally {
    //    // Set loading to false after data fetch completes
    // }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers();
      setTimeout(() => {
        setIsInitialLoad(false); // Set isInitialLoad to false after a minimum duration
      }, 1000); // Adjust the timeout duration as needed (e.g., 1000ms = 1 second)
    };

    fetchData();
  }, []); // Run once on component mount

  const handleAdminAuthorize = async (userId, userAdminStatus) => {
    if (!isOwner) return;

    try {
      await axiosInstance.put(`/users/${userId}`, {
        isAdmin: !userAdminStatus,
      });
      toast.success("Admin authorization updated successfully");
      getAllUsers(); // Refresh user data after update
    } catch (error) {
      console.error("Error updating admin authorization:", error);
      toast.error("Error updating admin authorization");
    }
  };

  const handleDeleteClick = async (userId) => {
    if (!isOwner) return;

    try {
      await axiosInstance.delete(`/users/${userId}`);
      toast.success("User deleted successfully");
      getAllUsers(); // Refresh user data after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  // Show loading indicator for a minimum duration (e.g., 1 second)
  if (loading && isInitialLoad) {
    return <Preloader setLoading={setLoading} />;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {/* Admin Users */}
      {isOwner && (
        <>
          <h1 className="text-xl sm:text-4xl lg:text-5xl font-bold text-primary_text py-4 font-montserrat">
            All Admins
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {adminUsers.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                amOwner={isOwner}
                onToggleAuthorizeAdmin={handleAdminAuthorize}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </div>
        </>
      )}
      {/* Non Admin Users */}
      <h1 className="text-xl sm:text-4xl lg:text-5xl font-bold text-primary_text py-4 font-montserrat">
        All Users
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {nonAdminUsers.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            amOwner={isOwner}
            onToggleAuthorizeAdmin={handleAdminAuthorize}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
