"use client";

import { useEffect, useState } from "react";
import styles from "./admin.module.css"; // 👈 make sure this file exists



export default function DashboardPage() {
  const [user, setUser] = useState<News.Iuser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth-user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as News.Iuser ;
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  if (!user) {
    return <div className="dashboard-loading">Loading user data...</div>;
  }

  return (
    <div className={styles.dashboardPage}>
    <div className={styles.dashboardCard}>
      <h2 className={styles.dashboardtitle}>Welcome, {user.name}!</h2>
      <div className={styles.dashboardinfo}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      </div>
    </div>
  );
}
