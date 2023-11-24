import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const onFormSubmit = async (info) => {
    try {
      const response = await axios.post('http://localhost:3001/admin/login', info);
      const data = response.data;

      if (data.message === 'Success') {
        localStorage.setItem('id', data.payload.username);
        localStorage.setItem('token', data.payload.token);
        setLoginSuccess(true);
        setLoginError(null);
        navigate('/home');
      } else {
        setLoginSuccess(false);
        setLoginError('Invalid credentials');
      }
    } catch (error) {
      setLoginSuccess(false);
      setLoginError('An error occurred');
    }
  };

  return (
    <div className="mt-52">
      <div className="">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-white text-center"> VNRVJIET </h1>
          <p className='text-white text-center'>Food App</p>
          <form className="mt-6 text-center" onSubmit={handleSubmit(onFormSubmit)}>
            {/* username Input */}
            <div className=''>
            <div className="">
              <input
                type="text"
                placeholder="Username"
                className="rounded p-2"
                {...register("username", { required: true })}
              />
              {errors.username?.type === "required" && (
                <p className="text-red-500">*Username required</p>
              )}
            </div>
            {/* Password Input */}
            <div className="mt-4">
              <input
                type="password"
                placeholder="Password"
                className="rounded p-2"
                {...register('password', { required: true })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">*Password required</p>
              )}
            </div>
            </div>
            {/* Submit Button */}
            <div className="mt-6 ">
              <button className="bg-transparent hover:bg-cyan-400 text-cyan-600 font-semibold hover:text-white py-2 px-4 border border-cyan-500 hover:border-transparent rounded">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
