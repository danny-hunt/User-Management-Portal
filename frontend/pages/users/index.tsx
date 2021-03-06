import { faArrowAltCircleRight, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import UsersApi, { GetUser } from "../../api/users";
import Card from "../../components/Card";
import HeaderCard from "../../components/HeaderCard";
import Page from "../../components/Page";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/Home.module.css";

const UserCard = ({ user }: { user: GetUser }) => {
  const goToUserButton = (userId: string) => {
    return (
      <Link className='align-middle inline-block' href={`/users/${userId}`}>
        <div className='place-items-center inline-block align-middle'>
          {/* <a>. </a> */}
          <FontAwesomeIcon className=' w-6 text-blue-600 hover:text-blue-800' icon={faArrowAltCircleRight} />
        </div>
        {/* <a className='text-blue-600 hover:text-blue-800 text-center align-middle'>Go to user</a> */}
      </Link>
    );
  };

  return (
    <Card
      className='min-w-12'
      header={user.first_name + " " + user.last_name}
      text={user.role}
      actionButton={goToUserButton(user._id)}
    />
  );
};

const Users: NextPage = () => {
  const users = useQuery("allUsers", UsersApi.getAll);
  const [search, setSearch] = useState("");

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex-row w-full'>
        <Sidebar />
        <Page>
          <HeaderCard header='Users' />
          <div className='flex-row mx-4 justify-between flex'>
            <div className='flex my-6'>
              Search
              <input
                className='ml-4 h-8 border border-gray rounded-sm'
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </div>
            <div className='flex'>
              <Link className='align-middle inline-block' href={`/users/create`}>
                <div>
                  <Card
                    className='min-w-12 hover:cursor-pointer'
                    header='Create new User'
                    text={""}
                    order={true}
                    actionButton={
                      <div className='place-items-center inline-block align-middle'>
                        <FontAwesomeIcon className=' w-6 text-green-600 hover:text-green-800' icon={faPlusCircle} />
                      </div>
                    }
                  />
                </div>
              </Link>
            </div>
          </div>
          {users.data && (
            <div className='flex flex-wrap'>
              {users.data
                .filter(
                  (user) =>
                    Object.values(user).some((value) => value.includes(search)) ||
                    (user.first_name + " " + user.last_name).includes(search),
                )
                .map((user) => (
                  <div key={user._id}>
                    <UserCard user={user} key={user._id} />
                  </div>
                ))}
            </div>
          )}
        </Page>
      </div>
    </div>
  );
};

export default Users;
