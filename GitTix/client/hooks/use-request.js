import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      // reset errors arr
      setErrors(null);
      const { data } = await axios[method](url, body);
      return data;
    }
    catch (err) {
      setErrors(
        <div className="alert alert-danger">
        <h4>Ooops...</h4>
        <ul className="my-0">
          {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
        </ul>
      </div>
      );
    }
  };

  return {doRequest, errors};
}