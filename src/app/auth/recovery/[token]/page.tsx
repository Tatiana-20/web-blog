import React from "react";

export default function Password({ params }: { params: { token: string } }) {
  return <>{params.token}</>;
}
