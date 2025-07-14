'use client'
import { redirect } from 'next/navigation';
import React from 'react'

 function Page() {
  const user = JSON.parse(localStorage.getItem('auth-user') || "{}");
  if (!user || user.role !== "admin") {
    redirect('/user/login')
  }
  return (
    <div>Page</div>
  )
}

export default Page