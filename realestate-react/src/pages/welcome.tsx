import React from "react";
import { useSearchParams } from 'react-router-dom';

const Welcome = () => {
  const [searchParams] = useSearchParams();
  const registered = searchParams.has('registration-success');

    return (
        <>
            {registered && <p>Registered successfully</p>}
            <h1>Welcome</h1>
        </>
    );
}

export default Welcome;