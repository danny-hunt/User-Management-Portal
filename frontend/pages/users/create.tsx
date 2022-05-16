import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuItem, Select } from "@material-ui/core";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import UsersApi, { UserRole } from "../../api/users";
import HeaderCard from "../../components/HeaderCard";
import Page from "../../components/Page";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/Home.module.css";
import Router from "next/router";
import { useMutation } from "react-query";

const FormElement = ({
  title,
  value,
  onChange,
  type,
  placeholder,
}: {
  title: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  type: string;
  placeholder: string;
}) => {
  return (
    <div className='  m-6'>
      <label className='text-gray-700 text-sm font-bold'>{title}</label>
      <input
        className='mt-1 w-full border border-gray-400 rounded-sm'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

const CreateUsers: NextPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("Regular User");

  const { mutate } = useMutation(UsersApi.create, {
    onSuccess: () => {
      Router.push("/users");
    },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex-row w-full'>
        <Sidebar></Sidebar>
        <Page>
          <HeaderCard
            header='Add User'
            navOption={
              <Link href='/users'>
                <div>
                  <FontAwesomeIcon className=' w-6 text-orange-600 hover:text-orange-800' icon={faCircleArrowLeft} />
                </div>
              </Link>
            }
            actionButton={
              <div className='bg-green-600 text-white rounded-lg p-2'>
                <button
                  onClick={() => mutate({ first_name: firstName, last_name: lastName, email: email, role: role })}
                >
                  save and add
                </button>
              </div>
            }
          />
          <div className='bg-white h-96 rounded-lg mt-4 flex-grow'>
            <div className='m-8'>
              <div className='mt-2'>
                <h4 className='font-bold align-text-bottom text-lg'>User Information</h4>
              </div>
              <div className=' flex flex-wrap'>
                <FormElement
                  title='First Name'
                  value={firstName}
                  onChange={setFirstName}
                  type='text'
                  placeholder='Insert First Name'
                />
                <FormElement
                  title='Last Name'
                  value={lastName}
                  onChange={setLastName}
                  type='text'
                  placeholder='Insert Last Name'
                />
                <FormElement title='Email' value={email} onChange={setEmail} type='email' placeholder='Insert Email' />
              </div>
              <div className='m-6'>
                <label className='text-gray-700 text-sm font-bold'>User Role</label>
                <div className='mb-6'>
                  <select
                    name='Role'
                    id='role'
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    placeholder='select role'
                  >
                    <option value='Regular User'>Regular User</option>
                    <option value='Administrator'>Administrator</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Page>
      </div>
    </div>
  );
};

export default CreateUsers;
