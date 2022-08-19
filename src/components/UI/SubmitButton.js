import React from 'react';


export default function SubmitButton ({onSubmit}) {
  
    return(
        <button onClick={onSubmit} type='submit'>
        Submit
        </button>
    );
}

