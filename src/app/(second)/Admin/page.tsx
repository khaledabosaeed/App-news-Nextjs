"use client ";
import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth.context';

function Page() {
  const auth = useContext(AuthContext);
  if (!auth) return null;
  const { user } = auth;
  if (user) {
    return <div>{user.user?.name}</ div >;
  } else {
    return (
      <div>Page</div>
    )
  }
}

export default Page